
import SEO from "../components/SEO.jsx";

const projects = [
  {
    title: "Aafno Kura",
    demo: "https://aafno-kura.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary",
    description: "A simple post page for publishing short updates and daily thoughts.",
    featured: true,
    tech: ["Node.js", "EJS"],
  },
  {
    title: "Happy Birthday",
    demo: "https://happybirthdayto-you.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary",
    description: "A lightweight birthday page designed to celebrate someone special with a warm feel.",
    featured: true,
    tech: ["React", "Tailwind CSS", "Animations"],
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
    github: "https://github.com/Pushkar-Chaudhary",
    description: "A minimal notes app that lets users create, edit, and remove entries with local persistence.",
    featured: false,
    tech: ["React", "Tailwind CSS", "Local Storage"],
  },
];

function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.featured ? "featured" : ""}`}>
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

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-secondary"
          aria-label={`View ${project.title} on GitHub`}
        >
          GitHub
        </a>
      </div>
    </article>
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
          <p className="eyebrow">Selected work</p>
          <h1>Minimal builds.</h1>
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