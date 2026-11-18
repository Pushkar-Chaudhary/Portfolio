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
} from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
import NepalClock from "../components/NepalClock.jsx";
import "./Dashboard.css";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

async function requestJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

const WAKATIME_CACHE_KEY = "portfolio-dashboard-wakatime";
const GITHUB_CACHE_KEY = "portfolio-dashboard-github";

function readDashboardCache(key) {
  if (typeof window === "undefined") return null;

  try {
    const cached = window.localStorage.getItem(key);
    if (!cached) return null;

    const data = JSON.parse(cached);
    return data && typeof data === "object" ? data : null;
  } catch (error) {
    console.warn("Unable to read cached dashboard data.", error);
    return null;
  }
}

function writeDashboardCache(key, data) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Unable to cache dashboard data.", error);
  }
}

function Dashboard() {
  const [wakatimeData, setWakatimeData] = useState(null);
  const [wakatimeLoading, setWakatimeLoading] = useState(true);
  const [wakatimeError, setWakatimeError] = useState(null);

  const [githubData, setGithubData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(null);

  const [hoveredDay, setHoveredDay] = useState(null);
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: false,
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.45, ease: "easeOut" },
      };

  const refreshWakaTime = async () => {
    setWakatimeLoading(true);
    setWakatimeError(null);
    try {
      const data = await requestJson("/api/wakatime");
      setWakatimeData(data);
      writeDashboardCache(WAKATIME_CACHE_KEY, data);
    } catch (error) {
      setWakatimeError(error.message || "WakaTime stats didn’t load.");
    } finally {
      setWakatimeLoading(false);
    }
  };

  const refreshGitHub = async () => {
    setGithubLoading(true);
    setGithubError(null);
    try {
      const data = await requestJson("/api/github");
      setGithubData(data);
      writeDashboardCache(GITHUB_CACHE_KEY, data);
    } catch (error) {
      setGithubError(error.message || "Failed to load GitHub activity");
    } finally {
      setGithubLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (!active) return;

      const cachedWakatimeData = readDashboardCache(WAKATIME_CACHE_KEY);
      if (cachedWakatimeData) {
        setWakatimeData(cachedWakatimeData);
        setWakatimeLoading(false);
      }

      const cachedGitHubData = readDashboardCache(GITHUB_CACHE_KEY);
      if (cachedGitHubData) {
        setGithubData(cachedGitHubData);
        setGithubLoading(false);
      }
    });

    requestJson("/api/wakatime")
      .then((data) => {
        if (active) {
          setWakatimeData(data);
          writeDashboardCache(WAKATIME_CACHE_KEY, data);
        }
      })
      .catch((error) => {
        if (active) setWakatimeError(error.message || "WakaTime stats didn’t load.");
      })
      .finally(() => {
        if (active) setWakatimeLoading(false);
      });

    requestJson("/api/github")
      .then((data) => {
        if (active) {
          setGithubData(data);
          writeDashboardCache(GITHUB_CACHE_KEY, data);
        }
      })
      .catch((error) => {
        if (active) setGithubError(error.message || "Failed to load GitHub activity");
      })
      .finally(() => {
        if (active) setGithubLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const monthLabelOffsets = useMemo(() => {
    if (!githubData?.weeks || githubData.weeks.length === 0) return [];
    const offsets = [];
    let lastMonth = null;

    githubData.weeks.forEach((week, weekIndex) => {
      const firstDay = week.find((day) => day?.date);
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          offsets.push({ name: monthNames[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    return offsets;
  }, [githubData]);

  const maxWeeklySeconds = useMemo(() => {
    if (!wakatimeData?.weeklyActivity || wakatimeData.weeklyActivity.length === 0) return 1;
    return Math.max(...wakatimeData.weeklyActivity.map((day) => day.totalSeconds || 0), 1);
  }, [wakatimeData]);

  return (
    <div className="page-shell page-shell--narrow">
      <main className="dashboard-flow">
        <motion.header className="dash-hero" {...revealProps}>
          <div className="dash-hero-top">
            <NepalClock showLocation={true} />
          </div>

          <h1 className="dash-title">What I&apos;ve been working on</h1>
          <p className="dash-lead">A look at what I’ve been coding lately.</p>
        </motion.header>

        <motion.section className="telemetry-block" {...revealProps} aria-labelledby="wakatime-heading">
          <div className="telemetry-block-header">
            <div>
              <div className="telemetry-source-tag">
                <SiWakatime aria-hidden="true" />
                <span>WakaTime</span>
              </div>
              <h2 id="wakatime-heading" className="telemetry-block-title">
                My coding time
              </h2>
            </div>

            <div className="telemetry-header-actions">
              {wakatimeData?.lastSynced && (
                <span className="sync-time-tag">
                  Synced: {new Date(wakatimeData.lastSynced).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button
                type="button"
                onClick={refreshWakaTime}
                className="icon-refresh-btn"
                title="Refresh WakaTime data"
                aria-label="Refresh WakaTime stats"
              >
                <FaSyncAlt className={wakatimeLoading ? "is-spinning" : ""} />
              </button>
            </div>
          </div>

          {wakatimeLoading && !wakatimeData && (
            <div className="telemetry-skeleton-grid">
              <div className="dash-skeleton-box" />
              <div className="dash-skeleton-box" />
              <div className="dash-skeleton-box" />
            </div>
          )}

          {!wakatimeLoading && wakatimeError && !wakatimeData && (
            <div className="telemetry-alert-box alert-error" role="alert">
              <FaExclamationCircle className="alert-icon" aria-hidden="true" />
              <div className="alert-body">
                <strong>WakaTime stats didn’t load</strong>
                <p>Please try again in a moment.</p>
                <button type="button" onClick={refreshWakaTime} className="alert-retry-btn">
                  Try Again
                </button>
              </div>
            </div>
          )}

          {wakatimeData && (
            <>
              {!wakatimeLoading && wakatimeError && (
                <div className="telemetry-info-banner" role="status">
                  <FaInfoCircle className="info-icon" aria-hidden="true" />
                  <div className="info-body">
                    <p>I couldn’t refresh the stats, so these are the last ones I saved.</p>
                  </div>
                </div>
              )}

              <div className="waka-metrics-row">
                <div className="waka-metric-card">
                  <span className="waka-metric-label">
                    <FaClock aria-hidden="true" /> Total Coding Time
                  </span>
                  <span className="waka-metric-value">
                    {wakatimeData?.totalCodingTime || "--"}
                  </span>
                  <span className="waka-metric-sub">
                    {wakatimeData?.rangeText ? `All-time · ${wakatimeData.rangeText}` : "Since I started tracking"}
                  </span>
                </div>

                <div className="waka-metric-card">
                  <span className="waka-metric-label">
                    <FaLaptopCode aria-hidden="true" /> Daily Average
                  </span>
                  <span className="waka-metric-value">
                    {wakatimeData?.dailyAverage || "--"}
                  </span>
                  <span className="waka-metric-sub">On days I coded</span>
                </div>

                <div className="waka-metric-card">
                  <span className="waka-metric-label">
                    <FaFire aria-hidden="true" /> Most Hours in One Day
                  </span>
                  <span className="waka-metric-value">
                    {wakatimeData?.bestDay?.text || "--"}
                  </span>
                  <span className="waka-metric-sub">
                    {wakatimeData?.bestDay?.date
                      ? new Date(wakatimeData.bestDay.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : wakatimeData?.authenticated === false
                        ? "More daily stats aren’t available yet"
                        : "My best day in the available stats"}
                  </span>
                </div>

                {wakatimeData?.mostCodedDay && (
                  <div className="waka-metric-card">
                    <span className="waka-metric-label">
                      <FaCalendarAlt aria-hidden="true" /> Most active day
                    </span>
                    <span className="waka-metric-value">
                      {wakatimeData.mostCodedDay}
                    </span>
                    <span className="waka-metric-sub">My busiest day this week</span>
                  </div>
                )}
              </div>

              {wakatimeData?.weeklyActivity && wakatimeData.weeklyActivity.length > 0 && (
                <div className="weekly-chart-box">
                  <div className="chart-box-header">
                    <h3 className="chart-box-title">Time spent coding each day</h3>
                    <span className="chart-box-meta">The past week</span>
                  </div>

                  <div className="weekly-bars-container">
                    {wakatimeData.weeklyActivity.map((day) => {
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

              <div className="breakdown-grid">
                <div className="breakdown-card">
                  <div className="breakdown-card-header">
                    <h3 className="breakdown-title">Top Languages</h3>
                    <span className="breakdown-sub">By time spent</span>
                  </div>

                  {wakatimeData?.languages && wakatimeData.languages.length > 0 ? (
                    <div className="breakdown-items-list">
                      {wakatimeData.languages.map((language) => (
                        <div key={language.name} className="breakdown-row">
                          <div className="breakdown-row-info">
                            <span className="breakdown-name">{language.name}</span>
                            <span className="breakdown-percent">
                              {language.percent ? `${language.percent.toFixed(1)}%` : ""} ({language.text})
                            </span>
                          </div>
                          <div className="breakdown-progress-track">
                            <div
                              className="breakdown-progress-bar"
                              style={{ width: `${Math.min(language.percent, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-subtext">No language stats to show for this period.</p>
                  )}
                </div>

                <div className="breakdown-card">
                  <div className="breakdown-card-header">
                    <h3 className="breakdown-title">Projects I’ve worked on</h3>
                    <span className="breakdown-sub">By time spent</span>
                  </div>

                  {wakatimeData?.projects && wakatimeData.projects.length > 0 ? (
                    <div className="breakdown-items-list">
                      {wakatimeData.projects.map((project) => (
                        <div key={project.name} className="breakdown-row">
                          <div className="breakdown-row-info">
                            <span className="breakdown-name">{project.name}</span>
                            <span className="breakdown-percent">
                              {project.percent ? `${project.percent.toFixed(1)}%` : ""} ({project.text})
                            </span>
                          </div>
                          <div className="breakdown-progress-track">
                            <div
                              className="breakdown-progress-bar project-bar"
                              style={{ width: `${Math.min(project.percent, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-subtext">No project stats to show for this period.</p>
                  )}
                </div>
              </div>

              {!wakatimeData?.authenticated && (
                <div className="telemetry-info-banner">
                  <FaInfoCircle className="info-icon" aria-hidden="true" />
                  <div className="info-body">
                    <strong>More WakaTime stats</strong>
                    <p>
                      My public WakaTime profile has a few more details:{" "}
                      <a
                        href={wakatimeData?.publicProfileUrl || "https://wakatime.com/@bf434ed0-2f6c-46e7-ae66-53b01d7fad3d"}
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

        <motion.section className="telemetry-block" {...revealProps} aria-labelledby="github-heading">
          <div className="telemetry-block-header">
            <div>
              <div className="telemetry-source-tag">
                <FaGithub aria-hidden="true" />
                <span>GitHub</span>
              </div>
              <h2 id="github-heading" className="telemetry-block-title">
                Contributions over the past year
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

          {githubData && (
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
                <span className="ticker-sub">Days in a row with contributions</span>
              </div>

              <div className="stat-ticker-divider" />

              <div className="stat-ticker-item">
                <span className="ticker-label">Current Streak</span>
                <span className="ticker-number">
                  {githubData?.currentStreak ? `${githubData.currentStreak} days` : "0 days"}
                </span>
                <span className="ticker-sub">Days in a row with contributions</span>
              </div>
            </div>
          )}

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
                Move over a square to see the day and contribution count.
              </span>
            )}
          </div>

          <div className="heatmap-scroll-wrapper" role="region" aria-label="Contribution calendar">
            {githubLoading && !githubData && (
              <div className="heatmap-loading-state" role="status">
                <FaSyncAlt className="is-spinning" /> Loading my GitHub activity...
              </div>
            )}

            {!githubLoading && githubError && !githubData && (
              <div className="telemetry-alert-box alert-error">
                <FaExclamationCircle className="alert-icon" />
                <div className="alert-body">
                  <strong>GitHub contributions didn’t load</strong>
                  <p>{githubError}</p>
                  <button type="button" onClick={refreshGitHub} className="alert-retry-btn">
                    Retry
                  </button>
                </div>
              </div>
            )}

            {githubData?.weeks && (
              <>
              {!githubLoading && githubError && (
                <div className="telemetry-info-banner" role="status">
                  <FaInfoCircle className="info-icon" aria-hidden="true" />
                  <div className="info-body">
                    <p>I couldn’t refresh the calendar, so this is the last one I saved.</p>
                  </div>
                </div>
              )}
              <div className="heatmap-matrix">
                <div className="heatmap-weekdays" aria-hidden="true">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                <div className="heatmap-weeks-stream">
                  <div className="heatmap-months-row" aria-hidden="true">
                    {monthLabelOffsets.map((month, index) => (
                      <span
                        key={`${month.name}-${index}`}
                        className="month-header-label"
                        style={{ gridColumnStart: month.weekIndex + 1 }}
                      >
                        {month.name}
                      </span>
                    ))}
                  </div>

                  <div className="heatmap-columns">
                    {githubData.weeks.map((week, weekIndex) => (
                      <div key={`week-${weekIndex}`} className="heatmap-col">
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
              </>
            )}
          </div>

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
