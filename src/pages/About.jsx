import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import SEO from "../components/SEO.jsx";

import sgc from "../assets/sgc.png";
import koshi from "../assets/koshi.jpg";
import pabs from "../assets/pabs.jpg";
import trackerImg from "../assets/favicon.png";

function About() {
  const trackerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const tracker = trackerRef.current;
      const timeline = timelineRef.current;

      if (!tracker || !timeline) return;

      const timelineTop = timeline.offsetTop;
      const timelineHeight = timeline.offsetHeight;
      const scrollY = window.scrollY;

      let progress =
        (scrollY - timelineTop + window.innerHeight / 2) /
        timelineHeight;

      progress = Math.max(0, Math.min(progress, 1));

      tracker.style.transform = `translateY(${progress * timelineHeight}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-3xl mx-auto flex flex-wrap justify-center">
      <SEO
        title="About Me | Pushkar Chaudhary - Frontend Developer"
        description="Learn more about Pushkar Chaudhary, a frontend developer and science student from Lahan, Nepal. Education, journey, and technical background."
        path="/about"
      />

      <div className="introduction">
        <div className="heading">
          <h1>About Me</h1>
        </div>

        <p className="about">
          Hi, I'm <span className="name">Pushkar Chaudhary</span>, a passionate
          frontend developer and science student from Lahan, Nepal. I specialize
          in creating minimal and user-friendly websites using HTML, CSS, and
          JavaScript. With a keen eye for design and a love for coding, I strive
          to build engaging digital experiences that are both functional and
          visually appealing. When I'm not coding, you can find me exploring the
          latest trends in web development or diving into scientific research.
          I'm always eager to learn and grow in my field, and I'm excited to
          connect with like-minded individuals who share my passion for
          technology and creativity.
        </p>
      </div>

      <div className="education">
        <div className="heading">
          <h1>Education</h1>
        </div>

        <div className="school">
          <img src={sgc} className="logo" alt="Sushma Godawari College" />
          <p>Sushma Godawari College, Itahari (+2)</p>
        </div>

        <div className="school">
          <img src={koshi} className="logo" alt="Koshi Saint James" />
          <p>Koshi Saint James Residential Secondary School</p>
        </div>

        <div className="school">
          <img src={pabs} className="logo" alt="Public Aims Boarding School" />
          <p>Public Aims Boarding School (Primary Education)</p>
        </div>

        <h1 className="heading">Journey so far</h1>

        <section className="timeline" ref={timelineRef}>
          <img
            src={trackerImg}
            className="timeline-tracker"
            ref={trackerRef}
            alt="Timeline Tracker"
          />

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <h3>2026</h3>

              <p>
               Learned React and Tailwind CSS and redesigned this whole portfolio and made some projects and currently learning backend development using Node.js.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <h3>2025</h3>

              <p>
                After learning HTML, CSS and responsive web design, I built my{" "}
                <a
                  href="https://pushkar-chaudhary.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  portfolio
                </a>.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <h3>2024</h3>

              <p>
                Started learning web development with HTML and CSS and explored
                the basics of programming.
              </p>
            </div>
          </div>
        </section>

        <section className="song">
          <div className="heading">
            <h1 className="song">My favorite song rn..</h1>
          </div>

          <div className="music-player">
            <iframe
              title="Spotify Player"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/track/70C4NyhjD5OZUMzvWZ3njJ?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;