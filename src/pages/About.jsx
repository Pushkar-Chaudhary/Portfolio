import { useEffect, useRef } from "react";
import SEO from "../components/SEO.jsx";
import sgc from "../assets/sgc.png";
import koshi from "../assets/koshi.jpg";
import pabs from "../assets/pabs.jpg";
import trackerImg from "../assets/favicon.png";

const education = [
  { name: "Sushma Godawari College, Itahari (+2)", image: sgc, alt: "Sushma Godawari College" },
  { name: "Koshi Saint James Residential Secondary School", image: koshi, alt: "Koshi Saint James" },
  { name: "Public Aims Boarding School (Primary Education)", image: pabs, alt: "Public Aims Boarding School" },
];

const timelineEntries = [
  {
    year: "2026",
    text: "Learned React and Tailwind CSS, redesigned my portfolio, and started exploring backend development with Node.js.",
  },
  {
    year: "2025",
    text: "After learning HTML, CSS, and responsive design, I built my portfolio and focused on improving the UX.",
  },
  {
    year: "2024",
    text: "Started learning web development with HTML and CSS and explored the basics of programming.",
  },
];

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
        (scrollY - timelineTop + window.innerHeight / 2) / timelineHeight;

      progress = Math.max(0, Math.min(progress, 1));
      tracker.style.transform = `translateY(${progress * timelineHeight}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page-shell page-shell--wide">
      <SEO
        title="About Me | Pushkar Chaudhary - Frontend Developer"
        description="Learn more about Pushkar Chaudhary, a frontend developer and science student from Lahan, Nepal. Education, journey, and technical background."
        path="/about"
      />

      <main className="page-stack">
        <section className="content-card">
          <p className="eyebrow">About</p>
          <h1 className="section-title">Hi, I’m Pushkar Chaudhary.</h1>
          <p className="lead">
            I’m a web developer who enjoys turning ideas into clean, interactive,
            and user-friendly websites. I work with HTML, CSS, JavaScript, and
            React while constantly learning new technologies and improving my
            skills.
          </p>
        </section>

        <section className="content-card">
          <div className="section-header">
            <p className="eyebrow">Education</p>
            <h2>Learning path</h2>
          </div>

          <div className="education-list">
            {education.map((item) => (
              <div className="school" key={item.name}>
                <img src={item.image} alt={item.alt} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-card">
          <div className="section-header">
            <p className="eyebrow">Journey</p>
            <h2>So far</h2>
          </div>

          <div className="timeline" ref={timelineRef}>
            <img
              src={trackerImg}
              className="timeline-tracker"
              ref={trackerRef}
              alt="Timeline tracker"
            />

            {timelineEntries.map((entry) => (
              <div className="timeline-item" key={entry.year}>
                <div className="timeline-dot" />

                <div className="timeline-content">
                  <h3>{entry.year}</h3>
                  <p>{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="content-card">
          <div className="section-header">
            <p className="eyebrow">Mood</p>
            <h2>Current favorite song</h2>
          </div>

          <div className="music-player">
            <iframe
              title="Spotify Player"
              src="https://open.spotify.com/embed/track/70C4NyhjD5OZUMzvWZ3njJ?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;