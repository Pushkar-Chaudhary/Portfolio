import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="top-bar">
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      <nav className={`nav ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
          About Me
        </Link>

        <Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>
          Projects
        </Link>
        <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;