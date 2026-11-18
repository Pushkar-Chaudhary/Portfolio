import { motion, useReducedMotion } from "framer-motion";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";
import NepalClock from "../components/NepalClock.jsx";
import education from "../data/education.js";
import imageSource from "../lib/imageSource.js";
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
  SiAstro,
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
    category: "Languages",
    skills: [
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss /> },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "Astro", icon: <SiAstro /> },
      { name: "React 19", icon: <SiReact /> },
      { name: "Vite", icon: <SiVite /> },
      { name: "Tailwind CSS 4", icon: <SiTailwindcss /> },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
    ],
  },
  {
    category: "AI & APIs",
    skills: [
      { name: "Gemini API", icon: <SiGooglegemini /> },
    ],
  },
  {
    category: "Tools I use",
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
    title: "Building full-stack apps",
    text: "These days I’m building with React, Express, and MongoDB, and adding Gemini features to Career Sathi.",
  },
  {
    year: "2025",
    title: "Getting comfortable with React",
    text: "I learned to build responsive pages and add the small interactions that make them easier to use.",
  },
  {
    year: "2024",
    title: "Learning web basics",
    text: "Started with HTML, CSS, and JavaScript, then began making small web pages.",
  },
];

function About() {
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: false,
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.45, ease: "easeOut" },
      };

  return (
    <div className="page-shell page-shell--narrow">
      <main className="page-stack">
        <motion.section className="about-hero-section" {...revealProps}>
          <PagePlaneAccent />
          <span className="section-kicker">About</span>
          <h1 className="section-title">A little about me.</h1>
          <p className="lead">
            I’m Pushkar, a BCA student and developer from Itahari, Nepal. I build web apps with React, TypeScript, and Node.js, and I’m always learning how to make them simpler and more useful.
          </p>
          <div className="about-bio-meta">
            <div className="bio-stat">
              <span className="bio-stat-label">Based in</span>
              <span className="bio-stat-val">
                Itahari, Nepal · <NepalClock compact={true} showLocation={false} />
              </span>
            </div>
            <div className="bio-stat-sep" />
            <div className="bio-stat">
              <span className="bio-stat-label">What I build with</span>
              <span className="bio-stat-val">React · Node.js · MongoDB</span>
            </div>
            <div className="bio-stat-sep" />
            <div className="bio-stat">
              <span className="bio-stat-label">Right now</span>
              <span className="bio-stat-val">Studying BCA</span>
            </div>
          </div>
        </motion.section>

        <motion.section className="about-content-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Things I use</span>
            <h2 className="section-subtitle">My tools</h2>
            <p className="section-subtext">
              A few tools I&apos;ve used across my projects.
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

        <motion.section className="about-content-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Education</span>
            <h2 className="section-subtitle">Where I studied</h2>
          </div>

          <div className="academic-list">
            {education.map((item) => (
              <div className="academic-row" key={item.name}>
                <img src={imageSource(item.image)} alt={item.alt} className="academic-logo" loading="lazy" decoding="async" />
                <div className="academic-info">
                  <h3 className="academic-name">{item.name}</h3>
                  <span className="academic-stage">{item.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="about-content-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Timeline</span>
            <h2 className="section-subtitle">What I’ve been learning</h2>
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

        <motion.section className="about-content-section" {...revealProps}>
          <section className="music-panel" aria-labelledby="favorite-music-title">
            <div className="section-header">
              <span className="section-kicker">An old favorite</span>
              <h2 id="favorite-music-title" className="section-subtitle">
                Favorite music
              </h2>
            </div>

            <div className="favorite-song">
              <iframe
                className="favorite-song-embed"
                title="The Man Who Can’t Be Moved by The Script on Spotify"
                src="https://open.spotify.com/embed/track/3nqqDo8CcCLke3ZoTgiOKf?utm_source=generator"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </section>
        </motion.section>
      </main>
    </div>
  );
}

export default About;
