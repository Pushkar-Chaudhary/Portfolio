import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaTimes,
  FaThLarge,
  FaListUl,
  FaCheck,
  FaCopy,
  FaArrowLeft,
  FaArrowRight,
  FaCode,
  FaMagic,
  FaStickyNote,
  FaGift,
  FaShoppingCart,
} from "react-icons/fa";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";
import TiltCard from "../components/TiltCard.jsx";
import imageSource from "../lib/imageSource.js";
import projectsData from "../data/projects.js";
import "./Projects.css";

const projectIcons = {
  code: FaCode,
  gift: FaGift,
  shoppingCart: FaShoppingCart,
  stickyNote: FaStickyNote,
};

const categories = ["All", "Full-Stack", "AI & Gemini", "Frontend", "E-Commerce"];

function renderProjectIcon(iconName) {
  const Icon = projectIcons[iconName] || FaCode;
  return <Icon aria-hidden="true" />;
}

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const reducedMotion = useReducedMotion();
  const query = searchQuery.toLowerCase().trim();

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some((technology) => technology.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, query]);

  useEffect(() => {
    if (!activeModalProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveModalProject(null);
      } else if (event.key === "ArrowRight") {
        const currentIndex = filteredProjects.findIndex(
          (project) => project.id === activeModalProject.id,
        );
        if (currentIndex < filteredProjects.length - 1) {
          setActiveModalProject(filteredProjects[currentIndex + 1]);
        }
      } else if (event.key === "ArrowLeft") {
        const currentIndex = filteredProjects.findIndex(
          (project) => project.id === activeModalProject.id,
        );
        if (currentIndex > 0) {
          setActiveModalProject(filteredProjects[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalProject, filteredProjects]);

  const handleCopyLink = (demoUrl) => {
    navigator.clipboard?.writeText(demoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="page-shell page-shell--narrow">
      <main className="page-stack">
        <header className="projects-header">
          <PagePlaneAccent />
          <p className="eyebrow">My projects</p>
          <h1 className="section-title">Things I&apos;ve built.</h1>
          <p className="lead">
            A few things I’ve built while learning, solving everyday problems, and trying out new ideas.
          </p>
        </header>

        <section className="projects-interactive-shell" aria-label="Interactive projects">
          <div className="projects-toolbar">
            <div className="projects-toolbar-row">
              <div className="filter-tabs" role="tablist" aria-label="Filter by project category">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  const count =
                    category === "All"
                      ? projectsData.length
                      : projectsData.filter((project) => project.category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`filter-tab${isActive ? " is-active" : ""}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="filter-pill-bg"
                          className="filter-pill-bg"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span>{category}</span>
                      <span className="filter-count">({count})</span>
                    </button>
                  );
                })}
              </div>

              <div className="projects-search-group">
                <div className="search-input-wrap">
                  <FaSearch className="search-icon" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search projects, tools, or ideas..."
                    className="projects-search-input"
                    aria-label="Search projects"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                <div className="view-mode-toggle" role="group" aria-label="Choose layout view">
                  <button
                    type="button"
                    className={`view-btn${viewMode === "grid" ? " is-active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                    aria-label="Grid view"
                  >
                    <FaThLarge aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={`view-btn${viewMode === "list" ? " is-active" : ""}`}
                    onClick={() => setViewMode("list")}
                    title="List view"
                    aria-label="List view"
                  >
                    <FaListUl aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="results-meta-row">
              <span>
                Found <strong>{filteredProjects.length}</strong> of{" "}
                <strong>{projectsData.length}</strong> project{projectsData.length === 1 ? "" : "s"}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  type="button"
                  className="clear-search-link"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {filteredProjects.length === 0 && (
            <div className="projects-empty-state">
              <FaSearch className="empty-icon" aria-hidden="true" />
              <h3>No matches this time</h3>
              <p>Try another search, or clear the filters to see all my projects.</p>
              <button
                type="button"
                className="reset-search-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Show all projects
              </button>
            </div>
          )}

          {viewMode === "grid" && filteredProjects.length > 0 && (
            <motion.div
              layout
              className="interactive-projects-grid"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => {
                  const revealProps = reducedMotion
                    ? { initial: false, animate: { opacity: 1 } }
                    : {
                        initial: { opacity: 0, y: 16 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, scale: 0.95 },
                        transition: { duration: 0.35, delay: index * 0.05 },
                      };

                  return (
                    <TiltCard
                      key={project.id}
                      as={motion.article}
                      layout
                      className={`interactive-card${project.hero ? " interactive-card--hero" : ""}`}
                      {...revealProps}
                    >
                      <div
                        className="card-preview-stage"
                        onClick={() => setActiveModalProject(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            setActiveModalProject(project);
                          }
                        }}
                        aria-label={`View details for ${project.title}`}
                      >
                        {project.preview ? (
                          <img
                            src={imageSource(project.preview)}
                            alt={`${project.title} screenshot`}
                            className="card-preview-img"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="card-preview-generative">
                            <div className="generative-dots">
                              <span />
                              <span />
                              <span />
                            </div>
                            <div className="generative-center">
                              <span className="generative-icon">{renderProjectIcon(project.icon)}</span>
                              <span className="generative-title">{project.title}</span>
                            </div>
                            <div className="generative-footer">
                              <span>{project.category}</span>
                              <span>{project.year}</span>
                            </div>
                          </div>
                        )}

                        <div className="card-preview-overlay">
                          <span className="preview-overlay-btn">
                            <FaMagic aria-hidden="true" /> Take a closer look
                          </span>
                        </div>
                      </div>

                      <div className="card-content-body">
                        <div className="card-header-bar">
                          <div className="card-title-group">
                            <span className="card-category-tag">{project.category}</span>
                            <h2 className="card-title">{project.title}</h2>
                          </div>
                          <span className="card-status-badge">{project.status}</span>
                        </div>

                        <p className="card-description">{project.description}</p>

                        <div className="card-tech-wrap" aria-label="Technologies used">
                          {project.tech.map((technology) => (
                            <span key={`${project.id}-${technology}`} className="card-tech-chip">
                              {technology}
                            </span>
                          ))}
                        </div>

                        <div className="card-bottom-actions">
                          <div className="card-left-links">
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-launch-link"
                            >
                              Visit site <FaExternalLinkAlt aria-hidden="true" />
                            </a>

                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-github-link"
                                aria-label={`View ${project.title} on GitHub`}
                              >
                                <FaGithub aria-hidden="true" /> Source
                              </a>
                            )}
                          </div>

                          <button
                            type="button"
                            className="action-inspect-btn"
                            onClick={() => setActiveModalProject(project)}
                          >
                            Details →
                          </button>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {viewMode === "list" && filteredProjects.length > 0 && (
            <motion.div
              layout
              className="projects-list-table"
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="list-row"
                  >
                    <div className="list-project-name">
                      {project.preview ? (
                        <img
                          src={imageSource(project.preview)}
                          alt=""
                          className="list-thumb"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="list-thumb" style={{ display: "grid", placeItems: "center" }}>
                          {renderProjectIcon(project.icon)}
                        </div>
                      )}
                      <div className="list-title-box">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>
                    </div>

                    <span className="list-category">{project.category}</span>

                    <div className="list-tech-wrap">
                      {project.tech.slice(0, 3).map((technology) => (
                        <span key={technology} className="card-tech-chip">
                          {technology}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="card-tech-chip">+{project.tech.length - 3}</span>
                      )}
                    </div>

                    <div className="list-actions">
                      <button
                        type="button"
                        className="action-inspect-btn"
                        onClick={() => setActiveModalProject(project)}
                      >
                        Details
                      </button>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="action-launch-link"
                      >
                        Visit site <FaExternalLinkAlt aria-hidden="true" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              className="project-modal-dialog"
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close project modal"
              >
                <FaTimes />
              </button>

              <div className="modal-hero-stage">
                {activeModalProject.preview ? (
                  <img
                    src={imageSource(activeModalProject.preview)}
                    alt={`${activeModalProject.title} preview`}
                    className="modal-hero-img"
                    decoding="async"
                  />
                ) : (
                  <div className="card-preview-generative" style={{ height: "100%" }}>
                    <div className="generative-center">
                      <span className="generative-icon" style={{ fontSize: "3rem" }}>
                        {renderProjectIcon(activeModalProject.icon)}
                      </span>
                      <span className="generative-title" style={{ fontSize: "1.4rem" }}>
                        {activeModalProject.title}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-body">
                <header className="modal-header">
                  <div className="modal-eyebrow-row">
                    <span className="card-category-tag">{activeModalProject.category}</span>
                    <span className="card-status-badge">{activeModalProject.status}</span>
                  </div>
                  <h2 id="modal-project-title" className="modal-title">
                    {activeModalProject.title}
                  </h2>
                </header>

                <div className="modal-section">
                  <span className="modal-section-title">About this project</span>
                  <p className="modal-desc">{activeModalProject.description}</p>
                </div>

                {activeModalProject.highlights && (
                  <div className="modal-section">
                    <span className="modal-section-title">A few details</span>
                    <ul className="modal-highlights-list">
                      {activeModalProject.highlights.map((highlight, index) => (
                        <li key={`${activeModalProject.id}-highlight-${index}`}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-section">
                  <span className="modal-section-title">Technologies</span>
                  <div className="card-tech-wrap">
                    {activeModalProject.tech.map((technology) => (
                      <span key={technology} className="card-tech-chip">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions-bar">
                  <div className="modal-action-group">
                    <a
                      href={activeModalProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-launch-link"
                    >
                      Visit the site <FaExternalLinkAlt aria-hidden="true" />
                    </a>

                    {activeModalProject.github && (
                      <a
                        href={activeModalProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-github-link"
                      >
                        <FaGithub aria-hidden="true" /> Source
                      </a>
                    )}

                    <button
                      type="button"
                      className="copy-link-btn"
                      onClick={() => handleCopyLink(activeModalProject.demo)}
                    >
                      {copiedLink ? (
                        <>
                          <FaCheck style={{ color: "var(--accent)" }} /> Copied!
                        </>
                      ) : (
                        <>
                          <FaCopy /> Copy link
                        </>
                      )}
                    </button>
                  </div>

                  <div className="modal-nav-group">
                    <button
                      type="button"
                      className="modal-nav-btn"
                      onClick={() => {
                        const currentIndex = filteredProjects.findIndex(
                          (project) => project.id === activeModalProject.id,
                        );
                        if (currentIndex > 0) {
                          setActiveModalProject(filteredProjects[currentIndex - 1]);
                        }
                      }}
                      disabled={
                        filteredProjects.findIndex(
                          (project) => project.id === activeModalProject.id,
                        ) === 0
                      }
                      title="Previous project (Left Arrow)"
                    >
                      <FaArrowLeft /> Previous
                    </button>
                    <button
                      type="button"
                      className="modal-nav-btn"
                      onClick={() => {
                        const currentIndex = filteredProjects.findIndex(
                          (project) => project.id === activeModalProject.id,
                        );
                        if (currentIndex < filteredProjects.length - 1) {
                          setActiveModalProject(filteredProjects[currentIndex + 1]);
                        }
                      }}
                      disabled={
                        filteredProjects.findIndex(
                          (project) => project.id === activeModalProject.id,
                        ) ===
                        filteredProjects.length - 1
                      }
                      title="Next project (Right Arrow)"
                    >
                      Next <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
