import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SEO from "../components/SEO.jsx";
import TiltCard from "../components/TiltCard.jsx";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";

const projects = [
  {
    title: "Aafno Kura",
    demo: "https://aafno-kura.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/aafno-kura",
    description:
      "A social app for sharing updates, with a public feed and tools for managing posts.",
    hero: true,
    tech: ["Node.js", "Express", "EJS", "MongoDB"],
  },
  {
    title: "Career Sathi",
    demo: "https://career-sathii.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/career-sathi",
    description:
      "A career guidance app built with React and Node.js, with Gemini-powered features.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
  },
  {
    title: "Sajilo Blog",
    demo: "https://sajiloblog.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/sajilo-blog",
    description:
      "A simple blog app for sharing thoughts and experiences.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Wishly",
    demo: "https://wishly-wish.vercel.app/",
    description:
      "A birthday wishing page made with vibe-coding to help someone special feel celebrated.",
    tech: ["Node.js", "React"],
  },
  {
    title: "Portfolio Website",
    demo: "https://pushkar-chaudhary.vercel.app",
    github: "https://github.com/Pushkar-Chaudhary/Portfolio",
    description:
      "A personal portfolio that presents my work, interests, and development journey.",
    tech: ["React", "Tailwind CSS", "Vite"],
  },
  {
    title: "Notes App",
    demo: "https://notes-app-kappa-ruby-64.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/notes",
    description: "A minimal notes app for creating and removing notes.",
    tech: ["React", "Tailwind CSS"],
  },
];

function ProjectCard({ project, index }) {
  const reducedMotion = useReducedMotion();
  const revealProps = reducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.45, ease: "easeOut", delay: index * 0.07 },
      };

  return (
    <TiltCard
      as={motion.article}
      className={`project-card${project.hero ? " project-card--hero" : ""}`}
      {...revealProps}
    >
      <div className="project-top">
        <div className="project-meta">
          {project.hero && (
            <span className="project-badge">Featured</span>
          )}
          <h2>{project.title}</h2>
        </div>

        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`Open ${project.title} live demo`}
        >
          <FaExternalLinkAlt aria-hidden="true" />
        </a>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="tech-list">
        {project.tech.map((tech) => (
          <span key={`${project.title}-${tech}`}>{tech}</span>
        ))}
      </div>

      <div className="project-actions">
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          Live demo <FaExternalLinkAlt aria-hidden="true" />
        </a>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub aria-hidden="true" /> GitHub
          </a>
        )}
      </div>
    </TiltCard>
  );
}

function Projects() {
  return (
    <div className="page-shell page-shell--wide">
      <SEO
        title="Projects | Pushkar Chaudhary - Selected Work & Builds"
        description="Explore web development projects, experiments, and live apps created by Pushkar Chaudhary."
        path="/projects"
      />

      <main className="page-stack">
        <header className="projects-header">
          <PagePlaneAccent />
          <p className="eyebrow">Selected work</p>
          <h1 className="section-title">Things I've built.</h1>
          <p className="lead">
            Small experiments, personal ideas, and pages I've turned into
            working products.
          </p>
        </header>

        <section className="project-grid" aria-label="Projects">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Projects;