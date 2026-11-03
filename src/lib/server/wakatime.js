function getBestDay(stats) {
  if (stats.best_day?.date && stats.best_day?.text) {
    return { date: stats.best_day.date, text: stats.best_day.text };
  }

  const bestDay = (stats.days || []).reduce((best, day) => {
    const totalSeconds = Number(day.total_seconds) || 0;
    return totalSeconds > (best?.totalSeconds || 0)
      ? { ...day, totalSeconds }
      : best;
  }, null);

  if (!bestDay?.date || bestDay.totalSeconds <= 0) return null;

  return {
    date: bestDay.date,
    text: bestDay.text || `${Math.round(bestDay.totalSeconds / 3600)} hrs`,
  };
}

function getBreakdown(items = []) {
  const entries = Array.isArray(items) ? items : [];
  return entries.slice(0, 6).map((item) => ({
    name: item.name,
    percent: Number(item.percent || 0),
    text: item.text || `${Math.round((item.total_seconds || 0) / 3600)} hrs`,
    totalSeconds: item.total_seconds || 0,
  }));
}

function getMostCodedDay(days = []) {
  const weekdayTotals = new Array(7).fill(0);

  days.forEach((day) => {
    if (!day.date) return;
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    weekdayTotals[weekday] += Number(day.total_seconds ?? day.totalSeconds) || 0;
  });

  const highestDay = weekdayTotals.indexOf(Math.max(...weekdayTotals));
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekdayTotals[highestDay] > 0 ? weekdayNames[highestDay] : null;
}

function getWeeklyActivity(days = []) {
  return days.map((day) => ({
    date: day.date,
    totalSeconds: Number(day.total_seconds) || 0,
    text: day.text || "0 hrs",
  }));
}

export default async function handler(_req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");

  const accessToken = (process.env.WAKATIME_OAUTH_ACCESS_TOKEN || "").trim();
  const rawUser = process.env.WAKATIME_USER_ID || "bf434ed0-2f6c-46e7-ae66-53b01d7fad3d";
  const cleanUser = rawUser.replace(/^@/, "");

  try {
    if (accessToken) {
      const [weeklyResult, allTimeResult] = await Promise.allSettled([
        fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("https://wakatime.com/api/v1/users/current/stats/all_time", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      const weeklyData =
        weeklyResult.status === "fulfilled" && weeklyResult.value.ok
          ? await weeklyResult.value.json()
          : null;
      const allTimeData =
        allTimeResult.status === "fulfilled" && allTimeResult.value.ok
          ? await allTimeResult.value.json()
          : null;

      if (allTimeData?.data) {
        const allTime = allTimeData.data;
        const weekly = weeklyData?.data || {};
        const weeklyDays = getWeeklyActivity(weekly.days);

        return res.status(200).json({
          configured: true,
          authenticated: true,
          totalCodingTime:
            allTime.human_readable_total || allTime.text || "--",
          rangeText: allTime.human_readable_range || "",
          dailyAverage:
            allTime.human_readable_daily_average ||
            weekly.human_readable_daily_average ||
            "--",
          bestDay: getBestDay(allTime),
          mostCodedDay: getMostCodedDay(weeklyDays),
          languages: getBreakdown(allTime.languages),
          projects: getBreakdown(allTime.projects),
          weeklyActivity: weeklyDays,
          activeDays: allTime.days_minus_holidays,
          lastSynced: new Date().toISOString(),
        });
      }
    }

    const publicResponse = await fetch(
      `https://wakatime.com/api/v1/users/${cleanUser}/stats/all_time`,
      { headers: { Accept: "application/json" } },
    );

    if (publicResponse.ok) {
      const publicData = await publicResponse.json();
      const stats = publicData?.data || {};
      const weeklyActivity = getWeeklyActivity(stats.days);

      return res.status(200).json({
        configured: false,
        authenticated: false,
        totalCodingTime: stats.human_readable_total || "--",
        dailyAverage: stats.human_readable_daily_average || "--",
        bestDay: getBestDay(stats),
        mostCodedDay: getMostCodedDay(weeklyActivity),
        activeDays: stats.days_minus_holidays,
        totalDays: stats.days_including_holidays,
        rangeText: stats.human_readable_range || "",
        languages: getBreakdown(stats.languages),
        projects: getBreakdown(stats.projects),
        weeklyActivity,
        publicProfileUrl: `https://wakatime.com/@${cleanUser}`,
        lastSynced: new Date().toISOString(),
      });
    }

    return res.status(200).json({
      configured: false,
      authenticated: false,
      message:
        "Public WakaTime stats are unavailable. Configure a WAKATIME_OAUTH_ACCESS_TOKEN with read_stats scope to retrieve coding telemetry.",
      publicProfileUrl: `https://wakatime.com/@${cleanUser}`,
      lastSynced: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      configured: Boolean(accessToken),
      error: "Unable to retrieve WakaTime statistics at this time.",
      details: error.message,
      lastSynced: new Date().toISOString(),
    });
  }
}
