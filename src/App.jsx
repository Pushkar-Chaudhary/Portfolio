import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Home from "./views/Home.jsx";
import About from "./views/About.jsx";
import Projects from "./views/Projects.jsx";
import Contact from "./views/Contact.jsx";
import Dashboard from "./views/Dashboard.jsx";

const pages = {
  "/": {
    title: "Pushkar Chaudhary (@zorocodes) | Developer & Designer",
    description: "Pushkar Chaudhary (@zorocodes) — Full-stack developer and BCA student from Itahari, Nepal. Crafting minimal, performant web applications with React, Node.js, and TypeScript.",
    Component: Home,
  },
  "/about": {
    title: "About | Pushkar Chaudhary (@zorocodes) - Developer & Designer",
    description: "Learn about Pushkar Chaudhary (@zorocodes), a full-stack developer and designer based in Itahari, Nepal. Technical skill stack, background, and timeline.",
    Component: About,
  },
  "/projects": {
    title: "Projects | Pushkar Chaudhary (@zorocodes) - Work & Experiments",
    description: "Explore web development projects, full-stack applications, and experiments created by Pushkar Chaudhary (@zorocodes).",
    Component: Projects,
  },
  "/contact": {
    title: "Contact | Pushkar Chaudhary (@zorocodes) - Get in Touch",
    description: "Connect with Pushkar Chaudhary (@zorocodes) regarding engineering opportunities, freelance collaborations, or design inquiries.",
    Component: Contact,
  },
  "/dashboard": {
    title: "Dashboard | Pushkar Chaudhary (@zorocodes) - Telemetry & Analytics",
    description: "Live telemetry, GitHub contribution calendar, and WakaTime coding activity for Pushkar Chaudhary (@zorocodes).",
    Component: Dashboard,
  },
};

const siteUrl = "https://pushkarchaudhary.com.np";

function updateMeta(path, page) {
  const pageUrl = new URL(path, siteUrl).toString();
  document.title = page.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", pageUrl);
  for (const selector of ['meta[property="og:url"]', 'meta[name="twitter:url"]']) {
    document.querySelector(selector)?.setAttribute("content", pageUrl);
  }
  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
    document.querySelector(selector)?.setAttribute("content", page.title);
  }
  for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    document.querySelector(selector)?.setAttribute("content", page.description);
  }

  const personId = `${siteUrl}/#person`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Pushkar Chaudhary (@zorocodes)",
        alternateName: ["@zorocodes", "Pushkar Chaudhary", "Pushkar", "zorocodes"],
        url: siteUrl,
        image: `${siteUrl}/fav.png`,
        jobTitle: "Full-Stack Web Developer & Designer",
        description: "Pushkar Chaudhary (@zorocodes) is a web developer and BCA student from Itahari, Nepal, building modern, minimal, and high-performance applications with React, Node.js, and TypeScript.",
        address: { "@type": "PostalAddress", addressLocality: "Itahari", addressCountry: "NP" },
        email: "pushkarchaudhary256@gmail.com",
        sameAs: ["https://github.com/Pushkar-Chaudhary", "https://www.linkedin.com/in/pushkar-chy/", "https://x.com/pushkar_chau07", "https://www.instagram.com/pushkar.chau/"],
        knowsAbout: ["Web Development", "Frontend Development", "React", "JavaScript", "TypeScript", "HTML5", "CSS3", "UI/UX Design", "Figma"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Pushkar Chaudhary (@zorocodes) Portfolio",
        description: "Projects and engineering portfolio of Pushkar Chaudhary (@zorocodes), web developer and designer in Itahari, Nepal.",
        publisher: { "@id": personId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": personId },
        inLanguage: "en-US",
      },
    ],
  };
  let schema = document.querySelector('script[type="application/ld+json"]');
  if (!schema) {
    schema = document.createElement("script");
    schema.type = "application/ld+json";
    document.head.append(schema);
  }
  schema.textContent = JSON.stringify(structuredData);
}

export default function App() {
  const currentPath = window.location.pathname === "/home" ? "/" : window.location.pathname;
  const page = pages[currentPath] || pages["/"];
  const Page = page.Component;

  useEffect(() => {
    updateMeta(currentPath, page);
  }, [currentPath, page]);

  return (
    <>
      <Navbar activePath={currentPath} />
      <div className="app-shell">
        <Page />
        <Footer isHome={currentPath === "/"} />
      </div>
      <CustomCursor />
    </>
  );
}
