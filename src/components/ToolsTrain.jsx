import "./ToolsTrain.css";
import { useState } from "react";
import {
  SiAstro,
  SiExpress,
  SiGit,
  SiGithub,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

const tools = [
  { name: "React", icon: <SiReact /> },
  { name: "Astro", icon: <SiAstro /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Git", icon: <SiGit /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Vite", icon: <SiVite /> },
];

function ToolList({ copy = false, locomotive = false }) {
  return (
    <ul className="tools-train-set" aria-hidden={copy || undefined}>
      {locomotive && (
        <li className="tools-train-engine" aria-label="Technology train">
          <svg viewBox="0 0 76 44" aria-hidden="true">
            <path d="M5 34h66v5H5zM11 28V15h28l10 8v5H11Zm38-5V11h12l8 12H49Z" />
            <path d="M17 18h8v7h-8zm13 0h7v7h-7zm23-4v8h10l-6-8z" className="engine-window" />
            <circle cx="23" cy="34" r="6" /><circle cx="58" cy="34" r="6" />
            <circle cx="23" cy="34" r="2" className="engine-wheel" />
            <circle cx="58" cy="34" r="2" className="engine-wheel" />
            <path d="M13 11h8V6h-5z" />
          </svg>
        </li>
      )}
      {tools.map(({ name, icon }) => (
        <li className="tools-train-car" key={name}>
          <span className="tools-train-icon" aria-hidden="true">{icon}</span>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ToolsTrain() {
  const [moving, setMoving] = useState(true);

  return (
    <section className="tools-train" aria-label="Technologies I work with">
      <header className="tools-train-heading">
        <h2 className="tools-train-title">Tools I use</h2>
        <button
          className="tools-train-control"
          type="button"
          aria-pressed={!moving}
          onClick={() => setMoving((isMoving) => !isMoving)}
        >
          {moving ? "Pause train" : "Start train"}
        </button>
      </header>
      <div
        className={`tools-train-window${moving ? " is-moving" : ""}`}
        role="group"
        aria-label="Technology train"
      >
        <div className="tools-train-track">
          <ToolList locomotive />
          <ToolList copy locomotive />
        </div>
      </div>
    </section>
  );
}
