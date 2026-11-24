import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ThemeToggle from "./Theme.jsx";

const sections = [
  {
    label: "",
    style: "primary",
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Projects", path: "/projects" },
    ],
  },
  {
    label: "Personal",
    style: "personal",
    links: [{ name: "Dashboard", path: "/dashboard" }],
  },
  {
    label: "Elsewhere",
    style: "elsewhere",
    links: [
      { name: "Guestbook", path: "/guestbook" },
      { name: "Contact", path: "/contact" },
    ],
  },
];

const subscribeToTheme = (onChange) => {
  window.addEventListener("portfolio-theme-change", onChange);
  return () => window.removeEventListener("portfolio-theme-change", onChange);
};

const getThemeSnapshot = () => document.documentElement.dataset.theme === "dark";
const getServerThemeSnapshot = () => true;

function Navbar({ activePath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const menuToggleRef = useRef(null);

  const toggleTheme = () => {
    const nextDarkMode = !getThemeSnapshot();
    document.documentElement.dataset.theme = nextDarkMode ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme", nextDarkMode ? "dark" : "light");
    } catch {
      // Theme changes still apply when storage is unavailable.
    }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const renderSections = (mobile = false) => sections.map((section) => (
    <div className={`nav-section nav-section--${section.style}`} key={section.style}>
      {section.label && <h2 className="nav-section-label">{section.label}</h2>}
      <div className="nav-section-links">
        {section.links.map((link) => (
          <a
            key={link.path}
            href={link.path}
            onClick={mobile ? () => setMenuOpen(false) : undefined}
            aria-current={activePath === link.path ? "page" : undefined}
            className={`nav-link ${activePath === link.path ? "nav-link--active" : ""}`}
          >
            <span className="nav-link-dot" aria-hidden="true" />
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  ));

  return (
    <>
      <header className="top-nav-shell">
        <div className="top-nav-inner">
          <div className="mobile-header-actions">
            <ThemeToggle checked={darkMode} onChange={toggleTheme} />
            <button
              ref={menuToggleRef}
              type="button"
              className="nav-menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <aside className="desktop-sidebar">
        <nav className="sidebar-navigation" aria-label="Primary navigation">
          {renderSections()}
        </nav>
      </aside>

      <div className="theme-control">
        <ThemeToggle checked={darkMode} onChange={toggleTheme} />
      </div>

      {menuOpen && <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      <nav id="mobile-navigation" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile primary navigation" aria-hidden={!menuOpen}>
        {renderSections(true)}
      </nav>
    </>
  );
}

export default Navbar;
