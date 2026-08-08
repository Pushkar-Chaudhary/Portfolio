import { FaGithub, FaLinkedin,} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-3xl mx-auto px-6 py-10">

     
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

      
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-amber-300 dark:text-amber-50">
              Pushkarcodes<span className="text-cyan-400">.</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              Crafting beautiful web experiences with React and Tailwind CSS.
            </p>
          </div>

      
          <div className="flex flex-wrap justify-center gap-6 text-black-300">
            <a href="#home" className="hover:text-cyan-400 transition">
              Home
            </a>
            <a href="#about" className="hover:text-cyan-400 transition">
              About
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition">
              Projects
            </a>
            <a href="#gallery" className="hover:text-cyan-400 transition">
              Gallery
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition">
              Contact
            </a>
              <a
            href="https://feedback.fish/265a18dcee38b3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
          >Feedback
          </a>
          </div>


        
        </div>

        <div className="border-t border-white/10 my-8"></div>

    
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Anik Chy. All rights reserved.
          </p>
          <div className="flex gap-5 text-xl text-black-300">
            <a
              href="https://github.com/Pushkar-Chaudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/anik-chy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;