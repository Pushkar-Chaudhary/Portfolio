import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import TypingText from "../components/TypingText.jsx";
import Animated3DImages from "../components/Animated3DImages.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import NepalClock from "../components/NepalClock.jsx";
import ToolsTrain from "../components/ToolsTrain.jsx";

const Home = () => {
  const revealProps = {
    initial: false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <div className="page-shell page-shell--narrow">
      <main className="page-stack">
        {/* Hero Section */}
        <section className="hero-panel" aria-label="Introduction">
          <div className="hero-visual">
            <Animated3DImages />
          </div>

          <motion.div className="hero-copy" {...revealProps}>
            <h1 className="hero-title">
              Pushkar Chaudhary
              <svg
                className="hero-sword-mark"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 4 22 22l-5-2L4 6V4Z" fill="currentColor" fillOpacity=".2" />
                <path d="m28 4-18 18 5-2L28 6V4Z" fill="currentColor" fillOpacity=".2" />
                <path d="M4 4 22 22m-5-2 4-4m1 6 4 4M28 4 10 22m5-2-4-4m-1 6-4 4" />
              </svg>
            </h1>

            <h2 className="hero-subline">
              <TypingText />
            </h2>

            <p className="hero-lead">
              I&apos;m a BCA student in Itahari. I spend my time building web
              projects, mostly with React, Node.js, and MongoDB.
            </p>

            <div className="hero-actions">
              <a href="/projects" className="btn-primary">
                View my work <FaArrowRight aria-hidden="true" />
              </a>
              <a href="/contact" className="btn-secondary">
                Let&apos;s Connect
              </a>
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

        <ToolsTrain />

        {/* Featured Projects Showcase */}
        <ProjectShowcase />

        <section className="connect-cta-panel">
          <div className="connect-cta-content">
            <span className="section-kicker">Contact</span>
            <h2 className="connect-cta-title">Have a project in mind?</h2>
            <p className="connect-cta-desc">
              Send me a note and tell me what you&apos;re working on.
            </p>
          </div>
          <div className="connect-cta-actions">
            <a href="/contact" className="btn-primary">
              Send a Message <FaArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
