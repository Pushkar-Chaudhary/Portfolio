import SEO from "../components/SEO.jsx";

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
  return (
    <div className="page-shell page-shell--narrow">
      <SEO
        title="Contact | Pushkar Chaudhary - Get in Touch"
        description="Connect with Pushkar Chaudhary via email or social channels (GitHub, LinkedIn, Instagram, X)."
        path="/contact"
      />

      <main className="page-stack">
        <section className="content-card">
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
        </section>

        <section className="content-card">
          <div className="section-header">
            <p className="eyebrow">Message</p>
            <h2>Send a quick note</h2>
          </div>

          <form
            action="https://formspree.io/f/xwvnoegw"
            method="POST"
            className="contact-form"
          >
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                required
                aria-label="Your name"
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
                aria-label="Your email address"
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
                aria-label="Your message"
              ></textarea>
            </div>

            <button type="submit" className="button button-primary">
              Send message
            </button>
          </form>

          <p className="muted-text">Or email me directly:</p>
          <a
            className="contact-email"
            href="mailto:pushkarchaudhary256@gmail.com"
          >
            pushkarchaudhary256@gmail.com
          </a>
        </section>
      </main>
    </div>
  );
}

export default Contact;