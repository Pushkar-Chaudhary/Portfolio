import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-3xl mx-auto px-6 py-10">

     
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

      
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[var(--primary)]">
              Pushkar Chaudhary<span className="text-[var(--accent)]">.</span>
            </h2>
            <p className="mt-2 max-w-sm text-[var(--muted)]">
              Frontend Developer from Nepal crafting beautiful web experiences with React and Tailwind CSS.
            </p>
          </div>

      
          <div className="flex flex-wrap justify-center gap-6 text-[var(--text)]">
            <Link to="/" className="transition hover:text-[var(--accent)]">Home</Link>
            <Link to="/about" className="transition hover:text-[var(--accent)]">About</Link>
            <Link to="/projects" className="transition hover:text-[var(--accent)]">Projects</Link>
            <Link to="/dashboard" className="transition hover:text-[var(--accent)]">Dashboard</Link>
            <Link to="/contact" className="transition hover:text-[var(--accent)]">Contact</Link>
            <a href="https://feedback.fish/265a18dcee38b3" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--accent)]">Feedback</a>
          </div>


        
        </div>

        <div className="my-8 border-t border-[var(--border)]"></div>

    
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-sm text-center text-[var(--muted)]">
            © {new Date().getFullYear()} Pushkar Chaudhary. All rights reserved.
          </p>
          <div className="flex gap-5 text-xl text-[var(--text)]">
            <a
              href="https://github.com/Pushkar-Chaudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[var(--accent)]"
              aria-label="GitHub profile"
            >
              <FaGithub aria-hidden="true" />
            </a>

            <a
              href="https://www.linkedin.com/in/anik-chy/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[var(--accent)]"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
