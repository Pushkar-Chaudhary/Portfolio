import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import SEO from "../components/SEO.jsx";
import TypingText from "../components/TypingText.jsx";
import AboutMe from "../components/AboutMe.jsx";
import Animated3DImages from "../components/Animated3DImages.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import NepalClock from "../components/NepalClock.jsx";

const coreStack = [
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JavaScript",
  "Tailwind CSS",
];

const Home = () => {
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

          <div className="hero-copy">
            <p className="hero-greeting">Hey, I&apos;m</p>
            <h1 className="hero-title">Pushkar Chaudhary.</h1>

            <h2 className="hero-subline">
              <TypingText />
            </h2>

            <p className="hero-lead">
              I&apos;m based in Itahari, where I study and build web apps with
              React and Node.js. Here are a few things I&apos;ve been working on.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="btn-primary">
                See my projects <FaArrowRight aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get in touch
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
          </div>
        </section>

        <section className="stack-strip-section" aria-label="Core technologies">
          <div className="stack-strip-header">
            <span className="stack-strip-label">Tools I use</span>
          </div>
          <div className="stack-strip-window">
            <div className="stack-strip-chips">
              <div className="stack-strip-group" role="list">
                {coreStack.map((tech) => (
                  <span key={tech} className="stack-item" role="listitem">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="stack-strip-group" aria-hidden="true">
                {coreStack.map((tech) => (
                  <span key={tech} className="stack-item">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Showcase */}
        <ProjectShowcase />

        <AboutMe />

        <section className="connect-cta-panel">
          <div className="connect-cta-content">
            <span className="section-kicker">Say hello</span>
            <h2 className="connect-cta-title">Have something in mind?</h2>
            <p className="connect-cta-desc">
              I&apos;m open to interesting projects, opportunities, and a good conversation about building for the web.
            </p>
          </div>
          <div className="connect-cta-actions">
            <Link to="/contact" className="btn-primary">
              Write to me <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
