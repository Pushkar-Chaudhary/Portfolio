import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const color = darkMode ? "#030712" : "#ffffff";
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    document.body.style.color = darkMode ? "#f9fafb" : "#111827";
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-white text-gray-900"
      }`}
      style={{ backgroundColor: darkMode ? "#030712" : "#ffffff" }}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </div>
  );
}

export default App;
