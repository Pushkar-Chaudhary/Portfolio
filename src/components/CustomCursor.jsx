import { useEffect, useRef, useState } from "react";

const isFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function CustomCursor() {
  const cursorRef = useRef(null);
  const latestPosition = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    if (!isFinePointer()) return undefined;

    const handlePointerMove = (event) => {
      latestPosition.current = { x: event.clientX, y: event.clientY };

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(() => {
          const cursor = cursorRef.current;
          if (!cursor) return;

          cursor.style.setProperty("--cursor-x", `${latestPosition.current.x}px`);
          cursor.style.setProperty("--cursor-y", `${latestPosition.current.y}px`);
          cursor.classList.add("is-visible");
          frameRef.current = 0;
        });
      }
    };

    const handlePointerLeave = () => {
      cursorRef.current?.classList.remove("is-visible");
    };
    const handlePointerOver = (event) => {
      const target = event.target;
      const interactive = target instanceof Element && target.closest(
        "a, button, .project-card, .social-link, .tech-list span, input, textarea"
      );

      if (!interactive) {
        setVariant("default");
        return;
      }

      if (interactive.classList.contains("project-card")) {
        setVariant("project");
        return;
      }

      setVariant("interactive");
    };

    const handlePointerOut = (event) => {
      if (!(event.relatedTarget instanceof Element)) {
        setVariant("default");
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  if (!isFinePointer()) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor cursor-${variant}`}
      aria-hidden="true"
    />
  );
}

export default CustomCursor;
