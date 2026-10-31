import Typed from "typed.js";
import { useEffect, useRef } from "react";

export default function TypingText() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Developer",
        "BCA Student",
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
  }, []);

  return <span className="typing-role" ref={el} />;
}
