import Typed from "typed.js";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function TypingText() {
  const el = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const typed = new Typed(el.current, {
      strings: [
        "Web developer",
        "BCA student",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 400,
      loop: true,
      showCursor: false,
      smartBackspace: true,
    });

    return () => typed.destroy();
  }, [reducedMotion]);

  return (
    <span className="typing-role" ref={el}>
      {reducedMotion ? "Web developer" : null}
    </span>
  );
}
