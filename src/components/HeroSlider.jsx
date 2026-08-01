import { useEffect, useState } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import "./HeroSlider.css";

export default function HeroSlider() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-stack">
      <img
        src={img1}
        alt=""
        className={`stack-img ${active ? "front" : "back"}`}
      />
      <img
        src={img2}
        alt=""
        className={`stack-img ${active ? "back" : "front"}`}
      />
    </div>
  );
}