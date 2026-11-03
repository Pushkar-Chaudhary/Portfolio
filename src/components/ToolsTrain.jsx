import "./ToolsTrain.css";

const tools = [
  "React",
  "Astro",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Gemini API",
  "Git",
  "GitHub",
  "Vercel",
  "Vite",
];

function ToolList({ copy = false }) {
  return (
    <ul className="tools-train-set" aria-hidden={copy || undefined}>
      {tools.map((tool) => <li key={tool}>{tool}</li>)}
    </ul>
  );
}

export default function ToolsTrain() {
  return (
    <section className="tools-train" aria-label="Technologies I work with">
      <header className="tools-train-heading">
        <div>
          <h2 className="tools-train-title">Tools I use</h2>
        </div>
      </header>
      <div
        className="tools-train-window"
        role="region"
        aria-label="Scrolling list of development tools"
        tabIndex={0}
      >
        <div className="tools-train-track">
          <ToolList />
          <ToolList copy />
        </div>
      </div>
    </section>
  );
}
