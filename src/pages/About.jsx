import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";
import sgc from "../assets/sgc.png";
import koshi from "../assets/koshi.jpg";
import pabs from "../assets/pabs.jpg";
import {
  SiVscodium,
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
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const education = [
  { name: "Sushma Godawari College, Itahari (+2)", image: sgc, alt: "Sushma Godawari College" },
  { name: "Koshi Saint James Residential Secondary School", image: koshi, alt: "Koshi Saint James" },
  { name: "Public Aims Boarding School (Primary Education)", image: pabs, alt: "Public Aims Boarding School" },
];

const timelineEntries = [
  {
    year: "2026",
    text: "Learned React and Tailwind CSS, redesigned my portfolio, and started exploring backend development with Node.js.",
  },
  {
    year: "2025",
    text: "After learning HTML, CSS, and responsive design, I built my portfolio and focused on improving the UX.",
  },
  {
    year: "2024",
    text: "Started learning web development with HTML and CSS and explored the basics of programming.",
  },
];

const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 17.5A7.5 7.5 0 1 1 19.5 12 7.51 7.51 0 0 1 12 19.5Z" opacity=".35"/>
    <path d="M12 6.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 6.5Zm0 9A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Z" opacity=".6"/>
  </svg>
);

const tools = [
  { name: "VS Code",     icon: <VscVscode />,       color: "#007ACC" },
  { name: "Cursor",      icon: <SiCursor />,         color: "#000000" },
  { name: "Antigravity", icon: <AntigravityIcon />,  color: "#6C63FF" },
  { name: "Node.js",     icon: <SiNodedotjs />,      color: "#339933" },
  { name: "MongoDB",     icon: <SiMongodb />,        color: "#47A248" },
  { name: "React",       icon: <SiReact />,          color: "#61DAFB" },
  { name: "Tailwind CSS",icon: <SiTailwindcss />,    color: "#06B6D4" },
  { name: "HTML",        icon: <SiHtml5 />,          color: "#E34F26" },
  { name: "CSS",         icon: <SiCss />,            color: "#1572B6" },
  { name: "JavaScript",  icon: <SiJavascript />,     color: "#F7DF1E" },
  { name: "Express",     icon: <SiExpress />,        color: "#888"    },
  { name: "Vite",        icon: <SiVite />,           color: "#646CFF" },
  { name: "Gemini API",  icon: <SiGooglegemini />,   color: "#8E75B2" },
];

function About() {
  const trackerRef = useRef(null);
  const timelineRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const revealProps = reducedMotion
    ? {
        initial: false,
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.55, ease: "easeOut" },
      };

  useEffect(() => {
    let frameId = 0;

    const updateTracker = () => {
      const tracker = trackerRef.current;
      const timeline = timelineRef.current;

      if (!tracker || !timeline) return;

      const timelineBounds = timeline.getBoundingClientRect();
      const timelineHeight = timeline.clientHeight;
      const viewportProgress =
        (window.innerHeight / 2 - timelineBounds.top) / timelineHeight;
      const progress = Math.max(0, Math.min(viewportProgress, 1));
      tracker.style.transform = `translateY(${progress * timelineHeight}px)`;
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateTracker);
    };

    updateTracker();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="page-shell page-shell--wide">
      <SEO
        title="About Me | Pushkar Chaudhary - Frontend Developer"
        description="Learn more about Pushkar Chaudhary, a frontend developer and science student from Lahan, Nepal. Education, journey, and technical background."
        path="/about"
      />

      <main className="page-stack">
        <motion.section className="about-intro-section" {...revealProps}>
          <PagePlaneAccent />
          <p className="eyebrow">About</p>
          <h1 className="section-title">Hi, I’m Pushkar Chaudhary.</h1>
          <p className="lead">
            I’m a web developer who enjoys turning ideas into clean, interactive,
            and user-friendly websites. I work with HTML, CSS, JavaScript, and
            React while constantly learning new technologies and improving my
            skills.
          </p>
        </motion.section>

        <motion.section className="about-section" {...revealProps}>
          <div className="section-header">
            <p className="eyebrow">Education</p>
            <h2>Learning path</h2>
          </div>

          <div className="education-list">
            {education.map((item) => (
              <div className="school" key={item.name}>
                <img src={item.image} alt={item.alt} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="about-section skills-section"
          {...revealProps}
          aria-labelledby="skills-title"
        >
          <div className="section-header">
            <p className="eyebrow">Technology</p>
            <h2 id="skills-title">Tools I use to build</h2>
            <p className="skills-intro">
              Technologies already in my projects and learning journey.
            </p>
          </div>

          <div className="tools-grid" role="list" aria-label="Tools and technologies">
            {tools.map((tool) => (
              <div className="tool-tile" key={tool.name} role="listitem">
                <span className="tool-icon" style={{ color: tool.color }} aria-hidden="true">
                  {tool.icon}
                </span>
                <span className="tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="about-section" {...revealProps}>
          <div className="section-header">
            <p className="eyebrow">Journey</p>
            <h2>So far</h2>
          </div>

          <div className="timeline" ref={timelineRef}>
            <span
              className="timeline-tracker"
              ref={trackerRef}
              aria-hidden="true"
            />

            {timelineEntries.map((entry) => (
              <div className="timeline-item" key={entry.year}>
                <div className="timeline-dot" />

                <div className="timeline-content">
                  <h3>{entry.year}</h3>
                  <p>{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="about-section" {...revealProps}>
          <div className="section-header">
            <p className="eyebrow">Mood</p>
            <h2>Current favorite song</h2>
          </div>

          <div className="music-player">
            <iframe
              title="Spotify Player"
              src="https://open.spotify.com/embed/track/70C4NyhjD5OZUMzvWZ3njJ?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default About;