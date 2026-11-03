import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import aafnoKuraPreview from "../assets/projects/aafno-kura.png";
import careerSathiPreview from "../assets/projects/career-sathi.png";
import sajiloBlogPreview from "../assets/projects/sajilo-blog.png";
import imageSource from "../lib/imageSource.js";
import "./ProjectShowcase.css";

const projects = [
  {
    name: "Aafno Kura",
    category: "Social platform",
    description:
      "A community feed with post publishing, updates, and user interactions.",
    url: "https://aafno-kura.vercel.app/",
    preview: aafnoKuraPreview,
    stack: ["Node.js", "Express", "MongoDB"],
  },
  {
    name: "Career Sathi",
    category: "Career guidance",
    description:
      "Uses Gemini to turn career goals into roadmaps and skill-gap assessments.",
    url: "https://career-sathii.vercel.app/",
    preview: careerSathiPreview,
    stack: ["React", "Node.js", "Gemini API"],
  },
  {
    name: "Sajilo Blog",
    category: "Writing platform",
    description:
      "A blog with article publishing, tags, and category browsing.",
    url: "https://sajiloblog.vercel.app/",
    preview: sajiloBlogPreview,
    stack: ["React", "Express", "MongoDB"],
  },
];

function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section className="project-showcase" aria-label="Interactive project showcase">
      <header className="project-showcase-header">
        <p><span className="showcase-status-dot" /> Selected work</p>
        <span className="showcase-count">Choose a project</span>
      </header>

      <div className="project-showcase-display" aria-live="polite">
        <div className="project-showcase-art">
          <img
            key={activeProject.name}
            src={imageSource(activeProject.preview)}
            alt={`${activeProject.name} website preview`}
            style={{ animation: "fadeIn 0.35s ease" }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="project-showcase-copy" key={`copy-${activeProject.name}`}>
          <p className="showcase-category">{activeProject.category}</p>
          <h2>{activeProject.name}</h2>
          <p className="showcase-description">{activeProject.description}</p>
          <div className="showcase-stack" aria-label="Technologies">
            {activeProject.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <a
            className="showcase-project-link"
            href={activeProject.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore project <FaExternalLinkAlt aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="project-showcase-picker" role="group" aria-label="Choose a featured project">
        {projects.map((project, index) => (
          <button
            key={project.name}
            type="button"
            className={`showcase-project-option${activeIndex === index ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-pressed={activeIndex === index}
          >
            <img src={imageSource(project.preview)} alt="" />
            {project.name}
            <span className="showcase-option-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ProjectShowcase;
