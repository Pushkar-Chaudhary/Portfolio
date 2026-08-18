import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://pushkar-codes.netlify.app";

export default function SEO({ title, description, path = "" }) {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath === "/" ? "" : currentPath}`;

  useEffect(() => {
    // Update Page Title
    if (title) {
      document.title = title;
    }

    // Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);

      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute("content", description);
    }

    // Update Open Graph Title & Twitter Title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", title);

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute("content", title);
    }

    // Update Canonical Link & Open Graph URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

    // Add JSON-LD Structured Data for Person/Portfolio
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Pushkar Chaudhary",
        url: BASE_URL,
        image: `${BASE_URL}/about-me.jpg`,
        jobTitle: "Frontend Developer & Student",
        worksFor: {
          "@type": "Organization",
          name: "Self Employed"
        },
        sameAs: [
          "https://twitter.com/pushkar_chau07",
          "https://github.com/Pushkar-Chaudhary"
        ],
        description: "Frontend Developer from Nepal passionate about creating modern, fast, and responsive web experiences.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "NP",
          addressLocality: "Lahan"
        }
      };
      structuredData.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(structuredData);
    }
  }, [title, description, canonicalUrl]);

  return null;
}
