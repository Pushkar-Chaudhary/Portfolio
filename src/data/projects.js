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
      "A community feed for sharing posts and responding to other users.",
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
      "Turns career goals into roadmaps and skill-gap assessments with Gemini.",
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
        "Explore career paths and identify skills to work on with Gemini.",
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
      "A place to publish articles and browse posts by tag or category.",
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
      "A local shopping app for browsing products from sellers across Nepal.",
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
      "An animated birthday greeting with a few ways to personalize and share it.",
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
      "My portfolio, built with Astro and React.",
    hero: false,
    tech: ["Astro", "React", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Server-rendered pages with interactive React components",
      "Responsive layouts and light/dark themes",
      "WakaTime and GitHub activity on the dashboard",
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
