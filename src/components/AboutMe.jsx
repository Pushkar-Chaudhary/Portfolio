import { Link } from "react-router-dom";
import minzoro from "../assets/minizoro.jpeg";

const AboutMe = () => {
  return (
    <section className="w-full px-1 py-12">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold tracking-[-0.05em] text-neutral-900">
          About
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
          Portfolio
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="relative h-40 overflow-hidden rounded-[22px] bg-[#ece6df] p-5 shadow-[0_12px_24px_rgba(17,17,17,0.04)]">
          <div className="h-1.5 w-12 rounded-full bg-[#d8cfc3]" />

          <div className="mt-8 flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
              Based in Nepal
            </p>
            <p className="max-w-[12rem] text-sm leading-6 text-neutral-700">
              Designing interfaces that feel effortless and memorable.
            </p>
          </div>

          <Link
            to="/about"
            className="absolute bottom-5 right-5 rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
          >
            About me
          </Link>
        </div>

        <div className="relative h-40 rounded-[22px] bg-[#f5f1eb] p-5 shadow-[0_12px_24px_rgba(17,17,17,0.04)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            Current role
          </p>

          <h3 className="mt-6 text-lg font-bold tracking-[-0.04em] text-neutral-900">
            Frontend Developer & Student
          </h3>

          <span className="absolute bottom-5 left-5 text-[10px] font-bold tracking-[0.18em] text-neutral-500">
            ACTIVE
          </span>
        </div>

        <div className="relative h-64 overflow-hidden rounded-[22px] shadow-[0_18px_28px_rgba(17,17,17,0.08)] md:row-span-2">
          <img
            src={minzoro}
            alt="Pushkar Chaudhary"
            className="h-full w-full object-cover grayscale-[0.05]"
          />

          <div className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            Silly Me
          </div>
        </div>

        <div className="h-40 rounded-[22px] bg-[#ded5c9] p-5 shadow-[0_12px_24px_rgba(17,17,17,0.04)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-700">
            Welcome
          </p>

          <h3 className="mt-5 text-lg font-bold leading-7 tracking-[-0.05em] text-neutral-900">
            Welcome to my
            <br />
            corner on the
            <br />
            internet.
          </h3>
        </div>

        <div className="h-40 rounded-[22px] bg-[#1c1c1c] p-5 text-white shadow-[0_18px_28px_rgba(17,17,17,0.12)] md:col-span-2">
          <h3 className="text-lg font-bold tracking-[-0.04em]">Constantly Learning</h3>

          <p className="mt-3 max-w-[24rem] text-sm leading-6 text-neutral-300">
            After frontend, I&apos;m diving deeper into backend architecture and building more complete digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;