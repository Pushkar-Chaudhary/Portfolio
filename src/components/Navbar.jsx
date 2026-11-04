import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ThemeToggle from "./Theme.jsx";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Contact", path: "/contact" },
];

const subscribeToTheme = (onChange) => {
  window.addEventListener("portfolio-theme-change", onChange);
  return () => window.removeEventListener("portfolio-theme-change", onChange);
};

const getThemeSnapshot = () => document.documentElement.dataset.theme === "dark";
const getServerThemeSnapshot = () => false;

function Navbar({ activePath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
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

  return (
    <>
      <header className="top-nav-shell">
        <div className="top-nav-inner">
          <div className="nav-left-actions">
            <ThemeToggle checked={darkMode} onChange={toggleTheme} />
          </div>

          <nav className="site-nav" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.path}
                href={link.path}
                aria-current={activePath === link.path ? "page" : undefined}
                className={`nav-link ${activePath === link.path ? "nav-link--active" : ""}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="nav-right-actions">
            <button
              ref={menuToggleRef}
              type="button"
              className="nav-menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop to close menu when clicking outside */}
      {menuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <nav
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile primary navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          {links.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              aria-current={activePath === link.path ? "page" : undefined}
              className={`mobile-nav-link ${activePath === link.path ? "mobile-nav-link--active" : ""}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
