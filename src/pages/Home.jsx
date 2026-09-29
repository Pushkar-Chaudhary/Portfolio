import { Link } from "react-router-dom";
import TypingText from "../components/TypingText.jsx";
import SEO from "../components/SEO.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import Footer from "./Footer.jsx";
import AboutMe from "../components/AboutMe.jsx";

const Home = () => {
  return (
    <div className="page-shell page-shell--narrow">
      <SEO
        title="Pushkar Chaudhary | Frontend Developer & Designer from Nepal"
        description="Hi, I'm Pushkar Chaudhary, a frontend developer and designer from Nepal passionate about creating modern, fast, and responsive web experiences."
        path="/"
      />

      <main className="page-stack">
        <section className="hero-panel">
          <div className="hero-visual">
            <HeroSlider />
          </div>
          <div className="hero-copy">
            <h1 className="intro">Pushkar Chaudhary</h1>
            <h2 className="sub-intro">
              <TypingText />
            </h2>
            <p className="lead">
             Developer from Nepal passionate about creating modern,
              fast, and responsive web experiences with clean design and smooth
              user interactions.
            </p>
              <div className="hero-actions">
                <Link to="/projects" className="primary-link">
                  View Projects
                </Link>
                <Link to="/contact" className="secondary-link">
                  Let&apos;s Talk
                </Link>
              </div>
            </div>
        </section>

        <AboutMe />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
