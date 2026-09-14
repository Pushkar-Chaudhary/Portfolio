import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SEO from "../components/SEO.jsx";
import "./Dashboard.css";

const GITHUB_USERNAME = "Pushkar-Chaudhary";
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;
const WAKATIME_PROFILE = "https://wakatime.com/@bf434ed0-2f6c-46e7-ae66-53b01d7fad3d";
const WAKATIME_BADGE_URL = "https://wakatime.com/badge/user/bf434ed0-2f6c-46e7-ae66-53b01d7fad3d.svg";
const CURRENT_YEAR = new Date().getFullYear();

const Dashboard = () => {
  const [contributionData, setContributionData] = useState(null);
  const [githubError, setGithubError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${CURRENT_YEAR}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load contributions");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.contributions) || !data.total) {
          throw new Error("Invalid contribution data");
        }
        setContributionData(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setGithubError(true);
      });

    return () => controller.abort();
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
        <div className="wakatime-time">
          <a className="wakatime-badge" href={WAKATIME_PROFILE} target="_blank" rel="noreferrer">
            <img src={WAKATIME_BADGE_URL} alt="WakaTime coding time" />
          </a>
        </div>
        <section className="dashboard-grid">
          <article className="activity-panel github-panel">
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
            <div className="contribution-graph" aria-label="GitHub contribution graph">
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
              ) : githubError ? (
                <img src={graphUrl} alt="GitHub contribution graph for Pushkar Chaudhary" />
              ) : (
                <div className="graph-loading">Loading contribution history...</div>
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
          </article>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;