import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import imageSource from "../lib/imageSource.js";
import projectsData from "../data/projects.js";
import "./ProjectShowcase.css";

const featuredProjects = projectsData.filter((project) => project.showcase);

function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featuredProjects[activeIndex];

  return (
    <section className="project-showcase" aria-labelledby="project-showcase-title">
      <header className="project-showcase-header">
        <h2 id="project-showcase-title">A few things I&apos;ve made</h2>
        <span className="showcase-count">Pick a project to see more</span>
      </header>

      <div className="project-showcase-display" aria-live="polite">
        <div className="project-showcase-art">
          <img
            key={activeProject.id}
            src={imageSource(activeProject.preview)}
            alt={`${activeProject.title} website preview`}
            style={{ animation: "fadeIn 0.35s ease" }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="project-showcase-copy" key={`copy-${activeProject.id}`}>
          <p className="showcase-category">{activeProject.showcase.category}</p>
          <h2>{activeProject.title}</h2>
          <p className="showcase-description">{activeProject.showcase.description}</p>
          <div className="showcase-stack" aria-label="Technologies">
            {activeProject.showcase.tech.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <a
            className="showcase-project-link"
            href={activeProject.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore project <FaExternalLinkAlt aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="project-showcase-picker" role="group" aria-label="Choose a featured project">
        {featuredProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`showcase-project-option${activeIndex === index ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-pressed={activeIndex === index}
          >
            <img src={imageSource(project.preview)} alt="" />
            {project.title}
            <span className="showcase-option-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ProjectShowcase;
