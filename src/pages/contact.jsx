import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaCheck,
  FaCopy,
  FaPaperPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SEO from "../components/SEO.jsx";

const socialChannels = [
  {
    name: "GitHub",
    handle: "@Pushkar-Chaudhary",
    url: "https://github.com/Pushkar-Chaudhary",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    handle: "@pushkar-chy",
    url: "https://www.linkedin.com/in/pushkar-chy/",
    icon: <FaLinkedin />,
  },
  {
    name: "X (Twitter)",
    handle: "@pushkar_chau07",
    url: "https://x.com/pushkar_chau07",
    icon: <FaXTwitter />,
  },
  {
    name: "Instagram",
    handle: "@pushkar.chau",
    url: "https://www.instagram.com/pushkar.chau/",
    icon: <FaInstagram />,
  },
];

const DIRECT_EMAIL = "pushkarchaudhary256@gmail.com";

function Contact() {
  const [submissionState, setSubmissionState] = useState("idle"); // idle | sending | sent | error
  const [copiedEmail, setCopiedEmail] = useState(false);
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.45, ease: "easeOut" },
      };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(DIRECT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
        throw new Error("Form submission rejected");
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
        description="Connect with Pushkar Chaudhary regarding engineering opportunities, freelance projects, or web development."
        path="/contact"
      />

      <main className="page-stack">
        {/* Header */}
        <motion.header className="contact-header-section" {...revealProps}>
          <span className="section-kicker">Get In Touch</span>
          <h1 className="section-title">Let&apos;s build something exceptional.</h1>
          <p className="lead">
            Feel free to reach out directly via email, social channels, or the contact form below. I typically respond within 24 hours.
          </p>

          <div className="direct-email-strip">
            <span className="direct-email-label">Direct Email:</span>
            <a href={`mailto:${DIRECT_EMAIL}`} className="direct-email-link">
              <FaEnvelope aria-hidden="true" /> {DIRECT_EMAIL}
            </a>
            <button
              type="button"
              className="copy-email-btn"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
            >
              {copiedEmail ? (
                <>
                  <FaCheck aria-hidden="true" style={{ color: "var(--accent)" }} /> Copied
                </>
              ) : (
                <>
                  <FaCopy aria-hidden="true" /> Copy
                </>
              )}
            </button>
          </div>
        </motion.header>

        {/* Channels Grid */}
        <motion.section className="social-channels-section" {...revealProps}>
          <h2 className="section-subtitle">Verified Channels</h2>
          <div className="channels-grid">
            {socialChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                className="channel-card"
              >
                <span className="channel-icon" aria-hidden="true">
                  {channel.icon}
                </span>
                <div className="channel-meta">
                  <span className="channel-name">{channel.name}</span>
                  <span className="channel-handle">{channel.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Minimal Message Form */}
        <motion.section className="contact-form-section" {...revealProps}>
          <div className="section-header">
            <span className="section-kicker">Direct Note</span>
            <h2 className="section-subtitle">Send a message</h2>
          </div>

          <form
            action="https://formspree.io/f/xwvnoegw"
            method="POST"
            className="clean-contact-form"
            onSubmit={handleSubmit}
            aria-busy={submissionState === "sending"}
          >
            <div className="form-grid-two">
              <div className="clean-field">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Jane Doe"
                  required
                />
              </div>

              <div className="clean-field">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="_replyto"
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            <div className="clean-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project, timeline, or idea..."
                rows="5"
                required
              />
            </div>

            <div className="form-submit-row">
              <button
                type="submit"
                className="btn-primary"
                disabled={submissionState === "sending"}
              >
                {submissionState === "sending" ? (
                  "Sending message..."
                ) : (
                  <>
                    Send Message <FaPaperPlane aria-hidden="true" />
                  </>
                )}
              </button>

              {submissionState !== "idle" && (
                <p
                  className={`submit-feedback feedback-${submissionState}`}
                  role={submissionState === "error" ? "alert" : "status"}
                  aria-live={submissionState === "error" ? "assertive" : "polite"}
                >
                  {submissionState === "sent"
                    ? "✓ Thank you. Your message has been sent successfully."
                    : submissionState === "error"
                    ? "✕ Delivery failed. Please email pushkarchaudhary256@gmail.com directly."
                    : "Connecting to mail server..."}
                </p>
              )}
            </div>
          </form>
        </motion.section>
      </main>
    </div>
  );
}

export default Contact;