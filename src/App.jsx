import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Footer from "./pages/Footer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const palette = darkMode
      ? {
          bg: "#030712",
          surface: "#111827",
          surfaceAlt: "#182235",
          border: "rgba(148, 163, 184, 0.22)",
          text: "#e5eaf2",
          muted: "#aab5c5",
          primary: "#f3f6fb",
          primaryHover: "#cbd5e1",
          accent: "#8fb8a2",
          accentSoft: "#1d3028",
          shadow: "0 24px 48px rgba(2, 6, 23, 0.45)",
        }
      : {
          bg: "#f8fafc",
          surface: "#ffffff",
          surfaceAlt: "#f3f4f6",
          border: "rgba(15, 23, 42, 0.08)",
          text: "#111827",
          muted: "#6b7280",
          primary: "#111827",
          primaryHover: "#374151",
          accent: "#28734f",
          accentSoft: "#e8f3ec",
          shadow: "0 24px 48px rgba(15, 23, 42, 0.08)",
        };

    root.style.setProperty("--bg", palette.bg);
    root.style.setProperty("--surface", palette.surface);
    root.style.setProperty("--surface-alt", palette.surfaceAlt);
    root.style.setProperty("--border", palette.border);
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
