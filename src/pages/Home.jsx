import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaLaptopCode, FaCheckCircle } from "react-icons/fa";
import TypingText from "../components/TypingText.jsx";
import SEO from "../components/SEO.jsx";
import AboutMe from "../components/AboutMe.jsx";
import Animated3DImages from "../components/Animated3DImages.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import NepalClock from "../components/NepalClock.jsx";

const coreStack = [
  "React 19",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Gemini API",
  "TypeScript",
  "Vite",
];

const Home = () => {
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
    };

  return (
    <div className="page-shell page-shell--narrow">
      <SEO
        title="Pushkar Chaudhary | Frontend & Fullstack Developer"
        description="Pushkar Chaudhary is a developer from Nepal passionate about engineering fast, clean, and accessible web experiences with React, Node.js, and modern AI integrations."
        path="/"
      />

      <main className="page-stack">
        {/* Hero Section */}
        <section className="hero-panel" aria-label="Introduction">
          <div className="hero-visual">
            <Animated3DImages />
          </div>

          <motion.div className="hero-copy" {...revealProps}>
            <h1 className="hero-title">Pushkar Chaudhary</h1>

            <h2 className="hero-subline">
              <TypingText />
            </h2>

            <p className="hero-lead">
              Developer based in Nepal specializing in building fast, minimal, and
              responsive web products. Focused on React architecture, clean UI
              design, and production-ready full-stack applications.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="btn-primary">
                View Selected Work <FaArrowRight aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Let&apos;s Connect
              </Link>
            </div>

            <div className="hero-social-links">
              <a
                href="https://github.com/Pushkar-Chaudhary"
                target="_blank"
                rel="noreferrer"
                className="hero-social-item"
                aria-label="GitHub profile"
              >
                <FaGithub aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <span className="hero-social-sep">·</span>
              <a
                href="https://www.linkedin.com/in/pushkar-chy/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-item"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <span className="hero-social-sep">·</span>
              <NepalClock compact={true} showLocation={true} />
            </div>
          </motion.div>
        </section>

        {/* Core Stack Strip */}
        <section className="stack-strip-section" aria-label="Core technologies">
          <div className="stack-strip-header">
            <span className="stack-strip-label">Production Stack</span>
          </div>
          <div className="stack-strip-chips">
            {coreStack.map((tech) => (
              <span key={tech} className="stack-chip">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Projects Showcase */}
        <ProjectShowcase />

        {/* Principles / About Bento */}
        <AboutMe />

        {/* Direct Connect CTA */}
        <section className="connect-cta-panel">
          <div className="connect-cta-content">
            <span className="section-kicker">Get in Touch</span>
            <h2 className="connect-cta-title">Have an idea or need an engineer?</h2>
            <p className="connect-cta-desc">
              I&apos;m always open to discussing new projects, frontend engineering roles, or creative technical collaborations.
            </p>
          </div>
          <div className="connect-cta-actions">
            <Link to="/contact" className="btn-primary">
              Send a Message <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
