// Serverless Function: /api/wakatime
// Fetches WakaTime statistics securely server-side without exposing OAuth tokens.

function getBestDay(stats) {
  if (stats.best_day) {
    return {
      date: stats.best_day.date,
      text: stats.best_day.text || `${Math.round((stats.best_day.total_seconds || 0) / 3600)} hrs`,
    };
  }

  const bestDay = (stats.days || []).reduce(
    (best, day) => (day.total_seconds > (best?.total_seconds || 0) ? day : best),
    null
  );

  return bestDay
    ? {
        date: bestDay.date,
        text: bestDay.text || `${Math.round((bestDay.total_seconds || 0) / 3600)} hrs`,
      }
    : null;
}

export default async function handler(req, res) {
  // CORS & Cache headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");

  const accessToken = (process.env.WAKATIME_OAUTH_ACCESS_TOKEN || "").trim();
  const rawUser = process.env.WAKATIME_USER_ID || "bf434ed0-2f6c-46e7-ae66-53b01d7fad3d";
  const cleanUser = rawUser.replace(/^@/, "");

  try {
    // WakaTime API keys are write-only; OAuth is required to read private stats.
    if (accessToken) {
      const [weeklyRes, allTimeRes] = await Promise.allSettled([
        fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("https://wakatime.com/api/v1/users/current/stats/all_time", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      const weeklyData =
        weeklyRes.status === "fulfilled" && weeklyRes.value.ok
          ? await weeklyRes.value.json()
          : null;
      const allTimeData =
        allTimeRes.status === "fulfilled" && allTimeRes.value.ok
          ? await allTimeRes.value.json()
          : null;

      if (allTimeData?.data) {
        const allTime = allTimeData.data;
        const weekly = weeklyData?.data || {};

        const topLanguages = (allTime.languages || []).slice(0, 6).map((lang) => ({
          name: lang.name,
          percent: Number(lang.percent || 0),
          text: lang.text || `${Math.round((lang.total_seconds || 0) / 3600)} hrs`,
          totalSeconds: lang.total_seconds || 0,
        }));

        const topProjects = (allTime.projects || []).slice(0, 6).map((proj) => ({
          name: proj.name,
          percent: Number(proj.percent || 0),
          text: proj.text || `${Math.round((proj.total_seconds || 0) / 3600)} hrs`,
          totalSeconds: proj.total_seconds || 0,
        }));

        const weeklyDays = (weekly.days || []).map((day) => ({
          date: day.date,
          totalSeconds: day.total_seconds || 0,
          text: day.text || "0 hrs",
        }));

        const weekdayTotals = new Array(7).fill(0);
        const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        weeklyDays.forEach((day) => {
          const dow = new Date(day.date).getDay();
          weekdayTotals[dow] += day.totalSeconds || 0;
        });
        const topDowIdx = weekdayTotals.indexOf(Math.max(...weekdayTotals));
        const mostCodedDay = weekdayTotals[topDowIdx] > 0 ? weekdayNames[topDowIdx] : null;

        return res.status(200).json({
          configured: true,
          authenticated: true,
          totalCodingTime: allTime.human_readable_total || allTime.text || "--",
          rangeText: allTime.human_readable_range || "",
          dailyAverage: allTime.human_readable_daily_average || weekly.human_readable_daily_average || "--",
          bestDay: getBestDay(allTime),
          mostCodedDay,
          languages: topLanguages,
          projects: topProjects,
          weeklyActivity: weeklyDays,
          activeDays: allTime.days_minus_holidays,
          lastSynced: new Date().toISOString(),
        });
      }
    }

    // Public stats may provide totals, but not the all-time best coding day.
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

      const weekdayTotalsPub = new Array(7).fill(0);
      const weekdayNamesPub = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      (d.days || []).forEach((day) => {
        const dow = new Date(day.date).getDay();
        weekdayTotalsPub[dow] += day.total_seconds || 0;
      });
      const topDowIdxPub = weekdayTotalsPub.indexOf(Math.max(...weekdayTotalsPub));
      const mostCodedDayPub = weekdayTotalsPub[topDowIdxPub] > 0 ? weekdayNamesPub[topDowIdxPub] : null;

      return res.status(200).json({
        configured: false,
        authenticated: false,
        totalCodingTime: d.human_readable_total || "--",
        dailyAverage: d.human_readable_daily_average || "--",
        bestDay: getBestDay(d),
        mostCodedDay: mostCodedDayPub,
        activeDays: d.days_minus_holidays,
        totalDays: d.days_including_holidays,
        rangeText: d.human_readable_range || "",
        languages: topLanguages,
        projects: topProjects,
        weeklyActivity: weeklyDays,
        publicProfileUrl: `https://wakatime.com/@${cleanUser}`,
        lastSynced: new Date().toISOString(),
      });
    }

    // Public stats are unavailable.
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
