import { useEffect, useState } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import "./HeroSlider.css";

const images = [img1, img2];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-stack">
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`Pushkar Chaudhary portfolio showcase ${index + 1}`}
          className={`stack-img ${
            index === current ? "visible" : "hidden"
          }`}
        />
      ))}
    </div>
  );
}

export default HeroSlider;