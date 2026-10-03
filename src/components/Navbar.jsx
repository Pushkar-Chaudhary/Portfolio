import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Switch from "./Theme";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

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

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="top-nav-shell">
        <div className="top-nav-inner">
          <button
            ref={menuToggleRef}
            type="button"
            className="nav-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          <nav className="site-nav" aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link--active" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="nav-toggle-wrap">
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
        </div>
      </header>

      <nav
        id="mobile-navigation"
        className={`mobile-menu ${darkMode ? "mobile-menu--dark" : ""}`}
        aria-label="Mobile primary navigation"
        hidden={!menuOpen}
      >
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "mobile-nav-link--active" : ""}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Navbar;