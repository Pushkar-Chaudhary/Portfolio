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
} from "react-icons/fa";
import SEO from "../components/SEO.jsx";
import PagePlaneAccent from "../components/PagePlaneAccent.jsx";
import TiltCard from "../components/TiltCard.jsx";
import aafnoKuraPreview from "../assets/projects/aafno-kura.png";
import careerSathiPreview from "../assets/projects/career-sathi.png";
import sajiloBlogPreview from "../assets/projects/sajilo-blog.png";
import "./Projects.css";

const projectsData = [
  {
    id: "aafno-kura",
    title: "Aafno Kura",
    category: "Full-Stack",
    demo: "https://aafno-kura.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/aafno-kura",
    preview: aafnoKuraPreview,
    description:
      "A complete social platform featuring public community feeds, user post publishing, dynamic interactions, and responsive multi-device design.",
    hero: true,
    tech: ["Node.js", "Express", "EJS", "MongoDB", "REST API"],
    highlights: [
      "Dynamic feed with real-time updates and post creation",
      "Robust MongoDB database schema with Mongoose models",
      "Session-based user interactions and media support",
      "Fully responsive design optimized for mobile and desktop screens",
    ],
    status: "Featured",
    year: "2025",
  },
  {
    id: "career-sathi",
    title: "Career Sathi",
    category: "AI & Gemini",
    demo: "https://career-sathii.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/career-sathi",
    preview: careerSathiPreview,
    description:
      "An AI-powered career counseling platform integrating Google Gemini API to analyze user goals, recommend actionable roadmaps, and assess skill gaps.",
    hero: false,
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    highlights: [
      "Context-aware AI career counseling using Gemini Flash model",
      "Interactive step-by-step career path visualization",
      "Dynamic skill assessments and actionable feedback",
      "Secure backend proxy to protect API tokens and manage rate limits",
    ],
    status: "AI Powered",
    year: "2025",
  },
  {
    id: "sajilo-blog",
    title: "Sajilo Blog",
    category: "Full-Stack",
    demo: "https://sajiloblog.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/sajilo-blog",
    preview: sajiloBlogPreview,
    description:
      "A fast, distraction-free blog engine and writing space designed for clean readability, seamless article creation, and optimized loading.",
    hero: false,
    tech: ["React", "Node.js", "Express", "MongoDB"],
    highlights: [
      "Minimalist reader UI with typography fine-tuned for legibility",
      "Fast database querying with MongoDB indexing",
      "Article tagging and category sorting engine",
      "Lightweight bundle size with rapid initial paint",
    ],
    status: "Live App",
    year: "2025",
  },
  {
    id: "wishly",
    title: "Wishly",
    category: "Frontend",
    demo: "https://wishly-wish.vercel.app/",
    preview: null,
    icon: <FaGift />,
    description:
      "An interactive birthday wishing experience made with vibe-coding, celebratory animations, customized greeting flows, and sound effects.",
    hero: false,
    tech: ["React", "Node.js", "CSS Animations", "Canvas Confetti"],
    highlights: [
      "Custom celebratory sound effects and full-screen confetti cascades",
      "Interactive greeting generator with shareable URLs",
      "Playful micro-interactions with smooth easing curves",
    ],
    status: "Vibe Coded",
    year: "2026",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Frontend",
    demo: "https://pushkar-chaudhary.vercel.app",
    github: "https://github.com/Pushkar-Chaudhary/Portfolio",
    preview: null,
    icon: <FaCode />,
    description:
      "My personal digital garden featuring 3D tilt mechanics, accessible light/dark modes, real-time GitHub telemetry, and smooth route transitions.",
    hero: false,
    tech: ["React 19", "Tailwind CSS", "Vite", "Framer Motion"],
    highlights: [
      "Bespoke custom cursor with element-specific magnetic states",
      "Live GitHub commit calendar sync with error-resilient fallbacks",
      "100% responsive fluid typography and micro-interactions",
    ],
    status: "Active",
    year: "2026",
  },
  {
    id: "notes-app",
    title: "Notes App",
    category: "Frontend",
    demo: "https://notes-app-kappa-ruby-64.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/notes",
    preview: null,
    icon: <FaStickyNote />,
    description:
      "A lightweight, distraction-free notepad designed for quick capture, search-as-you-type filtering, and zero-latency local storage sync.",
    hero: false,
    tech: ["React", "Tailwind CSS", "LocalStorage API"],
    highlights: [
      "Instant offline persistence with zero setup needed",
      "Quick keyboard shortcuts for note creation and deletion",
      "Clean visual cards with color categorization",
    ],
    status: "Utility",
    year: "2024",
  },
];

