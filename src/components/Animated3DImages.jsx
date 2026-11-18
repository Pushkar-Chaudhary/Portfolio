import { useState, useEffect, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import standingImage from "../assets/img1.png";
import greetingImage from "../assets/img2.png";
import imageSource from "../lib/imageSource.js";
import "./Animated3DImages.css";

function Animated3DImages() {
  const [isWaving, setIsWaving] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const reducedMotion = useReducedMotion();
  const bubbleTimeout = useRef(null);
  const waveTimeout = useRef(null);

  // Wave occasionally while the avatar is idle.
  useEffect(() => {
    if (reducedMotion) return undefined;

    const interval = setInterval(() => {
      setIsWaving(true);
      waveTimeout.current = setTimeout(() => {
        setIsWaving(false);
      }, 1800);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(waveTimeout.current);
    };
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      clearTimeout(bubbleTimeout.current);
      clearTimeout(waveTimeout.current);
    };
  }, []);

  const triggerInteraction = useCallback(() => {
    setIsWaving(true);
    setShowSpeechBubble(true);

    clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 2400);

    clearTimeout(waveTimeout.current);
    waveTimeout.current = setTimeout(() => {
      setIsWaving(false);
    }, 2400);
  }, []);

  const handlePointerEnter = useCallback((e) => {
    if (e.pointerType === "touch") return;
    setIsWaving(true);
    setShowSpeechBubble(true);
  }, []);

  const handlePointerLeave = useCallback((e) => {
    if (e.pointerType === "touch") return;
    setIsWaving(false);
    setShowSpeechBubble(false);
  }, []);

  return (
    <div className="dev-avatar-stage">
      <button
        className="dev-avatar-container"
        onClick={triggerInteraction}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={() => {
          setIsWaving(true);
          setShowSpeechBubble(true);
        }}
        onBlur={() => {
          setIsWaving(false);
          setShowSpeechBubble(false);
        }}
        type="button"
        aria-label="Pushkar Chaudhary avatar — click or hover to wave"
      >
        {showSpeechBubble && (
          <div className="avatar-greeting">
            <span>Hi there!</span>
          </div>
        )}

        <div className="avatar-frame">
          <img
            className={`avatar-img avatar-standing ${isWaving ? "is-faded" : "is-active"}`}
            src={imageSource(standingImage)}
            alt="Pushkar Chaudhary (@zorocodes)"
            draggable="false"
            fetchPriority="high"
            decoding="async"
          />
          <img
            className={`avatar-img avatar-waving ${isWaving ? "is-active" : "is-faded"}`}
            src={imageSource(greetingImage)}
            alt=""
            draggable="false"
            decoding="async"
          />
        </div>
      </button>
    </div>
  );
}

export default Animated3DImages;
