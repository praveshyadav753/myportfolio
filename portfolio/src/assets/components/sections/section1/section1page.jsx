import React, { useEffect, useState, useRef } from "react";
import Name from "./Nameanimation"; // Assuming this path is correct
import HeroSection from "./HeroImage"; // Assuming this path is correct
import "./section1.css"; // Import your CSS file


function Section1() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Mouse move effect for mouse follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Mouse follower effect styles
  const mouseFollowerStyle = {
    position: "fixed",
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(67, 198, 172, 0.4) 0%, transparent 70%)",
    filter: "blur(5px)",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 100,
    transition: "transform 0.1s ease-out",
  };

  return (
    <div
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-gray-900"
    >
      <div className="premium-shaded-gradient premium-gradient-1" style={{ zIndex: 1 }} />
      <div className="premium-shaded-gradient premium-gradient-2" style={{ zIndex: 1 }} />
      <div className="premium-shaded-gradient premium-gradient-3" style={{ zIndex: 1 }} />
      <div className="premium-shaded-gradient premium-gradient-4" style={{ zIndex: 1 }} />        
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="absolute md:left-[0] md:translate-x-0 md:top-[0] md:bottom-[20%]">
          <Name />
        </div>
        <div className=" herosection absolute top-0 right-[-150px] w-screen h-screen z-2 hidden sm:block">
          {/* <HeroSection /> */}
        </div>
      </div>

      {/* Mouse Follower */}
      <div style={mouseFollowerStyle} />
    </div>
  );
}

export default Section1;