import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const palette = darkMode
      ? {
          bg: "#030712",
          surface: "#111827",
          surfaceAlt: "#0f172a",
          border: "rgba(148, 163, 184, 0.18)",
          text: "#f9fafb",
          muted: "#9ca3af",
          primary: "#f9fafb",
          primaryHover: "#d1d5db",
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
    document.body.style.backgroundColor = palette.bg;
    document.body.style.color = palette.text;
  }, [darkMode]);

  return (
    <div className="app-shell">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
