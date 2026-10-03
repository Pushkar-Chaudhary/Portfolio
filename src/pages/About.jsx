import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import TiltCard from "../components/TiltCard.jsx";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";
import sgc from "../assets/sgc.png";
import koshi from "../assets/koshi.jpg";
import pabs from "../assets/pabs.jpg";

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

const skillGroups = [
  {
    name: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    name: "Backend & data",
    skills: ["Node.js", "Express", "EJS", "MongoDB"],
  },
  {
    name: "Tools & integrations",
    skills: ["Vite", "Google Gemini API"],
  },
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
        <motion.section className="content-card about-intro-card" {...revealProps}>
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

        <motion.section className="content-card about-section-card" {...revealProps}>
          <div className="section-header">
            <p className="eyebrow">Education</p>
            <h2>Learning path</h2>
          </div>

          <div className="education-list">
            {education.map((item) => (
              <TiltCard as="div" className="school" key={item.name}>
                <img src={item.image} alt={item.alt} />
                <p>{item.name}</p>
              </TiltCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="content-card about-section-card skills-section"
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

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.name}>
                <h3>{group.name}</h3>
                <ul className="skill-list" aria-label={group.name}>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="content-card about-section-card" {...revealProps}>
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

        <motion.section className="content-card about-section-card" {...revealProps}>
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