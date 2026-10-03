import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SEO from "../components/SEO.jsx";
import TiltCard from "../components/TiltCard.jsx";
import "./Dashboard.css";

const GITHUB_USERNAME = "Pushkar-Chaudhary";
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;
const WAKATIME_PROFILE = "https://wakatime.com/@bf434ed0-2f6c-46e7-ae66-53b01d7fad3d";
const WAKATIME_BADGE_URL = "https://wakatime.com/badge/user/bf434ed0-2f6c-46e7-ae66-53b01d7fad3d.svg";
const CURRENT_YEAR = new Date().getFullYear();

const Dashboard = () => {
  const [contributionData, setContributionData] = useState(null);
  const [githubError, setGithubError] = useState(false);
  const [graphFallbackError, setGraphFallbackError] = useState(false);
  const [wakatimeError, setWakatimeError] = useState(false);
  const [wakatimeLoaded, setWakatimeLoaded] = useState(false);
  const reducedMotion = useReducedMotion();
  const revealProps = reducedMotion
    ? {
        initial: false,
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  useEffect(() => {
    const controller = new AbortController();
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 10000);

    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${CURRENT_YEAR}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load contributions");
        return response.json();
      })
      .then((data) => {
        const validContributions =
          Array.isArray(data?.contributions) &&
          data.contributions.every(
            (contribution) =>
              contribution &&
              Number.isInteger(contribution.count) &&
              typeof contribution.date === "string" &&
              Number.isInteger(contribution.level) &&
              contribution.level >= 0 &&
              contribution.level <= 4,
          );

        if (!validContributions) {
          throw new Error("Invalid contribution data");
        }
        setContributionData(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError" || timedOut) setGithubError(true);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const contributionWeeks = useMemo(() => {
    if (!contributionData?.contributions) return [];

    return contributionData.contributions.reduce((weeks, contribution, index) => {
      const weekIndex = Math.floor(index / 7);
      if (!weeks[weekIndex]) weeks[weekIndex] = [];
      weeks[weekIndex].push(contribution);
      return weeks;
    }, []);
  }, [contributionData]);

  const currentYearCommits = contributionData?.contributions?.reduce(
    (total, contribution) => total + contribution.count,
    0,
  );
  const graphUrl = `https://ghchart.rshah.org/2f9e72/${GITHUB_USERNAME}`;

  return (
    <div className="dashboard-page">
      <SEO
        title="Dashboard | Pushkar Chaudhary"
        description="A live look at Pushkar Chaudhary's coding activity and GitHub contributions."
        path="/dashboard"
      />

      <main className="dashboard-shell">
        <motion.header className="dashboard-intro-card" {...revealProps}>
          <p className="dashboard-kicker">Live dashboard</p>
          <h1>Coding activity</h1>
          <p className="dashboard-intro">
            A live look at GitHub contributions and WakaTime tracking.
          </p>
        </motion.header>

        <div className="wakatime-time">
          <a
            className="wakatime-badge"
            href={WAKATIME_PROFILE}
            target="_blank"
            rel="noreferrer"
            aria-busy={!wakatimeLoaded && !wakatimeError}
          >
            {wakatimeError ? (
              <span className="wakatime-fallback">
                View WakaTime profile <FaExternalLinkAlt aria-hidden="true" />
              </span>
            ) : (
              <>
                {!wakatimeLoaded && (
                  <span className="wakatime-loading" role="status">
                    Loading WakaTime summary...
                  </span>
                )}
                <img
                  src={WAKATIME_BADGE_URL}
                  alt="WakaTime coding time"
                  onLoad={() => setWakatimeLoaded(true)}
                  onError={() => setWakatimeError(true)}
                />
              </>
            )}
          </a>
        </div>
        <section className="dashboard-grid">
          <TiltCard
            as={motion.article}
            className="activity-panel github-panel"
            {...revealProps}
          >
            <div className="panel-heading">
              <div>
                <span className="panel-eyebrow"><FaGithub aria-hidden="true" /> GitHub</span>
                <h2>{currentYearCommits ?? "--"} commits this year</h2>
              </div>
              <a className="dashboard-profile-link" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
                <FaGithub aria-hidden="true" />
                View GitHub
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </div>
            <div
              className="contribution-graph"
              aria-label="GitHub contribution graph"
              aria-busy={!contributionData && !githubError}
            >
              {contributionWeeks.length > 0 ? (
                <div className="contribution-weeks">
                  {contributionWeeks.map((week, weekIndex) => (
                    <div className="contribution-week" key={`week-${weekIndex}`}>
                      {week.map((day) => (
                        <span
                          className={`contribution-day contribution-day--${day.level}`}
                          key={day.date}
                          title={`${day.count} commits on ${day.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ) : contributionData ? (
                <div className="graph-loading" role="status">
                  No contribution activity recorded this year.
                </div>
              ) : githubError && !graphFallbackError ? (
                <img
                  src={graphUrl}
                  alt="GitHub contribution graph for Pushkar Chaudhary"
                  onError={() => setGraphFallbackError(true)}
                />
              ) : githubError ? (
                <div className="graph-loading graph-fallback" role="status">
                  Contribution activity is unavailable right now.{" "}
                  <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
                    View GitHub profile
                  </a>
                </div>
              ) : (
                <div className="graph-loading" role="status">
                  Loading contribution history...
                </div>
              )}
            </div>
            <div className="graph-footer">
              <span>Less</span>
              <i className="contribution-day contribution-day--0" />
              <i className="contribution-day contribution-day--1" />
              <i className="contribution-day contribution-day--2" />
              <i className="contribution-day contribution-day--3" />
              <i className="contribution-day contribution-day--4" />
              <span>More</span>
            </div>
          </TiltCard>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;