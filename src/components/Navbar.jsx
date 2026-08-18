import { Link } from "react-router-dom";
import { useState } from "react";
import Switch from "./Theme";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const textColor = darkMode ? "#f3f4f6" : "#111827";
  const mutedTextColor = darkMode ? "#9ca3af" : "#6b7280";

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-3 z-50 flex justify-center px-3">
      
      <div className="flex items-center">

        {/* Navbar */}
        <nav
          className={`
            flex items-center
            rounded-full
            border
            px-2 py-1
            backdrop-blur-md
            shadow-sm
            transition-all
            duration-300

            ${
              darkMode
                ? "border-gray-700 bg-gray-900/70"
                : "border-gray-200 bg-white/70"
            }
          `}
        >

          {/* Mobile menu button */}
          <button
            className="mr-1 flex h-8 w-8 items-center justify-center rounded-full text-lg md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            style={{ color: textColor }}
          >
            ☰
          </button>

          {/* Links */}
          <div
            className={`
              items-center
              md:flex
              ${
                menuOpen
                  ? "flex w-full flex-col py-2"
                  : "hidden"
              }
              md:flex-row
            `}
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`
                  rounded-full
                  px-3
                  py-2
                  text-sm
                  transition-all
                  duration-200
                  hover:bg-black/5
                  dark:hover:bg-white/10
                  ${
                    menuOpen
                      ? "w-full text-center"
                      : ""
                  }
                `}
                style={{ color: mutedTextColor }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Theme Switch */}
        <div className="ml-2 flex items-center">
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

      </div>
    </header>
  );
}

export default Navbar;