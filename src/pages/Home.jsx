import { Link } from 'react-router-dom'
import TypingText from "../components/TypingText.jsx";
import SEO from "../components/SEO.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import Footer from './Footer.jsx';
const Home = () => {
  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col px-4">
      <SEO
        title="Pushkar Chaudhary | Frontend Developer & Designer from Nepal"
        description="Hi, I'm Pushkar Chaudhary, a frontend developer and designer from Nepal passionate about creating modern, fast, and responsive web experiences."
        path="/"
      />
      <main className="container">
        <section className="profile-section">
            <HeroSlider/>
          
          <div className="greetings">
            <h1 className="intro">Pushkar Chaudhary</h1>

            <h2 className="sub-intro">
              <TypingText />
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
      <footer>
        <div className="border-t-2 border-solid border-gray-500">
          <Footer/>
        </div>
      </footer>
    </div>
  )
}

export default Home
