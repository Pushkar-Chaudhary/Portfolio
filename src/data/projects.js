import aafnoKuraPreview from "../assets/projects/aafno-kura-live.png";
import careerSathiPreview from "../assets/projects/career-sathi-live.png";
import sajiloBlogPreview from "../assets/projects/sajilo-blog-live.png";
import sajiloPasalPreview from "../assets/projects/sajilo-pasal.png";
import wishlyPreview from "../assets/projects/wishly.png";
import portfolioPreview from "../assets/projects/portfolio-website.png";
import notesPreview from "../assets/projects/notes-app.png";

const projects = [
  {
    id: "aafno-kura",
    title: "Aafno Kura",
    category: "Full-Stack",
    demo: "https://aafno-kura.vercel.app/",
    github: "https://github.com/Pushkar-Chaudhary/aafno-kura",
    preview: aafnoKuraPreview,
    description:
      "A place to share what’s on your mind and catch up with the community.",
    hero: true,
    tech: ["Node.js", "Express", "EJS", "MongoDB", "REST API"],
    highlights: [
      "Share posts and follow what the community is talking about",
      "Posts and profiles stored in MongoDB",
      "Sign in to post, react, and share media",
      "Works on phones and larger screens",
    ],
    status: "Featured",
    year: "2025",
    showcase: {
      category: "Social platform",
      description:
        "Share an update, see what others are posting, and join the conversation.",
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
      "A career planning app that helps turn your next goal into a practical plan.",
    hero: false,
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    highlights: [
      "Get suggestions shaped around your career goals",
      "Break a career path into steps you can work through",
      "See which skills you already have and which to build next",
      "Gemini requests go through a server-side API",
    ],
    status: "AI project",
    year: "2025",
    showcase: {
      category: "Career guidance",
      description:
        "Think through your next career move and get ideas for what to learn.",
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
      "A simple blog for publishing stories and finding something good to read.",
    hero: false,
    tech: ["React", "Node.js", "Express", "MongoDB"],
    highlights: [
      "A quiet reading layout that keeps the focus on the story",
      "Browse articles by tag or category",
      "Write and publish your own posts",
      "Built with React, Express, and MongoDB",
    ],
    status: "Live App",
    year: "2025",
    showcase: {
      category: "Writing platform",
      description:
        "A place to share a story or find a new point of view.",
      tech: ["React", "Express", "MongoDB"],
    },
  },
  {
    id: "sajilo-pasal",
    title: "Sajilo Pasal",
    category: "E-Commerce",
    demo: "https://sajilo-pasal-tau.vercel.app/",
    preview: sajiloPasalPreview,
    icon: "shoppingCart",
    description:
      "Browse products from independent sellers around Nepal.",
    hero: false,
    tech: ["React"],
    highlights: [
      "Find goods from local sellers",
      "Explore products made and sold in Nepal",
    ],
    status: "Live App",
    year: "2026",
  },
  {
    id: "wishly",
    title: "Wishly",
    category: "Frontend",
    demo: "https://wishly-wish.vercel.app/",
    preview: wishlyPreview,
    icon: "gift",
    description:
      "Make a birthday surprise with a personal note, flowers, and a little confetti.",
    hero: false,
    tech: ["React", "Node.js", "CSS Animations", "Canvas Confetti"],
    highlights: [
      "Write a note and choose the flowers",
      "Share the finished surprise with a link",
      "Small animations and confetti for the celebration",
    ],
    status: "Personal project",
    year: "2026",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Frontend",
    demo: "https://pushkar-chaudhary.vercel.app",
    github: "https://github.com/Pushkar-Chaudhary/Portfolio",
    preview: portfolioPreview,
    icon: "code",
    description:
      "The site you’re on now. I built it with React, Vite, and Tailwind CSS.",
    hero: false,
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Pages built with React and Vite",
      "A layout that adapts to phones and desktops, with light and dark themes",
      "A dashboard for my coding time and GitHub activity",
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
    preview: notesPreview,
    icon: "stickyNote",
    description:
      "A small notes app for jotting things down, finding them quickly, and keeping them in your browser.",
    hero: false,
    tech: ["React", "Tailwind CSS", "LocalStorage API"],
    highlights: [
      "Notes stay saved in your browser, even when you’re offline",
      "Use keyboard shortcuts to add or remove a note",
      "Sort notes at a glance with color labels",
    ],
    status: "Utility",
    year: "2024",
  },
];

export default projects;
