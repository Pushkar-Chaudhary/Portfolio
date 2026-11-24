import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./IntroLoader.css";

// Let normal loads finish without ever covering the page; only show the loader
// when the initial document load is clearly taking longer than usual.
const LOADER_DELAY_MS = 1200;
const LOADER_FAILSAFE_MS = 15000;
const greetings = [
  "Hello",
  "\u0928\u092e\u0938\u094d\u0924\u0947",
  "\u0928\u092e\u0938\u094d\u0915\u093e\u0930",
  "Hola",
  "Bonjour",
  "\u4f60\u597d",
  "\u3053\u3093\u306b\u3061\u306f",
  "\u0645\u0631\u062d\u0628\u064b\u0627",
  "Ol\u00e1",
  "\u09b9\u09cd\u09af\u09be\u09b2\u09cb",
  "Hallo",
  "\uc548\ub155\ud558\uc138\uc694",
  "\u041f\u0440\u0438\u0432\u0435\u0442",
  "Ciao",
  "Merhaba",
  "\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064a\u0643\u0645",
  "Halo",
  "Habari",
];

export default function IntroLoader({ isHome }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    if (document.readyState === "complete") return undefined;

    const failSafeTimer = window.setTimeout(() => setVisible(false), LOADER_FAILSAFE_MS);
    const showTimer = window.setTimeout(() => {
      if (document.readyState !== "complete") setVisible(true);
    }, LOADER_DELAY_MS);
    const hide = () => setVisible(false);
    window.addEventListener("load", hide, { once: true });

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(failSafeTimer);
      window.removeEventListener("load", hide);
    };
  }, []);

  useEffect(() => {
    if (!visible || !isHome) return undefined;
    const greetingTimer = window.setInterval(() => {
      setGreetingIndex((index) => (index + 1) % greetings.length);
    }, reducedMotion ? 1100 : 760);
    return () => window.clearInterval(greetingTimer);
  }, [visible, isHome, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.25 } }}
          role="status"
          aria-label="Loading"
        >
          {isHome ? (
            <motion.span
              key={greetingIndex}
              className="intro-loader__greeting"
              initial={reducedMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              aria-hidden="true"
            >
              {greetings[greetingIndex]}
            </motion.span>
          ) : (
            <span className="intro-loader__spinner" aria-hidden="true" />
          )}
          <span className="intro-loader__progress" aria-hidden="true"><i /></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
