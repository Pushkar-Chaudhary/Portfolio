
import SEO from "../components/SEO.jsx";
import TiltCard from "../components/TiltCard.jsx";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";

const projects = [
  {
    title: "Aafno Kura",
    demo: "https://aafno-kura.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/aafno-kura",
    description: "A social app for sharing updates, with a public feed and tools for managing posts.",
    featured: true,
    tech: ["Node.js", "Express", "EJS", "MongoDB"],
  },
  {
    title: "Wishly",
    demo: "https://wishly-wish.vercel.app/",
    description: "A birthday wishing page made with vibe-coding to help someone special feel celebrated.",
    featured: true,
    tech: ["Node.js", "React"],
  },
  {
    title: "Career Sathi",
    demo: "https://career-sathii.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/career-sathi",
    description: "A career guidance app built with React and Node.js, with Gemini-powered features.",
    featured: true,
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
  },
  {
    title: "Portfolio Website",
    demo: "https://pushkar-chaudhary.vercel.app",
    github: "https://github.com/Pushkar-Chaudhary/Portfolio",
    description: "A personal portfolio that presents my work, interests, and development journey.",
    featured: false,
    tech: ["React", "Tailwind CSS", "Vite"],
  },
  {
    title: "Notes App",
    demo: "https://notes-app-kappa-ruby-64.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/notes",
    description: "A minimal notes app for creating and removing notes.",
    featured: false,
    tech: ["React", "Tailwind CSS"],
  },
];

function ProjectCard({ project }) {
  return (
    <TiltCard
      as="article"
      className={`project-card tilt-card ${project.featured ? "featured" : ""}`}
    >
      <div className="project-top">
        <div>
          {project.featured && <span className="project-badge">Featured</span>}
          <h2>{project.title}</h2>
        </div>

        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`Open ${project.title}`}
        >
          ↗
        </a>
      </div>

      <p>{project.description}</p>

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
          Live demo
        </a>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub
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
        <header className="page-intro">
          <PagePlaneAccent />
          <p className="eyebrow">Selected work</p>
          <p className="lead">
            Small experiments, personal ideas, and pages I’ve turned into working
            products.
          </p>
        </header>

        <section className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Projects;