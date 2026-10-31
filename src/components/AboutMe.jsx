import { Link } from "react-router-dom";
import { FaCode, FaServer, FaBolt, FaArrowRight } from "react-icons/fa";

const AboutMe = () => {
  return (
    <section className="about-bento-section" aria-labelledby="about-bento-title">
      <div className="section-eyebrow-wrap">
        <span className="section-kicker">Core Principles</span>
        <h2 id="about-bento-title" className="section-headline">
          Engineering with precision &amp; intent.
        </h2>
      </div>

      <div className="bento-grid">
        <div className="bento-card bento-card--large">
          <div className="bento-card-icon">
            <FaCode aria-hidden="true" />
          </div>
          <span className="bento-label">Frontend Architecture</span>
          <h3 className="bento-title">Component-Driven &amp; Accessible</h3>
          <p className="bento-text">
            Specializing in React, Tailwind CSS, and Framer Motion. Every interface is built with strict semantic HTML, WCAG accessibility, and fluid responsiveness across every screen size.
          </p>
          <Link to="/about" className="bento-link">
            Read full background <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="bento-card">
          <div className="bento-card-icon">
            <FaServer aria-hidden="true" />
          </div>
          <span className="bento-label">Backend &amp; Data</span>
          <h3 className="bento-title">Node.js &amp; MongoDB</h3>
          <p className="bento-text">
            Developing robust RESTful APIs, scalable database schemas with Mongoose, and secure serverless functions.
          </p>
        </div>

        <div className="bento-card">
          <div className="bento-card-icon">
            <FaBolt aria-hidden="true" />
          </div>
          <span className="bento-label">AI Integration</span>
          <h3 className="bento-title">Generative APIs</h3>
          <p className="bento-text">
            Integrating Google Gemini and LLMs into production tools like Career Sathi to deliver real-time personalized recommendations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;