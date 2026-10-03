import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TypingText from "../components/TypingText.jsx";
import SEO from "../components/SEO.jsx";
import AboutMe from "../components/AboutMe.jsx";
import Animated3DImages from "../components/Animated3DImages.jsx";

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
            <Animated3DImages />
          </div>

          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="intro">Pushkar Chaudhary</h1>
            <h2 className="sub-intro">
              <TypingText />
            </h2>
            <p className="lead">
              Developer from Nepal passionate about creating modern, fast, and
              responsive web experiences with clean design and smooth user
              interactions.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="primary-link">
                View Projects
              </Link>
              <Link to="/contact" className="secondary-link">
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        </section>

        <AboutMe />
      </main>

    </div>
  );
};

export default Home;
