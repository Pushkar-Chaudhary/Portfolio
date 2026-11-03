import { useState, useEffect, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import standingImage from "../assets/img1.png";
import greetingImage from "../assets/img2.png";
import imageSource from "../lib/imageSource.js";
import "./Animated3DImages.css";

function Animated3DImages() {
  const [isWaving, setIsWaving] = useState(false);
  const [touched, setTouched] = useState(false);
  const reducedMotion = useReducedMotion();
  const greetingTimeout = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const interval = setInterval(() => {
      setIsWaving((prev) => !prev);
    }, 3600);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => () => clearTimeout(greetingTimeout.current), []);

  const handleTouch = useCallback(() => {
    setTouched(true);
    setIsWaving(true);
    clearTimeout(greetingTimeout.current);
    greetingTimeout.current = setTimeout(() => {
      setTouched(false);
    }, 2000);
  }, []);

  return (
    <figure className="dev-avatar-stage">
      <button
        className="dev-avatar-container"
        onClick={handleTouch}
        type="button"
        aria-label={isWaving ? "Pushkar Chaudhary waving" : "Pushkar Chaudhary — click to wave"}
      >
        <div className="avatar-frame">
          <img
            className={`avatar-img avatar-standing${isWaving ? " is-faded" : ""}`}
            src={imageSource(standingImage)}
            alt="Pushkar Chaudhary"
            draggable="false"
            fetchPriority="high"
            decoding="async"
          />
          <img
            className={`avatar-img avatar-waving${isWaving ? " is-active" : ""}`}
            src={imageSource(greetingImage)}
            alt=""
            draggable="false"
            decoding="async"
          />
        </div>

        {touched && (
          <span className="avatar-greeting">Namaste, I&apos;m Pushkar.</span>
        )}
      </button>
      <figcaption className="avatar-caption">Frontend developer <span>·</span> Nepal</figcaption>
    </figure>
  );
}

export default Animated3DImages;
