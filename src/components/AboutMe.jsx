import { Link } from "react-router-dom";
import minzoro from "../assets/minizoro.jpeg"

const AboutMe = () => {
  return (
    <section className="w-full px-4 py-16">

     
      <div className="mb-6">
        <h2 className="font-serif text-2xl ">
          About
        </h2>

        <p className="mt-2 max-w-2xl text-s">
          I craft thoughtful digital experiences that feel clear, fast,
          and genuinely useful in everyday use.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

       
        <div className="relative h-40 overflow-hidden rounded-2xl bg-blue-300 p-5">
          <div className="h-1 w-12 rounded-full bg-blue-200" />

          <Link
            to="/about"
            className="absolute bottom-5 right-5 rounded-full bg-yellow-300 px-4 py-2 text-sm font-medium transition hover:scale-105"
          >
            About me
          </Link>
        </div>

        <div className="relative h-40 rounded-2xl bg-fuchsia-200 p-5">

          <h3 className="text-lg font-bold text-gray-900">
            FrontEnd Developer & Student
          </h3>

          <span className="absolute bottom-5 left-5 text-xs tracking-wider text-gray-600">
            CURRENT ROLE
          </span>
        </div>

     
        <div className="relative h-64 overflow-hidden rounded-2xl md:row-span-2">
          <img
            src={minzoro}
            alt="Pushkar Chaudhary"
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-sm text-white backdrop-blur-sm">
           Silly Me
          </div>
        </div>

        <div className="h-40 rounded-2xl bg-lime-400 p-5">

          <h3 className="font-mono text-lg font-bold leading-7 text-white">
            Welcome to my
            <br />
            corner on the
            <br />
            internet :)
          </h3>
        </div>

      
        <div className="h-40 rounded-2xl bg-stone-700 p-5 text-white md:col-span-2">

          <h3 className="text-lg font-bold">
            Constantly Learning
          </h3>

          <p className="mt-2 max-w-l text-sm leading-5 text-gray-300 pb-0">
            After frontend I'm currently studying backend of web development.
          </p>

        </div>

      </div>
    </section>
  );
};

export default AboutMe;