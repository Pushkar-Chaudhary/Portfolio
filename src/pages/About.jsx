import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";
import NepalClock from "../components/NepalClock.jsx";
import education from "../data/education.js";
import {
  SiMongodb,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiExpress,
  SiVite,
  SiGooglegemini,
  SiCursor,
  SiTypescript,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillCategories = [
  {
    category: "Languages & Core",
    skills: [
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss /> },
    ],
  },
  {
    category: "Frontend Architecture",
    skills: [
      { name: "React 19", icon: <SiReact /> },
      { name: "Vite", icon: <SiVite /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
    ],
  },
  {
    category: "AI & External APIs",
    skills: [
      { name: "Gemini API", icon: <SiGooglegemini /> },
    ],
  },
  {
    category: "Workflow & Tooling",
    skills: [
      { name: "VS Code", icon: <VscVscode /> },
      { name: "Cursor", icon: <SiCursor /> },
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Vercel", icon: <SiVercel /> },
    ],
  },
];

const timelineEntries = [
  {
    year: "2026",
    title: "Full-Stack & AI Systems",
    text: "Building end-to-end applications with React 19, Node.js, and Express. Integrating Gemini API into production utilities and refining developer workflow.",
  },
  {
    year: "2025",
    title: "Component Architecture & UX",
    text: "Deepened expertise in React state management, Tailwind CSS design systems, Framer Motion, and responsive mobile-first interfaces.",
  },
  {
    year: "2024",
    title: "Web Fundamentals",
    text: "Started engineering for the web with modern semantic HTML5, CSS grid/flexbox, JavaScript ES6+, and foundational programming concepts.",
  },
];

function About() {
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.45, ease: "easeOut" },
      };

  return (
    <div className="page-shell page-shell--narrow">
      <SEO
        title="About | Pushkar Chaudhary - Developer & Designer"
        description="Learn more about Pushkar Chaudhary, a frontend and web developer based in Nepal. Technical background, skill architecture, and education."
        path="/about"
      />

      <main className="page-stack">
        {/* Intro */}
        <motion.section className="about-hero-section" {...revealProps}>
          <PagePlaneAccent />
          <span className="section-kicker">About Me</span>
          <h1 className="section-title">Designing interfaces that feel effortless.</h1>
          <p className="lead">
            I&apos;m a developer from Nepal passionate about engineering clean, fast,
            and accessible web experiences. I bridge the gap between design
            precision and resilient full-stack code.
          </p>
          <div className="about-bio-meta">
            <div className="bio-stat">
              <span className="bio-stat-label">Location &amp; Local Time</span>
              <span className="bio-stat-val">
                Itahari, Nepal · <NepalClock compact={true} showLocation={false} />
              </span>
            </div>
            <div className="bio-stat-sep" />
            <div className="bio-stat">
              <span className="bio-stat-label">Primary Stack</span>
              <span className="bio-stat-val">React · Node.js · MongoDB</span>
            </div>
            <div className="bio-stat-sep" />
            <div className="bio-stat">
              <span className="bio-stat-label">Status</span>
              <span className="bio-stat-val">Shipping Web Products</span>
            </div>
          </div>
        </motion.section>

        {/* Technical Skills by Category */}
        <motion.section className="about-content-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Technical Skills</span>
            <h2 className="section-subtitle">Tools &amp; technologies</h2>
            <p className="section-subtext">
              Categorized technologies utilized in active production applications and experiments.
            </p>
          </div>

          <div className="skills-category-list">
            {skillCategories.map((group) => (
              <div key={group.category} className="skills-group">
                <h3 className="skills-group-title">{group.category}</h3>
                <div className="skills-pill-grid">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="skill-item-chip">
                      <span className="skill-item-icon" aria-hidden="true">
                        {skill.icon}
                      </span>
                      <span className="skill-item-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education Timeline */}
        <motion.section className="about-content-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Education</span>
            <h2 className="section-subtitle">Academic foundations</h2>
          </div>

          <div className="academic-list">
            {education.map((item) => (
              <div className="academic-row" key={item.name}>
                <img src={item.image} alt={item.alt} className="academic-logo" />
                <div className="academic-info">
                  <h3 className="academic-name">{item.name}</h3>
                  <span className="academic-stage">{item.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Journey Timeline */}
        <motion.section className="about-content-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Timeline</span>
            <h2 className="section-subtitle">Development milestones</h2>
          </div>

          <ol className="clean-timeline">
            {timelineEntries.map((entry) => (
              <li className="clean-timeline-item" key={entry.year}>
                <span className="clean-timeline-year">{entry.year}</span>
                <div className="clean-timeline-body">
                  <h3 className="clean-timeline-title">{entry.title}</h3>
                  <p className="clean-timeline-text">{entry.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Spotify / Currently Listening */}
        <motion.section className="about-content-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Focus &amp; Mood</span>
            <h2 className="section-subtitle">Currently listening to</h2>
          </div>

          <div className="clean-spotify-wrapper">
            <iframe
              title="Spotify Player"
              src="https://open.spotify.com/embed/track/70C4NyhjD5OZUMzvWZ3njJ?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="clean-spotify-frame"
            />
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default About;