import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <a href="/home" className="footer-logo">
              Pushkar Chaudhary<span className="footer-dot" />
            </a>
            <p className="footer-tagline">
              BCA student and web developer in Itahari, Nepal.
            </p>
          </div>

          <nav className="footer-nav-col" aria-label="Footer navigation">
            <span className="footer-heading">Navigation</span>
            <div className="footer-links-grid">
              <a href="/home" className="footer-link">Home</a>
              <a href="/about" className="footer-link">About</a>
              <a href="/projects" className="footer-link">Projects</a>
              <a href="/dashboard" className="footer-link">Dashboard</a>
              <a href="/contact" className="footer-link">Contact</a>
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
        <p className="footer-inspiration">
          Visual inspiration: <span>Manish Tamang&apos;s portfolio.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
