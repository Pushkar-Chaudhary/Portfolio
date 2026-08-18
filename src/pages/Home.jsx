import TypingText from "../components/TypingText.jsx";
import SEO from "../components/SEO.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import Footer from './Footer.jsx';
import AboutMe from '../components/AboutMe.jsx';
const Home = () => {
  return (
    <div className="mx-auto flex w-full max-w-[570px] flex-col px-4 mt-20">
      <SEO
        title="Pushkar Chaudhary | Frontend Developer & Designer from Nepal"
        description="Hi, I'm Pushkar Chaudhary, a frontend developer and designer from Nepal passionate about creating modern, fast, and responsive web experiences."
        path="/"
      />
      <main className="container">
        <section className="profile-section">
          <HeroSlider />
          <div className="mx-auto flex w-full flex-col px-4">
            <h1 className="intro">Pushkar Chaudhary</h1>
            <h2 className="sub-intro">
              <TypingText />
            </h2>
            <p className="mt-2 max-w-2xl text-xs">
              Frontend Developer from Nepal passionate about creating modern,
              fast and responsive web experiences with clean design and smooth
              user interactions.
            </p>
          </div>
        </section>
        <AboutMe/>
      </main>
      <footer>
          <Footer/>
      </footer>
    </div>
  )
}

export default Home
