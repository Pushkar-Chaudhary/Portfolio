import { useState, useEffect, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import standingImage from "../assets/img1.png";
import greetingImage from "../assets/img2.png";
import walkingImage from "../assets/img3.png";
import workingImage from "../assets/img4.png";
import imageSource from "../lib/imageSource.js";
import "./Animated3DImages.css";

const animationFrames = [standingImage, greetingImage, walkingImage];

function Animated3DImages() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFinishingInteraction, setIsFinishingInteraction] = useState(false);
  const [touched, setTouched] = useState(false);
  const reducedMotion = useReducedMotion();
  const greetingTimeout = useRef(null);
  const clickTimeout = useRef(null);
  const interactionActive = isHovered || isFocused || isClicked;

  useEffect(() => {
    if (reducedMotion || interactionActive || isFinishingInteraction) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % animationFrames.length);
    }, 650);
    return () => clearInterval(interval);
  }, [reducedMotion, interactionActive, isFinishingInteraction]);

  useEffect(
    () => () => {
      clearTimeout(greetingTimeout.current);
      clearTimeout(clickTimeout.current);
    },
    [],
  );

  const handleTouch = useCallback(() => {
    setTouched(true);
    clearTimeout(greetingTimeout.current);
    greetingTimeout.current = setTimeout(() => {
      setTouched(false);
    }, 2000);
    setIsClicked(true);
    setIsFinishingInteraction(true);
    clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (interactionActive || !isFinishingInteraction) return undefined;
    const timeout = setTimeout(() => setIsFinishingInteraction(false), 750);
    return () => clearTimeout(timeout);
  }, [interactionActive, isFinishingInteraction]);

  const handleInteractionTransitionEnd = (event) => {
    if (event.propertyName === "opacity" && !interactionActive) {
      setIsFinishingInteraction(false);
    }
  };

  return (
    <figure className="dev-avatar-stage">
      <button
        className={[
          "dev-avatar-container",
          interactionActive ? "is-interacting" : "",
          isFinishingInteraction ? "is-finishing-interaction" : "",
        ].filter(Boolean).join(" ")}
        onClick={handleTouch}
        onPointerEnter={() => {
          setIsHovered(true);
          setIsFinishingInteraction(true);
        }}
        onPointerLeave={() => setIsHovered(false)}
        onFocus={() => {
          setIsFocused(true);
          setIsFinishingInteraction(true);
        }}
        onBlur={() => setIsFocused(false)}
        type="button"
        aria-label="Pushkar Chaudhary — hover or click to see him working"
      >
        <div className="avatar-frame">
          {animationFrames.map((image, index) => (
            <img
              key={image}
              className={`avatar-img avatar-animation-frame avatar-animation-frame--${index + 1}${index === currentFrame ? " is-current" : ""}`}
              src={imageSource(image)}
              alt={index === 0 ? "Pushkar Chaudhary" : ""}
              draggable="false"
              fetchPriority={index === 0 ? "high" : undefined}
              decoding="async"
            />
          ))}
          <img
            className="avatar-img avatar-interaction-image"
            src={imageSource(workingImage)}
            alt=""
            draggable="false"
            decoding="async"
            onTransitionEnd={handleInteractionTransitionEnd}
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
