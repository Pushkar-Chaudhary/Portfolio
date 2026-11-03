// Serverless Function: /api/github
// Fetches real GitHub 12-month contribution calendar securely server-side.

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=900");

  const username = process.env.GITHUB_USERNAME || "Pushkar-Chaudhary";
  const token = process.env.GITHUB_TOKEN;

  try {
    // 1. If GITHUB_TOKEN is available, use official GitHub GraphQL API
    if (token) {
      const graphqlQuery = `
        query($login: String!) {
          user(login: $login) {
            name
            login
            avatarUrl
            bio
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                    weekday
                  }
                }
              }
            }
          }
        }
      `;

      const ghRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token.trim()}`,
          "Content-Type": "application/json",
          "User-Agent": "Portfolio-Telemetry-Bot",
        },
        body: JSON.stringify({ query: graphqlQuery, variables: { login: username } }),
      });

      if (ghRes.ok) {
        const result = await ghRes.json();
        const cal = result?.data?.user?.contributionsCollection?.contributionCalendar;

        if (cal) {
          const weeks = cal.weeks.map((w) =>
            w.contributionDays.map((d) => ({
              date: d.date,
              count: d.contributionCount,
              level:
                d.contributionLevel === "FOURTH_QUARTILE"
                  ? 4
                  : d.contributionLevel === "THIRD_QUARTILE"
                  ? 3
                  : d.contributionLevel === "SECOND_QUARTILE"
                  ? 2
                  : d.contributionLevel === "FIRST_QUARTILE"
                  ? 1
                  : 0,
              weekday: d.weekday,
            }))
          );

          // Calculate streaks
          const allDays = weeks.flat();
          let currentStreak = 0;
          let longestStreak = 0;
          let runningStreak = 0;

          // From oldest to newest
          allDays.forEach((day) => {
            if (day.count > 0) {
              runningStreak += 1;
              if (runningStreak > longestStreak) longestStreak = runningStreak;
            } else {
              runningStreak = 0;
            }
          });

          // Current streak from today backwards
          for (let i = allDays.length - 1; i >= 0; i--) {
            if (allDays[i].count > 0) {
              currentStreak += 1;
            } else if (i === allDays.length - 1) {
              // today might not have commits yet, check yesterday
              continue;
            } else {
              break;
            }
          }

          return res.status(200).json({
            username,
            totalContributions: cal.totalContributions,
            weeks,
            currentStreak,
            longestStreak,
            source: "github-graphql",
            lastSynced: new Date().toISOString(),
          });
        }
      }
    }

    // 2. Fallback to authentic public GitHub contributions API
    const fallbackRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Portfolio-Telemetry-Bot",
        },
      }
    );

    if (!fallbackRes.ok) {
      throw new Error(`Failed to load GitHub calendar for ${username}`);
    }

    const data = await fallbackRes.json();
    const contributions = data?.contributions || [];

    // Group into 7-day weeks
    const weeks = [];
    let currentWeek = [];

    contributions.forEach((item, index) => {
      const dateObj = new Date(item.date);
      currentWeek.push({
        date: item.date,
        count: item.count,
        level: item.level,
        weekday: dateObj.getDay(),
      });

      if (currentWeek.length === 7 || index === contributions.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    const totalContributions = Object.values(data?.total || {}).reduce(
      (sum, val) => sum + val,
      0
    ) || contributions.reduce((acc, c) => acc + c.count, 0);

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let runningStreak = 0;

    contributions.forEach((day) => {
      if (day.count > 0) {
        runningStreak += 1;
        if (runningStreak > longestStreak) longestStreak = runningStreak;
      } else {
        runningStreak = 0;
      }
    });

    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) {
        currentStreak += 1;
      } else if (i === contributions.length - 1) {
        continue;
      } else {
        break;
      }
    }

    return res.status(200).json({
      username,
      totalContributions,
      weeks,
      currentStreak,
      longestStreak,
      source: "github-verified-feed",
      lastSynced: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to retrieve GitHub contribution data.",
      details: error.message,
      username,
      lastSynced: new Date().toISOString(),
    });
  }
}
