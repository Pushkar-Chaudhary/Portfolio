import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import TiltCard from "../components/TiltCard.jsx";

const socialLinks = [
  {
    icon: "fab fa-instagram",
    url: "https://www.instagram.com/pushkar.chau/",
    label: "Instagram",
  },
  {
    icon: "fab fa-x-twitter",
    url: "https://x.com/pushkar_chau07",
    label: "X",
  },
  {
    icon: "fab fa-github",
    url: "https://github.com/Pushkar-Chaudhary",
    label: "GitHub",
  },
  {
    icon: "fab fa-linkedin",
    url: "https://www.linkedin.com/in/anik-chy/",
    label: "LinkedIn",
  },
];

function Contact() {
  const [submissionState, setSubmissionState] = useState("idle");
  const reducedMotion = useReducedMotion();
  const revealProps = reducedMotion
    ? {
        initial: false,
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionState("sending");
    const form = event.currentTarget;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("The contact service did not accept the message.");
      }

      form.reset();
      setSubmissionState("sent");
    } catch {
      setSubmissionState("error");
    }
  };

  return (
    <div className="page-shell page-shell--narrow">
      <SEO
        title="Contact | Pushkar Chaudhary - Get in Touch"
        description="Connect with Pushkar Chaudhary via email or social channels (GitHub, LinkedIn, Instagram, X)."
        path="/contact"
      />

      <main className="page-stack">
        <TiltCard
          as={motion.section}
          className="content-card contact-card contact-card--intro"
          {...revealProps}
        >
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">Let’s build something simple.</h1>
          <p className="lead">
            You can reach me through social media or send a message below.
          </p>

          <ul className="social-list">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  className="social-link"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        </TiltCard>

        <TiltCard
          as={motion.section}
          className="content-card contact-card"
          {...revealProps}
        >
          <div className="section-header">
            <p className="eyebrow">Message</p>
            <h2>Send a quick note</h2>
          </div>

          <form
            action="https://formspree.io/f/xwvnoegw"
            method="POST"
            className="contact-form"
            onSubmit={handleSubmit}
            aria-busy={submissionState === "sending"}
          >
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="_replyto"
                placeholder="Your email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="I would like to say..."
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="button button-primary"
              disabled={submissionState === "sending"}
            >
              {submissionState === "sending" ? "Sending..." : "Send message"}
            </button>
            {submissionState !== "idle" && (
              <p
                className={`form-feedback form-feedback--${submissionState}`}
                role={submissionState === "error" ? "alert" : "status"}
                aria-live={submissionState === "error" ? "assertive" : "polite"}
              >
                {submissionState === "sent"
                  ? "Thanks for reaching out. Your message has been sent."
                  : submissionState === "error"
                    ? "Your message could not be sent. Please try again or email me directly below."
                    : "Sending your message..."}
              </p>
            )}
          </form>

          <p className="muted-text">Or email me directly:</p>
          <a
            className="contact-email"
            href="mailto:pushkarchaudhary256@gmail.com"
          >
            pushkarchaudhary256@gmail.com
          </a>
        </TiltCard>
      </main>
    </div>
  );
}

export default Contact;