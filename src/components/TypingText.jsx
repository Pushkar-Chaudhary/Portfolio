import Typed from "typed.js";
import { useEffect, useRef } from "react";

export default function TypingText() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Frontend Developer",
        "UI Designer",
        "Mobile App Developer",
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 180,
      delay: 500,
      loop: true,
      showCursor: true,
    });

    return () => typed.destroy();
  }, []);

  return <span ref={el}></span>;
}