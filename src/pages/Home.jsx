import { Link } from 'react-router-dom'
import pfp from "../assets/pfp.png"
import Typingtext from "../components/Typingtext.jsx";
import Navbar from "../components/Navbar.jsx";
const Home = () => {
  return (
    <div>
        <Navbar/>
      <main className="container">
        <section className="profile-section">
          <div className="pfp-img">
            <img
              src={pfp}
              className="pfp"
              alt="Pushkar Chaudhary profile"
              loading="lazy"
            />
          </div>

          <div className="greetings">
            <h1 className="intro">Pushkar Chaudhary</h1>

            <h2 className="sub-intro">
              <Typingtext />
                   </h2>

            <p className="hi">
              Frontend Developer from Nepal passionate about creating modern,
              fast and responsive web experiences with clean design and smooth
              user interactions.
            </p>

            <div className="more">
              <Link to="/projects" className="btn primary">
                View Projects
              </Link>

              <Link to="/contact" className="btn secondary">
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ul className="wrapper">
        <span>
          <a
            href="https://www.instagram.com/nvm.pushkarr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </span>

        <span>
          <a
            href="https://x.com/pushkar_chau07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
        </span>

        <span>
          <a
            href="https://github.com/Pushkar-Chaudhary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </span>

        <span>
          <a
            href="https://www.linkedin.com/in/anik-chy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </span>
      </ul>

      <footer>
        <div className="feedback">
          <p>
            <strong>Have any feedback or suggestions?</strong>
          </p>

          <a
            href="https://feedback.fish/265a18dcee38b3"
            target="_blank"
            rel="noopener noreferrer"
            className="feedback-btn"
          >
            Give Feedback
          </a>
        </div>

        <p>&copy; 2026 Pushkar Chaudhary. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
