import { useEffect, useRef } from "react";
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
    <div className="mx-auto flex flex-wrap justify-center max-w-[560px]">
      <SEO
        title="About Me | Pushkar Chaudhary - Frontend Developer"
        description="Learn more about Pushkar Chaudhary, a frontend developer and science student from Lahan, Nepal. Education, journey, and technical background."
        path="/about"
      />
      <div className="introduction">
        <p className="about">
          <span className="name">Hi, I'm Pushkar Chaudhary, a passionate
          frontend developer from Itahari, Nepal.</span>
        </p>
        <p className="font-Poppins max-w-2xl text-sm leading-7 text-black dark:text-gray-300">
          I'm a web developer who enjoys turning ideas into clean, interactive, and
          user-friendly websites. I work with HTML, CSS, JavaScript, and React while
          constantly learning new technologies and improving my skills. I care about
          creating digital experiences that look good, feel intuitive, and work
          smoothly across devices. When I'm away from coding, I enjoy exploring web
          development trends, technology, and scientific research.
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