import { useState } from "react";
import standingImage from "../assets/img1.png";
import greetingImage from "../assets/img2.png";
import "./Animated3DImages.css";

function Animated3DImages() {
  const [isWaving, setIsWaving] = useState(false);

  return (
    <div className="dev-avatar-stage">
      <div
        className="dev-avatar-container"
        onMouseEnter={() => setIsWaving(true)}
        onMouseLeave={() => setIsWaving(false)}
        onClick={() => setIsWaving((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsWaving((prev) => !prev);
          }
        }}
        aria-label="Pushkar Chaudhary developer avatar"
      >
        <div className="avatar-frame">
          <img
            className={`avatar-img avatar-standing${isWaving ? " is-faded" : ""}`}
            src={standingImage}
            alt="Pushkar Chaudhary"
            draggable="false"
          />
          <img
            className={`avatar-img avatar-waving${isWaving ? " is-active" : ""}`}
            src={greetingImage}
            alt="Pushkar waving"
            draggable="false"
          />
        </div>

        <div className="avatar-meta-bar">
          <span className="avatar-status-dot" />
          <span className="avatar-status-text">
            {isWaving ? "Hello! Welcome to my portfolio" : "Hover or tap avatar to wave"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Animated3DImages;
