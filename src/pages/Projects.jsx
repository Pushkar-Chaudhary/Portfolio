import Navbar from "../components/Navbar.jsx";
import SEO from "../components/SEO.jsx";

const projects = [
  {
    title: "Happy Birthday",
    demo: "https://happybirthdayto-you.vercel.app/",
    description:
      "A simple birthday wish page that can be used to celebrate yourself or someone special.",
    featured: true,
  },
  {
    title: "Portfolio Website",
    demo: "https://pushkar-chaudhary.vercel.app",
    description:
      "A personal portfolio website that showcases my skills and projects.",
    featured: false,
  },
  {
    title:"Notes App",
    demo:"https://notes-app-kappa-ruby-64.vercel.app/",
    description:"A simple notes app that allows users to create, edit, and delete notes.",
    featured:false
  }
];

function Projects() {
  return (
    <>
      <SEO
        title="Projects | Pushkar Chaudhary - Selected Work & Builds"
        description="Explore web development projects, experiments, and live apps created by Pushkar Chaudhary."
        path="/projects"
      />
      <Navbar />

      <main className="container projects-page">
        <section className="projects-hero glass fade-in-up">
          <p className="projects-kicker">Selected Work</p>

          <h1>My Projects</h1>

          <p>
            Small builds, experiments, and ideas I've turned into working
            pages.
          </p>
        </section>

        <section className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={index}
              className="project-card project-card--featured fade-in-up"
            >
              <div className="project-card__header">
                <div>
                  {project.featured && (
                    <p className="project-tag">Featured</p>
                  )}

                  <h2>{project.title}</h2>
                </div>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-arrow"
                  aria-label={`Open ${project.title}`}
                >
                  ↗
                </a>
              </div>

              <p>{project.description}</p>

              <div className="tech-stack">
                <span>React</span><br></br>
                <span>TailwindCSS</span>
              </div>

              <div className="project-card__footer">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  View Live Demo
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default Projects;