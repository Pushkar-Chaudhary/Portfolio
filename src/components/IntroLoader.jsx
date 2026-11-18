import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./IntroLoader.css";

const greetings = [
  { language: "English", text: "Hello, I’m Pushkar" },
  { language: "नेपाली", text: "नमस्ते, म पुष्कर हुँ" },
  { language: "हिन्दी", text: "नमस्ते, मैं पुष्कर हूँ" },
  { language: "Español", text: "Hola, soy Pushkar" },
  { language: "Français", text: "Bonjour, je suis Pushkar" },
  { language: "中文", text: "你好，我是 Pushkar" },
  { language: "日本語", text: "こんにちは、Pushkar です" },
  { language: "العربية", text: "مرحبًا، أنا Pushkar" },
  { language: "Português", text: "Olá, eu sou Pushkar" },
  { language: "বাংলা", text: "নমস্কার, আমি পুষ্কর" },
  { language: "Deutsch", text: "Hallo, ich bin Pushkar" },
  { language: "한국어", text: "안녕하세요, 저는 Pushkar입니다" },
  { language: "Русский", text: "Привет, я Pushkar" },
  { language: "Italiano", text: "Ciao, sono Pushkar" },
  { language: "Türkçe", text: "Merhaba, ben Pushkar" },
  { language: "اردو", text: "السلام علیکم، میں Pushkar ہوں" },
  { language: "Bahasa Indonesia", text: "Halo, saya Pushkar" },
  { language: "Kiswahili", text: "Habari, mimi ni Pushkar" },
];

const INTRO_KEY = "pushkar-intro-seen";

export default function IntroLoader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(INTRO_KEY);
    } catch {
      return true;
    }
  });
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;

    const markSeen = () => {
      try {
        sessionStorage.setItem(INTRO_KEY, "true");
      } catch {
        // The intro still works when browser storage is unavailable.
      }
      setVisible(false);
    };

    if (!reducedMotion) {
      const greetingTimer = window.setInterval(() => {
        setGreetingIndex((index) => (index + 1) % greetings.length);
      }, 650);
      const dismissTimer = window.setTimeout(markSeen, 4200);
      return () => {
        window.clearInterval(greetingTimer);
        window.clearTimeout(dismissTimer);
      };
    }

    const dismissTimer = window.setTimeout(markSeen, 900);
    return () => window.clearTimeout(dismissTimer);
  }, [visible, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.45 } }}
          aria-label="Welcome to Pushkar’s portfolio"
        >
          <div className="intro-loader__content">
            <div className="intro-loader__greeting" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.p
                  key={greetingIndex}
                  dir="auto"
                  initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -12, filter: "blur(5px)" }}
                  transition={{ duration: 0.45 }}
                >
                  {greetings[greetingIndex].text}
                </motion.p>
              </AnimatePresence>
            </div>
            <span className="intro-loader__language" aria-hidden="true">
              {greetings[greetingIndex].language}
            </span>
            <span className="intro-loader__progress" aria-hidden="true"><i /></span>
            <span className="sr-only" role="status">Hello, I’m Pushkar. Welcome to my portfolio.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
