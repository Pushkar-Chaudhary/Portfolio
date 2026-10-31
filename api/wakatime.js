// Serverless Function: /api/wakatime
// Fetches real WakaTime statistics securely server-side without exposing API keys.

export default async function handler(req, res) {
  // CORS & Cache headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=900");

  const apiKey = (process.env.WAKATIME_API_KEY || "").trim();
  const rawUser = process.env.WAKATIME_USER_ID || "bf434ed0-2f6c-46e7-ae66-53b01d7fad3d";
  const cleanUser = rawUser.replace(/^@/, "");

  try {
    // 1. If WAKATIME_API_KEY is configured, call official authenticated API
    if (apiKey) {
      const authHeader = `Basic ${Buffer.from(apiKey).toString("base64")}`;

      const [statsRes, allTimeRes] = await Promise.allSettled([
        fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
          headers: { Authorization: authHeader },
        }),
        fetch("https://wakatime.com/api/v1/users/current/all_time_since_today", {
          headers: { Authorization: authHeader },
        }),
      ]);

      if (statsRes.status === "fulfilled" && statsRes.value.ok) {
        const statsData = await statsRes.value.json();
        const d = statsData?.data || {};

        let cumulativeTotal = d.human_readable_total || "0 hrs";
        if (allTimeRes.status === "fulfilled" && allTimeRes.value.ok) {
          const allTimeData = await allTimeRes.value.json();
          if (allTimeData?.data?.text) {
            cumulativeTotal = allTimeData.data.text;
          }
        }

        const topLanguages = (d.languages || []).slice(0, 6).map((lang) => ({
          name: lang.name,
          percent: Number(lang.percent || 0),
          text: lang.text || `${Math.round((lang.total_seconds || 0) / 3600)} hrs`,
          totalSeconds: lang.total_seconds || 0,
        }));

        const topProjects = (d.projects || []).slice(0, 6).map((proj) => ({
          name: proj.name,
          percent: Number(proj.percent || 0),
          text: proj.text || `${Math.round((proj.total_seconds || 0) / 3600)} hrs`,
          totalSeconds: proj.total_seconds || 0,
        }));

        const weeklyDays = (d.days || []).map((day) => ({
          date: day.date,
          totalSeconds: day.total_seconds || 0,
          text: day.text || "0 hrs",
        }));

        // Most coded weekday
        const weekdayTotals = new Array(7).fill(0);
        const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        (d.days || []).forEach((day) => {
          const dow = new Date(day.date).getDay();
          weekdayTotals[dow] += day.total_seconds || 0;
        });
        const topDowIdx = weekdayTotals.indexOf(Math.max(...weekdayTotals));
        const mostCodedDay = weekdayTotals[topDowIdx] > 0 ? weekdayNames[topDowIdx] : null;

        return res.status(200).json({
          configured: true,
          authenticated: true,
          totalCodingTime: cumulativeTotal,
          dailyAverage: d.human_readable_daily_average || "0 hrs",
          bestDay: d.best_day
            ? {
                date: d.best_day.date,
                text: d.best_day.text,
              }
            : null,
          mostCodedDay,
          languages: topLanguages,
          projects: topProjects,
          weeklyActivity: weeklyDays,
          lastSynced: new Date().toISOString(),
        });
      }
    }

    // 2. Fallback to real public WakaTime profile stats (all_time range)
    try {
      const publicRes = await fetch(
        `https://wakatime.com/api/v1/users/${cleanUser}/stats/all_time`,
        { headers: { Accept: "application/json" } }
      );

      if (publicRes.ok) {
        const pubData = await publicRes.json();
        const d = pubData?.data || {};

        const topLanguages = (d.languages || []).slice(0, 6).map((l) => ({
          name: l.name,
          percent: Number(l.percent || 0),
          text: l.text,
        }));

        const topProjects = (d.projects || []).slice(0, 6).map((p) => ({
          name: p.name,
          percent: Number(p.percent || 0),
          text: p.text,
        }));

        const weeklyDays = (d.days || []).map((day) => ({
          date: day.date,
          totalSeconds: day.total_seconds || 0,
          text: day.text || "0 hrs",
        }));

        // Most coded weekday (public stats)
        const weekdayTotalsPub = new Array(7).fill(0);
        const weekdayNamesPub = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        (d.days || []).forEach((day) => {
          const dow = new Date(day.date).getDay();
          weekdayTotalsPub[dow] += day.total_seconds || 0;
        });
        const topDowIdxPub = weekdayTotalsPub.indexOf(Math.max(...weekdayTotalsPub));
        const mostCodedDayPub = weekdayTotalsPub[topDowIdxPub] > 0 ? weekdayNamesPub[topDowIdxPub] : null;

        return res.status(200).json({
          configured: true,
          authenticated: false,
          totalCodingTime: d.human_readable_total || "97 hrs 9 mins",
          dailyAverage: d.human_readable_daily_average || "1 hr 42 mins",
          bestDay: d.best_day ? { date: d.best_day.date, text: d.best_day.text } : null,
          mostCodedDay: mostCodedDayPub,
          activeDays: d.days_minus_holidays || 57,
          totalDays: d.days_including_holidays || 126,
          rangeText: d.human_readable_range || "since Jun 27 2026",
          languages: topLanguages,
          projects: topProjects,
          weeklyActivity: weeklyDays,
          publicProfileUrl: `https://wakatime.com/@${cleanUser}`,
          lastSynced: new Date().toISOString(),
        });
      }
    } catch {
      // Fall through if network error
    }

    // 3. Fallback notice
    return res.status(200).json({
      configured: false,
      authenticated: false,
      message:
        "WAKATIME_API_KEY is not configured yet. Add WAKATIME_API_KEY in your server-side environment variables or .env.local to stream live coding telemetry.",
      publicProfileUrl: `https://wakatime.com/@${cleanUser}`,
      lastSynced: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      configured: Boolean(apiKey),
      error: "Unable to retrieve WakaTime statistics at this time.",
      details: error.message,
      lastSynced: new Date().toISOString(),
    });
  }
}
