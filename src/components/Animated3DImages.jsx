import { useEffect, useState } from "react";
import standingImage from "../assets/img1.png";
import greetingImage from "../assets/img2.png";
import "./Animated3DImages.css";

function Animated3DImages() {
  const [showGreeting, setShowGreeting] = useState(false);
  const [isCarRunning, setIsCarRunning] = useState(true);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return undefined;

    const intervalId = window.setInterval(() => {
      setShowGreeting((current) => !current);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    setShowGreeting((current) => !current);
  };

  return (
    <div className="animated3d-stage">
      <button
        type="button"
        className="animated3d-images"
        onClick={handleClick}
        aria-label={`Change illustration pose; currently showing the ${showGreeting ? "greeting" : "standing"} pose`}
        aria-pressed={showGreeting}
        aria-description="Click to switch the illustration pose."
      >
        <span className="animated3d-content" aria-hidden="true">
          <span className="animated3d-scene">
            <span className={`animated3d-assembly${showGreeting ? " is-greeting" : ""}`}>
              <img
                className="animated3d-image animated3d-image--standing"
                src={standingImage}
                alt=""
                draggable="false"
              />
              <img
                className="animated3d-image animated3d-image--greeting"
                src={greetingImage}
                alt=""
                draggable="false"
              />
            </span>
          </span>
        </span>
      </button>
      <div className="animated3d-car-track">
        <span
          className={`animated3d-rc-car${isCarRunning ? " is-running" : ""}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 180 94" fill="none">
            <ellipse cx="91" cy="81" rx="67" ry="6" fill="currentColor" opacity=".12" />
            <g className="animated3d-wheel">
              <circle cx="54" cy="67" r="14" fill="var(--primary)" />
              <circle cx="54" cy="67" r="5" fill="var(--surface-strong)" />
              <path d="M54 56v6m0 10v6m-11-11h6m10 0h6m-19-8 4 4m8 8 4 4m0-16-4 4m-8 8-4 4" stroke="var(--surface-strong)" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g className="animated3d-wheel">
              <circle cx="125" cy="67" r="14" fill="var(--primary)" />
              <circle cx="125" cy="67" r="5" fill="var(--surface-strong)" />
              <path d="M125 56v6m0 10v6m-11-11h6m10 0h6m-19-8 4 4m8 8 4 4m0-16-4 4m-8 8-4 4" stroke="var(--surface-strong)" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g className="animated3d-car-body">
              <path d="M27 59h14l14-20c4-6 10-9 18-9h38c12 0 22 6 29 16l9 13h12v10h-18a17 17 0 0 0-34 0H68a17 17 0 0 0-34 0H21v-6c0-2 2-4 6-4Z" fill="var(--accent)" stroke="var(--primary)" strokeOpacity=".18" strokeWidth="2" strokeLinejoin="round" />
              <path d="m64 39-11 16h36V35H72c-3 0-6 1-8 4Zm30-4v20h38l-6-8c-6-8-14-12-23-12H94Z" fill="var(--surface-strong)" opacity=".82" />
              <path d="M145 58h10l5 7h-10l-5-7ZM23 53h9v5h-9z" fill="var(--primary)" />
              <path d="m119 30 12-18" stroke="var(--primary)" strokeLinecap="round" strokeWidth="2" />
              <circle cx="132" cy="10" r="3" fill="var(--accent)" />
            </g>
          </svg>
        </span>
      </div>
      <button
        type="button"
        className="animated3d-car-button"
        onClick={() => setIsCarRunning((running) => !running)}
        aria-label={isCarRunning ? "Stop remote-control car" : "Start remote-control car"}
        aria-pressed={isCarRunning}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {isCarRunning ? (
            <path d="M5 3.5h2.2v9H5zm3.8 0H11v9H8.8z" fill="currentColor" />
          ) : (
            <path d="M5 3.2v9.6L12.4 8 5 3.2Z" fill="currentColor" />
          )}
        </svg>
      </button>
    </div>
  );
}

export default Animated3DImages;
