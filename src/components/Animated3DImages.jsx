import { useState } from "react";
import standingImage from "../assets/img1.png";
import greetingImage from "../assets/img2.png";
import "./Animated3DImages.css";

function Animated3DImages() {
  const [showGreeting, setShowGreeting] = useState(false);

  return (
    <div className="animated3d-stage">
      <button
        type="button"
        className="animated3d-images"
        onClick={() => setShowGreeting((greeting) => !greeting)}
        aria-label={showGreeting ? "Return avatar to standing pose" : "Make avatar say hi"}
        aria-pressed={showGreeting}
      >
        <span className="animated3d-assembly" aria-hidden="true">
          <img
            className={`animated3d-image animated3d-image--standing${showGreeting ? " is-hidden" : ""}`}
            src={standingImage}
            alt=""
            draggable="false"
          />
          <img
            className={`animated3d-image animated3d-image--greeting${showGreeting ? " is-visible" : ""}`}
            src={greetingImage}
            alt=""
            draggable="false"
          />
        </span>
        <span className="animated3d-hint">
          {showGreeting ? "Click me again to wave" : "Click me to say hi"}
        </span>
        <span
          className={`animated3d-speech${showGreeting ? " is-visible" : ""}`}
          aria-live="polite"
        >
          {showGreeting ? "Hi there!" : ""}
        </span>
      </button>
    </div>
  );
}

export default Animated3DImages;
