import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              Pushkar Chaudhary<span className="footer-dot" />
            </Link>
            <p className="footer-tagline">
              Frontend &amp; Fullstack Developer from Nepal. Building clean, fast, and accessible digital products.
            </p>
          </div>

          <nav className="footer-nav-col" aria-label="Footer navigation">
            <span className="footer-heading">Navigation</span>
            <div className="footer-links-grid">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/projects" className="footer-link">Projects</Link>
              <Link to="/dashboard" className="footer-link">Dashboard</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <a
                href="https://feedback.fish/265a18dcee38b3"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                Feedback
              </a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Pushkar Chaudhary. All rights reserved.
          </p>

          <div className="footer-social-group">
            <a
              href="https://github.com/Pushkar-Chaudhary"
              target="_blank"
              rel="noreferrer"
              className="footer-social-btn"
              aria-label="GitHub Profile"
            >
              <FaGithub aria-hidden="true" />
            </a>

            <a
              href="https://www.linkedin.com/in/pushkar-chy/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin aria-hidden="true" />
            </a>

            <a
              href="https://x.com/pushkar_chau07"
              target="_blank"
              rel="noreferrer"
              className="footer-social-btn"
              aria-label="X Profile"
            >
              <FaXTwitter aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
