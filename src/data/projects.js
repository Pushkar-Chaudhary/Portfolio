import aafnoKuraPreview from "../assets/projects/aafno-kura.png";
import careerSathiPreview from "../assets/projects/career-sathi.png";
import sajiloBlogPreview from "../assets/projects/sajilo-blog.png";

const projects = [
  {
    id: "aafno-kura",
    title: "Aafno Kura",
    category: "Full-Stack",
    demo: "https://aafno-kura.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/aafno-kura",
    preview: aafnoKuraPreview,
    description:
      "A complete social platform featuring public community feeds, user post publishing, dynamic interactions, and responsive multi-device design.",
    hero: true,
    tech: ["Node.js", "Express", "EJS", "MongoDB", "REST API"],
    highlights: [
      "Dynamic feed with real-time updates and post creation",
      "Robust MongoDB database schema with Mongoose models",
      "Session-based user interactions and media support",
      "Fully responsive design optimized for mobile and desktop screens",
    ],
    status: "Featured",
    year: "2025",
    showcase: {
      category: "Social platform",
      description:
        "A place to share updates, follow a public feed, and manage posts.",
      tech: ["Node.js", "Express", "MongoDB"],
    },
  },
  {
    id: "career-sathi",
    title: "Career Sathi",
    category: "AI & Gemini",
    demo: "https://career-sathii.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/career-sathi",
    preview: careerSathiPreview,
    description:
      "An AI-powered career counseling platform integrating Google Gemini API to analyze user goals, recommend actionable roadmaps, and assess skill gaps.",
    hero: false,
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    highlights: [
      "Context-aware AI career counseling using Gemini Flash model",
      "Interactive step-by-step career path visualization",
      "Dynamic skill assessments and actionable feedback",
      "Secure backend proxy to protect API tokens and manage rate limits",
    ],
    status: "AI Powered",
    year: "2025",
    showcase: {
      category: "Career guidance",
      description:
        "A career guidance app bringing practical tools and Gemini-powered features together.",
      tech: ["React", "Node.js", "Gemini API"],
    },
  },
  {
    id: "sajilo-blog",
    title: "Sajilo Blog",
    category: "Full-Stack",
    demo: "https://sajiloblog.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/sajilo-blog",
    preview: sajiloBlogPreview,
    description:
      "A fast, distraction-free blog engine and writing space designed for clean readability, seamless article creation, and optimized loading.",
    hero: false,
    tech: ["React", "Node.js", "Express", "MongoDB"],
    highlights: [
      "Minimalist reader UI with typography fine-tuned for legibility",
      "Fast database querying with MongoDB indexing",
      "Article tagging and category sorting engine",
      "Lightweight bundle size with rapid initial paint",
    ],
    status: "Live App",
    year: "2025",
    showcase: {
      category: "Writing platform",
      description:
        "A simple space for sharing thoughts and experiences through the web.",
      tech: ["React", "Express", "MongoDB"],
    },
  },
  {
    id: "sajilo-pasal",
    title: "Sajilo Pasal",
    category: "E-Commerce",
    demo: "https://sajilo-pasal-tau.vercel.app/",
    preview: null,
    icon: "shoppingCart",
    description:
      "A local shopping platform featuring thoughtfully selected products from sellers across Nepal.",
    hero: false,
    tech: ["React"],
    highlights: [
      "Shop products from local sellers across Nepal",
      "Discover thoughtfully selected products",
    ],
    status: "Live App",
    year: "2026",
  },
  {
    id: "wishly",
    title: "Wishly",
    category: "Frontend",
    demo: "https://wishly-wish.vercel.app/",
    preview: null,
    icon: "gift",
    description:
      "An interactive birthday wishing experience made with vibe-coding, celebratory animations, customized greeting flows, and sound effects.",
    hero: false,
    tech: ["React", "Node.js", "CSS Animations", "Canvas Confetti"],
    highlights: [
      "Custom celebratory sound effects and full-screen confetti cascades",
      "Interactive greeting generator with shareable URLs",
      "Playful micro-interactions with smooth easing curves",
    ],
    status: "Vibe Coded",
    year: "2026",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Frontend",
    demo: "https://pushkar-chaudhary.vercel.app",
    github: "https://github.com/Pushkar-Chaudhary/Portfolio",
    preview: null,
    icon: "code",
    description:
      "My personal digital garden featuring 3D tilt mechanics, accessible light/dark modes, real-time GitHub telemetry, and smooth route transitions.",
    hero: false,
    tech: ["React 19", "Tailwind CSS", "Vite", "Framer Motion"],
    highlights: [
      "Bespoke custom cursor with element-specific magnetic states",
      "Live GitHub commit calendar sync with error-resilient fallbacks",
      "100% responsive fluid typography and micro-interactions",
    ],
    status: "Active",
    year: "2026",
  },
  {
    id: "notes-app",
    title: "Notes App",
    category: "Frontend",
    demo: "https://notes-app-kappa-ruby-64.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/notes",
    preview: null,
    icon: "stickyNote",
    description:
      "A lightweight, distraction-free notepad designed for quick capture, search-as-you-type filtering, and zero-latency local storage sync.",
    hero: false,
    tech: ["React", "Tailwind CSS", "LocalStorage API"],
    highlights: [
      "Instant offline persistence with zero setup needed",
      "Quick keyboard shortcuts for note creation and deletion",
      "Clean visual cards with color categorization",
    ],
    status: "Utility",
    year: "2024",
  },
];

export default projects;
