import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Home from "./views/Home.jsx";
import About from "./views/About.jsx";
import Projects from "./views/Projects.jsx";
import Contact from "./views/Contact.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Guestbook from "./views/Guestbook.jsx";
import IntroLoader from "./components/IntroLoader.jsx";

const pages = {
  "/": {
    title: "Pushkar Chaudhary (@zorocodes) | Aspiring Full-Stack Developer",
    description: "I’m Pushkar, an aspiring full-stack developer and BCA student in Itahari, Nepal. I build web applications with the MERN stack.",
    Component: Home,
  },
  "/about": {
    title: "About | Pushkar Chaudhary (@zorocodes) - Developer & Designer",
    description: "A little about Pushkar: what he’s learning, the tools he uses, and his path into web development.",
    Component: About,
  },
  "/projects": {
    title: "Projects | Pushkar Chaudhary (@zorocodes) - Things I’ve Made",
    description: "Websites and small apps Pushkar has built, from a community feed to a career planning tool.",
    Component: Projects,
  },
  "/contact": {
    title: "Contact | Pushkar Chaudhary (@zorocodes) - Get in Touch",
    description: "Want to talk about a project or just say hello? Here’s how to get in touch with Pushkar.",
    Component: Contact,
  },
  "/dashboard": {
    title: "Dashboard | Pushkar Chaudhary (@zorocodes) - Coding Activity",
    description: "A look at Pushkar’s recent coding time and GitHub contributions.",
    Component: Dashboard,
  },
  "/guestbook": {
    title: "Guestbook | Pushkar Chaudhary (@zorocodes)",
    description: "Leave a message in Pushkar’s guestbook. Sign in with Google or GitHub to post.",
    Component: Guestbook,
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
        jobTitle: "Aspiring Full-Stack Developer",
        description: "Pushkar Chaudhary (@zorocodes) is an aspiring full-stack developer and BCA student from Itahari, Nepal. He builds full-stack web applications with the MERN stack: MongoDB, Express.js, React, and Node.js.",
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
        description: "Web projects by Pushkar Chaudhary (@zorocodes), an aspiring full-stack developer and BCA student in Itahari, Nepal.",
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
      <IntroLoader isHome={currentPath === "/"} />
      <Navbar activePath={currentPath} />
      <div className="app-shell">
        <Page />
        <Footer isHome={currentPath === "/"} />
      </div>
      <CustomCursor />
    </>
  );
}
