import { useEffect, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaClock,
  FaFire,
  FaCalendarAlt,
  FaLaptopCode,
  FaSyncAlt,
  FaExclamationCircle,
  FaInfoCircle,
  FaStar,
} from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
import SEO from "../components/SEO.jsx";
import NepalClock from "../components/NepalClock.jsx";
import "./Dashboard.css";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Dashboard() {
  const [wakaData, setWakaData] = useState(null);
  const [wakaLoading, setWakaLoading] = useState(true);
  const [wakaError, setWakaError] = useState(null);

  const [githubData, setGithubData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(null);

  const [hoveredDay, setHoveredDay] = useState(null);
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.45, ease: "easeOut" },
      };

  const fetchWakaTime = async () => {
    setWakaLoading(true);
    setWakaError(null);
    try {
      const res = await fetch("/api/wakatime");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setWakaData(data);
    } catch (err) {
      setWakaError(err.message || "Failed to load WakaTime telemetry");
    } finally {
      setWakaLoading(false);
    }
  };

  const fetchGitHub = async () => {
    setGithubLoading(true);
    setGithubError(null);
    try {
      const res = await fetch("/api/github");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setGithubData(data);
    } catch (err) {
      setGithubError(err.message || "Failed to load GitHub activity");
    } finally {
      setGithubLoading(false);
    }
  };

  useEffect(() => {
    fetchWakaTime();
    fetchGitHub();
  }, []);

  // Compute month label offsets across calendar weeks
  const monthLabelOffsets = useMemo(() => {
    if (!githubData?.weeks || githubData.weeks.length === 0) return [];
    const offsets = [];
    let lastMonth = -1;

    githubData.weeks.forEach((week, weekIdx) => {
      const firstValidDay = week.find((d) => d && d.date);
      if (firstValidDay) {
        const m = new Date(firstValidDay.date).getMonth();
        if (m !== lastMonth) {
          offsets.push({ name: monthNames[m], weekIndex: weekIdx });
          lastMonth = m;
        }
      }
    });

    return offsets;
  }, [githubData]);

  // Max seconds in weekly breakdown for scaling the bar chart
  const maxWeeklySeconds = useMemo(() => {
    if (!wakaData?.weeklyActivity || wakaData.weeklyActivity.length === 0) return 1;
    return Math.max(...wakaData.weeklyActivity.map((d) => d.totalSeconds || 0), 1);
  }, [wakaData]);

  return (
    <div className="page-shell page-shell--wide">
      <SEO
        title="Dashboard | Pushkar Chaudhary - Developer Analytics"
        description="Live developer telemetry, GitHub contributions, and WakaTime coding activity for Pushkar Chaudhary."
        path="/dashboard"
      />

      <main className="dashboard-flow">
        {/* Editorial Header */}
        <motion.header className="dash-hero" {...revealProps}>
          <div className="dash-hero-top">
            <span className="live-status-badge">
              <span className="status-ping" />
              <span>Telemetry &amp; Activity</span>
            </span>
            <NepalClock showLocation={true} />
          </div>

          <h1 className="dash-title">Developer Activity</h1>
          <p className="dash-lead">
            Real-time coding analytics streamed directly from verified GitHub contributions and WakaTime telemetry.
          </p>
        </motion.header>

        {/* ============================================================== */}
        {/* SECTION A: WAKATIME CODING ACTIVITY                            */}
        {/* ============================================================== */}
        <motion.section className="telemetry-block" {...revealProps} aria-labelledby="wakatime-heading">
          <div className="telemetry-block-header">
            <div>
              <div className="telemetry-source-tag">
                <SiWakatime aria-hidden="true" />
                <span>WakaTime Official API</span>
              </div>
              <h2 id="wakatime-heading" className="telemetry-block-title">
                Coding Time &amp; Velocity
              </h2>
            </div>

            <div className="telemetry-header-actions">
              {wakaData?.lastSynced && (
                <span className="sync-time-tag">
                  Synced: {new Date(wakaData.lastSynced).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button
                type="button"
                onClick={fetchWakaTime}
                className="icon-refresh-btn"
                title="Refresh WakaTime data"
                aria-label="Refresh WakaTime telemetry"
              >
                <FaSyncAlt className={wakaLoading ? "is-spinning" : ""} />
              </button>
            </div>
          </div>

          {/* Loading Skeleton */}
          {wakaLoading && (
            <div className="telemetry-skeleton-grid">
              <div className="dash-skeleton-box" />
              <div className="dash-skeleton-box" />
              <div className="dash-skeleton-box" />
            </div>
          )}

          {/* Error State */}
          {!wakaLoading && wakaError && (
            <div className="telemetry-alert-box alert-error" role="alert">
              <FaExclamationCircle className="alert-icon" aria-hidden="true" />
              <div className="alert-body">
                <strong>Unable to load WakaTime telemetry</strong>
                <p>{wakaError}</p>
                <button type="button" onClick={fetchWakaTime} className="alert-retry-btn">
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Key Metric Tickers */}
          {!wakaLoading && !wakaError && (
            <>
              <div className="waka-metrics-row">
                <div className="waka-metric-card">
                  <span className="waka-metric-label">
                    <FaClock aria-hidden="true" /> Total Coding Time
                  </span>
                  <span className="waka-metric-value">
                    {wakaData?.totalCodingTime || "--"}
                  </span>
                  <span className="waka-metric-sub">Cumulative tracked time</span>
                </div>

                <div className="waka-metric-card">
                  <span className="waka-metric-label">
                    <FaLaptopCode aria-hidden="true" /> Daily Average
                  </span>
                  <span className="waka-metric-value">
                    {wakaData?.dailyAverage || "--"}
                  </span>
                  <span className="waka-metric-sub">Across active coding days</span>
                </div>

                <div className="waka-metric-card">
                  <span className="waka-metric-label">
                    <FaFire aria-hidden="true" /> {wakaData?.bestDay ? "Best Coding Day" : "Active Coding Days"}
                  </span>
                  <span className="waka-metric-value">
                    {wakaData?.bestDay?.text || (wakaData?.activeDays ? `${wakaData.activeDays} Days` : "--")}
                  </span>
                  <span className="waka-metric-sub">
                    {wakaData?.bestDay?.date
                      ? new Date(wakaData.bestDay.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : wakaData?.rangeText
                      ? `Recorded ${wakaData.rangeText}`
                      : "Highest recorded hours"}
                  </span>
                </div>

                {wakaData?.mostCodedDay && (
                  <div className="waka-metric-card">
                    <span className="waka-metric-label">
                      <FaCalendarAlt aria-hidden="true" /> Most Coded Day
                    </span>
                    <span className="waka-metric-value">
                      {wakaData.mostCodedDay}
                    </span>
                    <span className="waka-metric-sub">Highest weekly output</span>
                  </div>
                )}
              </div>

              {/* Weekly Activity Bar Chart */}
              {wakaData?.weeklyActivity && wakaData.weeklyActivity.length > 0 && (
                <div className="weekly-chart-box">
                  <div className="chart-box-header">
                    <h3 className="chart-box-title">Weekly Coding Distribution</h3>
                    <span className="chart-box-meta">Past 7 days activity</span>
                  </div>

                  <div className="weekly-bars-container">
                    {wakaData.weeklyActivity.map((day) => {
                      const heightPercent = Math.max(
                        Math.round(((day.totalSeconds || 0) / maxWeeklySeconds) * 100),
                        6
                      );
                      const dayName = new Date(day.date).toLocaleDateString(undefined, {
                        weekday: "short",
                      });

                      return (
                        <div key={day.date} className="weekly-bar-col">
                          <div className="bar-hover-tooltip">{day.text}</div>
                          <div className="bar-track">
                            <div
                              className="bar-fill"
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <span className="bar-day-label">{dayName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Breakdown Split: Languages & Projects */}
              <div className="breakdown-grid">
                {/* Languages */}
                <div className="breakdown-card">
                  <div className="breakdown-card-header">
                    <h3 className="breakdown-title">Top Languages</h3>
                    <span className="breakdown-sub">By time spent</span>
                  </div>

                  {wakaData?.languages && wakaData.languages.length > 0 ? (
                    <div className="breakdown-items-list">
                      {wakaData.languages.map((lang) => (
                        <div key={lang.name} className="breakdown-row">
                          <div className="breakdown-row-info">
                            <span className="breakdown-name">{lang.name}</span>
                            <span className="breakdown-percent">
                              {lang.percent ? `${lang.percent.toFixed(1)}%` : ""} ({lang.text})
                            </span>
                          </div>
                          <div className="breakdown-progress-track">
                            <div
                              className="breakdown-progress-bar"
                              style={{ width: `${Math.min(lang.percent, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-subtext">No language statistics recorded for this period.</p>
                  )}
                </div>

                {/* Projects */}
                <div className="breakdown-card">
                  <div className="breakdown-card-header">
                    <h3 className="breakdown-title">Active Projects</h3>
                    <span className="breakdown-sub">By coding duration</span>
                  </div>

                  {wakaData?.projects && wakaData.projects.length > 0 ? (
                    <div className="breakdown-items-list">
                      {wakaData.projects.map((proj) => (
                        <div key={proj.name} className="breakdown-row">
                          <div className="breakdown-row-info">
                            <span className="breakdown-name">{proj.name}</span>
                            <span className="breakdown-percent">
                              {proj.percent ? `${proj.percent.toFixed(1)}%` : ""} ({proj.text})
                            </span>
                          </div>
                          <div className="breakdown-progress-track">
                            <div
                              className="breakdown-progress-bar project-bar"
                              style={{ width: `${Math.min(proj.percent, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-subtext">No project statistics recorded for this period.</p>
                  )}
                </div>
              </div>

              {/* Notice when WAKATIME_API_KEY is not configured */}
              {!wakaData?.authenticated && (
                <div className="telemetry-info-banner">
                  <FaInfoCircle className="info-icon" aria-hidden="true" />
                  <div className="info-body">
                    <strong>WakaTime Configuration Note</strong>
                    <p>
                      To stream authenticated personal coding telemetry, set{" "}
                      <code>WAKATIME_API_KEY</code> in your Vercel Environment Variables or{" "}
                      <code>.env.local</code>. Public telemetry profile is linked at{" "}
                      <a
                        href={wakaData?.publicProfileUrl || "https://wakatime.com/@bf434ed0-2f6c-46e7-ae66-53b01d7fad3d"}
                        target="_blank"
                        rel="noreferrer"
                        className="info-link"
                      >
                        wakatime.com ↗
                      </a>.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.section>

        {/* ============================================================== */}
        {/* SECTION B: GITHUB 12-MONTH CONTRIBUTION HEATMAP                 */}
        {/* ============================================================== */}
        <motion.section className="telemetry-block" {...revealProps} aria-labelledby="github-heading">
          <div className="telemetry-block-header">
            <div>
              <div className="telemetry-source-tag">
                <FaGithub aria-hidden="true" />
                <span>GitHub Contribution Calendar</span>
              </div>
              <h2 id="github-heading" className="telemetry-block-title">
                12-Month Contribution Heatmap
              </h2>
            </div>

            <div className="telemetry-header-actions">
              {githubData?.lastSynced && (
                <span className="sync-time-tag">
                  Synced: {new Date(githubData.lastSynced).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <a
                href={`https://github.com/${githubData?.username || "Pushkar-Chaudhary"}`}
                target="_blank"
                rel="noreferrer"
                className="external-profile-link"
              >
                <FaGithub aria-hidden="true" />
                <span>@{githubData?.username || "Pushkar-Chaudhary"}</span>
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* GitHub Key Stats Row */}
          {!githubLoading && !githubError && (
            <div className="github-stats-ticker">
              <div className="stat-ticker-item">
                <span className="ticker-label">
                  <FaCalendarAlt aria-hidden="true" /> Past 12 Months
                </span>
                <span className="ticker-number">{githubData?.totalContributions ?? "--"}</span>
                <span className="ticker-sub">Total contributions</span>
              </div>

              <div className="stat-ticker-divider" />

              <div className="stat-ticker-item">
                <span className="ticker-label">
                  <FaFire aria-hidden="true" /> Longest Streak
                </span>
                <span className="ticker-number">
                  {githubData?.longestStreak ? `${githubData.longestStreak} days` : "--"}
                </span>
                <span className="ticker-sub">Consecutive coding days</span>
              </div>

              <div className="stat-ticker-divider" />

              <div className="stat-ticker-item">
                <span className="ticker-label">Current Streak</span>
                <span className="ticker-number">
                  {githubData?.currentStreak ? `${githubData.currentStreak} days` : "0 days"}
                </span>
                <span className="ticker-sub">Active continuous streak</span>
              </div>
            </div>
          )}

          {/* Interactive Day Details Banner */}
          <div className="heatmap-hover-banner">
            {hoveredDay ? (
              <span className="hover-active-text">
                <strong>{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? "" : "s"} on{" "}
                {new Date(hoveredDay.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ) : (
              <span className="hover-idle-text">
                Hover over calendar squares to inspect contribution dates and counts.
              </span>
            )}
          </div>

          {/* Heatmap Container */}
          <div className="heatmap-scroll-wrapper" role="region" aria-label="Contribution calendar">
            {githubLoading && (
              <div className="heatmap-loading-state" role="status">
                <FaSyncAlt className="is-spinning" /> Loading 12-month GitHub calendar...
              </div>
            )}

            {!githubLoading && githubError && (
              <div className="telemetry-alert-box alert-error">
                <FaExclamationCircle className="alert-icon" />
                <div className="alert-body">
                  <strong>Failed to stream GitHub contributions</strong>
                  <p>{githubError}</p>
                  <button type="button" onClick={fetchGitHub} className="alert-retry-btn">
                    Retry
                  </button>
                </div>
              </div>
            )}

            {!githubLoading && !githubError && githubData?.weeks && (
              <div className="heatmap-matrix">
                {/* Weekday indicators column */}
                <div className="heatmap-weekdays" aria-hidden="true">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Grid columns */}
                <div className="heatmap-weeks-stream">
                  {/* Month header row */}
                  <div className="heatmap-months-row" aria-hidden="true">
                    {monthLabelOffsets.map((m, idx) => (
                      <span
                        key={`${m.name}-${idx}`}
                        className="month-header-label"
                        style={{ gridColumnStart: m.weekIndex + 1 }}
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>

                  {/* Calendar columns */}
                  <div className="heatmap-columns">
                    {githubData.weeks.map((week, wIdx) => (
                      <div key={`w-${wIdx}`} className="heatmap-col">
                        {week.map((day) => (
                          <span
                            key={day.date}
                            className={`heat-square heat-level-${day.level}`}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            tabIndex={0}
                            role="button"
                            aria-label={`${day.count} contributions on ${day.date}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="heatmap-footer-legend">
            <span className="legend-label">Less</span>
            <span className="heat-square heat-level-0" aria-hidden="true" />
            <span className="heat-square heat-level-1" aria-hidden="true" />
            <span className="heat-square heat-level-2" aria-hidden="true" />
            <span className="heat-square heat-level-3" aria-hidden="true" />
            <span className="heat-square heat-level-4" aria-hidden="true" />
            <span className="legend-label">More</span>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Dashboard;