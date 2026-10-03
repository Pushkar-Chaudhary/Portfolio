import { useState } from "react";
import "./PagePlaneAccent.css";

function PagePlaneAccent() {
  const [isFlying, setIsFlying] = useState(false);

  return (
    <>
      <span
        className={`page-plane-accent${isFlying ? " is-flying" : ""}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 96 64" fill="none">
          <path
            className="page-plane-trail"
            d="M5 52c19-21 35 13 53-6 8-9 9-18 21-27"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 5"
          />
          <path
            className="page-plane-shape"
            d="m75 13 15-8-7 16-5-4-8 7 1-10-9-3 13 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <button
        type="button"
        className="page-plane-control"
        onClick={() => setIsFlying((flying) => !flying)}
        aria-label={isFlying ? "Stop airplane" : "Start airplane"}
        aria-pressed={isFlying}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {isFlying ? (
            <path d="M5 3.5h2.2v9H5zm3.8 0H11v9H8.8z" fill="currentColor" />
          ) : (
            <path d="M5 3.2v9.6L12.4 8 5 3.2Z" fill="currentColor" />
          )}
        </svg>
      </button>
    </>
  );
}

export default PagePlaneAccent;
