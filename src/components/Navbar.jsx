import { Link } from "react-router-dom";
import { useState } from "react";
import Switch from "./Theme";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const textColor = darkMode ? "#f3f4f6" : "#111827";
  const mutedTextColor = "#111827";

  return (
    <div
      className="flex flex-wrap items-center mx-auto gap-4 mt-3 justify-between w-full px-3 md:justify-center md:gap-10 md:mt-2rem"
      style={{ color: textColor }}
    >
      <header className="flex items-center">
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          style={{ color: textColor, marginTop: "4px" }}
        >
          ☰
        </button>

        <nav
          className={`nav ${menuOpen ? "active" : ""}`}
          style={{ color: textColor }}
        >
          <Link
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ color: mutedTextColor }}
          >
            Home
          </Link>

          <Link
            to="/about"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ color: mutedTextColor }}
          >
            About Me
          </Link>

          <Link
            to="/projects"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ color: mutedTextColor }}
          >
            Projects
          </Link>

          <Link
            to="/dashboard"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ color: mutedTextColor }}
          >
            Dashboard
          </Link>

          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ color: mutedTextColor }}
          >
            Contact
          </Link>
        </nav>
      </header>
      <div style={{ marginTop: "4px" }}>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>
    </div>
  );
}

export default Navbar;