const categories = ["All", "Full-Stack", "AI & Gemini", "Frontend"];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const reducedMotion = useReducedMotion();

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q)) ||
        project.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalProject) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredProjects.findIndex(
          (p) => p.id === activeModalProject.id,
        );
        if (currentIndex < filteredProjects.length - 1) {
          setActiveModalProject(filteredProjects[currentIndex + 1]);
        }
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredProjects.findIndex(
          (p) => p.id === activeModalProject.id,
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
    <div className="page-shell page-shell--wide">
      <SEO
        title="Projects | Pushkar Chaudhary - Interactive Showcase"
        description="Explore interactive web development projects, experiments, and live apps created by Pushkar Chaudhary."
        path="/projects"
      />

      <main className="page-stack">
        <header className="projects-header">
          <PagePlaneAccent />
          <p className="eyebrow">Interactive Portfolio</p>
          <h1 className="section-title">Things I&apos;ve built.</h1>
          <p className="lead">
            Interactive experiments, full-stack web applications, and AI integrations crafted with clean architecture and modern UX.
          </p>
        </header>

        <section className="projects-interactive-shell" aria-label="Interactive projects">
          {/* Interactive Toolbar */}
          <div className="projects-toolbar">
            <div className="projects-toolbar-row">
              {/* Category Filter Tabs */}
              <div className="filter-tabs" role="tablist" aria-label="Filter by project category">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count =
                    cat === "All"
                      ? projectsData.length
                      : projectsData.filter((p) => p.category === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`filter-tab${isActive ? " is-active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="filter-pill-bg"
                          className="filter-pill-bg"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span>{cat}</span>
                      <span className="filter-count">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search & View Controls */}
              <div className="projects-search-group">
                <div className="search-input-wrap">
                  <FaSearch className="search-icon" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, tech, or stack..."
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

            {/* Results Counter Row */}
            <div className="results-meta-row">
              <span>
                Showing <strong>{filteredProjects.length}</strong> of{" "}
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

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="projects-empty-state">
              <FaSearch className="empty-icon" aria-hidden="true" />
              <h3>No projects matched your criteria</h3>
              <p>Try searching for a different keyword or resetting your category filter.</p>
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

          {/* Grid View */}
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
                      {/* Preview Stage */}
                      <div
                        className="card-preview-stage"
                        onClick={() => setActiveModalProject(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setActiveModalProject(project);
                          }
                        }}
                        aria-label={`View details for ${project.title}`}
                      >
                        {project.preview ? (
                          <img
                            src={project.preview}
                            alt={`${project.title} screenshot`}
                            className="card-preview-img"
                            loading="lazy"
                          />
                        ) : (
                          <div className="card-preview-generative">
                            <div className="generative-dots">
                              <span />
                              <span />
                              <span />
                            </div>
                            <div className="generative-center">
                              <span className="generative-icon">{project.icon || <FaCode />}</span>
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
                            <FaMagic aria-hidden="true" /> Quick Inspect
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
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
                          {project.tech.map((tech) => (
                            <span key={`${project.id}-${tech}`} className="card-tech-chip">
                              {tech}
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
                              Live App <FaExternalLinkAlt aria-hidden="true" />
                            </a>

                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-github-link"
                                aria-label={`View ${project.title} on GitHub`}
                              >
                                <FaGithub aria-hidden="true" /> Code
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

          {/* List / Compact View */}
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
                          src={project.preview}
                          alt=""
                          className="list-thumb"
                        />
                      ) : (
                        <div className="list-thumb" style={{ display: "grid", placeItems: "center" }}>
                          {project.icon || <FaCode />}
                        </div>
                      )}
                      <div className="list-title-box">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>
                    </div>

                    <span className="list-category">{project.category}</span>

                    <div className="list-tech-wrap">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="card-tech-chip">
                          {t}
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
                        Inspect
                      </button>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="action-launch-link"
                      >
                        Demo <FaExternalLinkAlt aria-hidden="true" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      {/* Interactive Quick View Modal */}
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
              onClick={(e) => e.stopPropagation()}
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
                    src={activeModalProject.preview}
                    alt={`${activeModalProject.title} preview`}
                    className="modal-hero-img"
                  />
                ) : (
                  <div className="card-preview-generative" style={{ height: "100%" }}>
                    <div className="generative-center">
                      <span className="generative-icon" style={{ fontSize: "3rem" }}>
                        {activeModalProject.icon || <FaCode />}
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
                  <span className="modal-section-title">Overview</span>
                  <p className="modal-desc">{activeModalProject.description}</p>
                </div>

                {activeModalProject.highlights && (
                  <div className="modal-section">
                    <span className="modal-section-title">Architecture Highlights</span>
                    <ul className="modal-highlights-list">
                      {activeModalProject.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-section">
                  <span className="modal-section-title">Technologies</span>
                  <div className="card-tech-wrap">
                    {activeModalProject.tech.map((t) => (
                      <span key={t} className="card-tech-chip">
                        {t}
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
                      Open Live Demo <FaExternalLinkAlt aria-hidden="true" />
                    </a>

                    {activeModalProject.github && (
                      <a
                        href={activeModalProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-github-link"
                      >
                        <FaGithub aria-hidden="true" /> Source Code
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
                          <FaCopy /> Copy Link
                        </>
                      )}
                    </button>
                  </div>

                  <div className="modal-nav-group">
                    <button
                      type="button"
                      className="modal-nav-btn"
                      onClick={() => {
                        const curIdx = filteredProjects.findIndex(
                          (p) => p.id === activeModalProject.id,
                        );
                        if (curIdx > 0) {
                          setActiveModalProject(filteredProjects[curIdx - 1]);
                        }
                      }}
                      disabled={
                        filteredProjects.findIndex(
                          (p) => p.id === activeModalProject.id,
                        ) === 0
                      }
                      title="Previous project (Left Arrow)"
                    >
                      <FaArrowLeft /> Prev
                    </button>
                    <button
                      type="button"
                      className="modal-nav-btn"
                      onClick={() => {
                        const curIdx = filteredProjects.findIndex(
                          (p) => p.id === activeModalProject.id,
                        );
                        if (curIdx < filteredProjects.length - 1) {
                          setActiveModalProject(filteredProjects[curIdx + 1]);
                        }
                      }}
                      disabled={
                        filteredProjects.findIndex(
                          (p) => p.id === activeModalProject.id,
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