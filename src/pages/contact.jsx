import Navbar from "../components/Navbar.jsx";
import SEO from "../components/SEO.jsx";

const socialLinks = [
  {
    icon: "fab fa-instagram",
    url: "https://www.instagram.com/nvm.pushkarr/",
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
    <>
      <SEO
        title="Contact | Pushkar Chaudhary - Get in Touch"
        description="Connect with Pushkar Chaudhary via email or social channels (GitHub, LinkedIn, Instagram, X)."
        path="/contact"
      />
      <Navbar />

      <div className="container">
        <div className="social-info">
          <h2>Connect With Me.</h2>

          <p>You can contact me from the following options:</p>

          <ul className="wrapper">
            {socialLinks.map((social, index) => (
              <span key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              </span>
            ))}
          </ul>
        </div>

        <div className="contact-form">
          <h2>Or Send Me a Message.</h2>

          <form
            action="https://formspree.io/f/xwvnoegw"
            method="POST"
            className="form"
          >
            <fieldset>
              <legend>Contact</legend>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                name="_replyto"
                placeholder="Your Email"
                required
              />
            </fieldset>

            <fieldset>
              <legend>Your Message</legend>

              <textarea
                name="message"
                placeholder="I would like to say..."
                rows="5"
                required
              ></textarea>
            </fieldset>

            <button type="submit" className="submit-btn">
              Send
            </button>
          </form>

          <p style={{ marginTop: "20px" }}>
            Or you can directly contact me at:
          </p>

          <a href="mailto:pushkarchaudhary256@gmail.com">
            pushkarchaudhary256@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}

export default Contact;