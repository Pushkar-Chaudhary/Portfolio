const AboutMe = () => {
  return (
    <section className="about-bento-section" aria-labelledby="about-bento-title">
      <div className="section-eyebrow-wrap">
        <span className="section-kicker">A little about me</span>
        <h2 id="about-bento-title" className="section-headline">
          Learning by building.
        </h2>
        <p className="about-intro">
          I enjoy taking an idea from a rough sketch to something people can
          actually use. Most of my time is spent learning, trying things, and
          improving the projects I put out into the world.
        </p>
      </div>

      <div className="bento-grid">
        <div className="bento-card">
          <h3 className="bento-title">The interface</h3>
          <p className="bento-text">
            I work mostly with React and care about making interfaces clear,
            responsive, and comfortable to use.
          </p>
        </div>

        <div className="bento-card">
          <h3 className="bento-title">Making it work</h3>
          <p className="bento-text">
            I also build the parts behind the screen with Node.js, Express,
            and MongoDB.
          </p>
        </div>

        <div className="bento-card">
          <h3 className="bento-title">Still learning</h3>
          <p className="bento-text">
            I&apos;m studying for my BCA and use side projects to explore
            unfamiliar tools and ideas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;