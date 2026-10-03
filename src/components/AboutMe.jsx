import { Link } from "react-router-dom";
import minzoro from "../assets/minizoro.jpeg";
import TiltCard from "./TiltCard.jsx";

const AboutMe = () => {
  return (
    <section className="about-bento" aria-labelledby="about-bento-title">
      <div className="about-bento-header">
        <h2 id="about-bento-title">About</h2>
        <span>Portfolio</span>
      </div>

      <div className="about-bento-grid">
        <TiltCard className="about-me-card about-intro-tile">
          <div className="about-tile-accent" aria-hidden="true" />
          <div className="about-tile-copy">
            <p className="about-tile-label">Based in Nepal</p>
            <p>Designing interfaces that feel effortless and memorable.</p>
          </div>

          <Link to="/about" className="about-tile-link">
            About me <span aria-hidden="true">↗</span>
          </Link>
        </TiltCard>

        <TiltCard className="about-me-card about-role-tile">
          <p className="about-tile-label">Current role</p>
          <h3>Frontend Developer &amp; Student</h3>
          <span className="about-role-status">
            <span aria-hidden="true" /> Active
          </span>
        </TiltCard>

        <TiltCard className="about-me-card about-photo-card">
          <img
            src={minzoro}
            alt="Pushkar Chaudhary"
            className="about-photo-image"
            loading="lazy"
            decoding="async"
          />

          <span className="about-photo-caption">Silly Me</span>
        </TiltCard>

        <TiltCard className="about-me-card about-welcome-tile">
          <p className="about-tile-label">Welcome</p>
          <h3>
            Welcome to my
            <br />
            corner on the
            <br />
            internet.
          </h3>
        </TiltCard>

        <TiltCard className="about-me-card about-learning-tile">
          <h3>Constantly Learning</h3>
          <p>
            After frontend, I&apos;m diving deeper into backend architecture and
            building more complete digital experiences.
          </p>
        </TiltCard>
      </div>
    </section>
  );
};

export default AboutMe;