import { useState, useEffect, useCallback } from "react";
import standingImage from "../assets/img1.png";
import greetingImage from "../assets/img2.png";
import "./Animated3DImages.css";

function Animated3DImages() {
  const [isWaving, setIsWaving] = useState(false);
  const [touched, setTouched] = useState(false);

  // Auto-cycle every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTouch = useCallback(() => {
    setTouched(true);
    setIsWaving(true);
    setTimeout(() => {
      setTouched(false);
    }, 2000);
  }, []);

  return (
    <div className="dev-avatar-stage">
      <div
        className="dev-avatar-container"
        onClick={handleTouch}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleTouch();
        }}
        aria-label="Developer avatar — tap to wave"
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

        {touched && (
          <span className="avatar-greeting">Hi there! 👋</span>
        )}
      </div>
    </div>
  );
}

export default Animated3DImages;
