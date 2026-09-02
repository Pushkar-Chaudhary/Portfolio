import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://pushkar-chaudhary.vercel.app";

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

    // Keep structured data aligned with the page during client-side navigation.
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          name: "Pushkar Chaudhary",
          url: BASE_URL,
          image: `${BASE_URL}/og-image.png`,
          jobTitle: "Frontend Developer",
          description: "Frontend developer and science student from Nepal specializing in HTML, CSS, JavaScript, and React.",
          sameAs: [
            "https://github.com/Pushkar-Chaudhary",
            "https://www.linkedin.com/in/anik-chy/",
            "https://x.com/pushkar_chau07",
            "https://www.instagram.com/nvm.pushkarr/"
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lahan",
            addressCountry: "NP"
          }
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          isPartOf: { "@id": `${BASE_URL}/#website` },
          about: { "@id": `${BASE_URL}/#person` },
          inLanguage: "en-US"
        }
      ]
    };
    structuredData.textContent = JSON.stringify(jsonLd);
  }, [title, description, canonicalUrl]);

  return null;
}
