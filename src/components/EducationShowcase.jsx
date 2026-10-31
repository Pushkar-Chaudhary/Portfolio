import { useState } from "react";
import education from "../data/education.js";
import "./EducationShowcase.css";

function EducationShowcase() {
  const [activeSchoolIndex, setActiveSchoolIndex] = useState(0);
  const activeSchool = education[activeSchoolIndex];

  return (
    <section className="education-showcase" aria-labelledby="education-showcase-title">
      <header className="education-showcase-heading">
        <div>
          <p className="eyebrow">My learning path</p>
          <h2 id="education-showcase-title">The schools behind my story.</h2>
        </div>
        <p className="education-showcase-hint">Select a school logo to explore</p>
      </header>

      <div className="education-showcase-content">
        <div className="school-logo-list" role="group" aria-label="Select a school">
          {education.map((school, index) => (
            <button
              key={school.name}
              type="button"
              className={`school-logo-option${index === activeSchoolIndex ? " is-active" : ""}`}
              onClick={() => setActiveSchoolIndex(index)}
              aria-pressed={index === activeSchoolIndex}
              aria-label={`Show ${school.name}`}
            >
              <img src={school.image} alt="" />
              <span>{school.stage}</span>
            </button>
          ))}
        </div>

        <div className="school-selected" aria-live="polite">
          <img src={activeSchool.image} alt={activeSchool.alt} />
          <div>
            <p>{activeSchool.stage}</p>
            <h3>{activeSchool.name}</h3>
          </div>
          <span className="school-selected-index">
            0{activeSchoolIndex + 1} <span aria-hidden="true">/ 0{education.length}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default EducationShowcase;
