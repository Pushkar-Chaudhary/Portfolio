import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Footer from "./pages/Footer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");

    const palette = darkMode
      ? {
          bg: "#09090b",
          surface: "#121214",
          surfaceAlt: "#18181b",
          border: "#27272a",
          borderSubtle: "#1f1f23",
          text: "#fafafa",
          muted: "#a1a1aa",
          primary: "#fafafa",
          primaryHover: "#d4d4d8",
          accent: "#10b981",
          accentSoft: "rgba(16, 185, 129, 0.14)",
          shadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
        }
      : {
          bg: "#ffffff",
          surface: "#fafafa",
          surfaceAlt: "#f4f4f5",
          border: "#e4e4e7",
          borderSubtle: "#f4f4f5",
          text: "#09090b",
          muted: "#71717a",
          primary: "#09090b",
          primaryHover: "#27272a",
          accent: "#059669",
          accentSoft: "rgba(5, 150, 105, 0.08)",
          shadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        };

    root.style.setProperty("--bg", palette.bg);
    root.style.setProperty("--surface", palette.surface);
    root.style.setProperty("--surface-alt", palette.surfaceAlt);
    root.style.setProperty("--border", palette.border);
    root.style.setProperty("--border-subtle", palette.borderSubtle);
    root.style.setProperty("--text", palette.text);
    root.style.setProperty("--muted", palette.muted);
    root.style.setProperty("--primary", palette.primary);
    root.style.setProperty("--primary-hover", palette.primaryHover);
    root.style.setProperty("--shadow", palette.shadow);
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--accent-soft", palette.accentSoft);
    root.dataset.theme = darkMode ? "dark" : "light";
    document.body.style.backgroundColor = palette.bg;
    document.body.style.color = palette.text;
  }, [darkMode]);

  return (
    <>
      <CustomCursor />
      <div className={`app-shell${darkMode ? " theme-dark" : ""}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
