import React, { useRef, useEffect } from "react";
import Section1 from "./section1/section1page";
import "../../css/Sections.css";
import TransitionManager from "./section2/skills";
import HeroSection from "./section1/HeroImage";
import Section3 from "./section3/section3";
import AboutSection from "./section4/AboutMe";
import ContactSection from "./section5/contactme";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../navbar/navbar"

function Sections() {
  const herosection = useRef(null);
  const sectionmain = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: herosection.current,
        start: "top 30% ",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
    });

    ScrollTrigger.create({
      trigger: sectionmain.current,
      start: "top top ",
      end: "bottom bottom",
      scrub: 1,
      markers: false,
       snap: {
        snapTo: 1, 
        duration: 0.3,
        ease: "power2.inOut", // A good ease for snapping
      },
      
  
    });
    timeline.to(".element", { top: "90%" });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up to prevent memory leaks
    };
  }, []);

  return (
    <>
      <Navbar/>
      <div className="element z-10 absolute top-0 w-full pointer-events-none hidden md:block">
        <HeroSection />
      </div>
      <div className="Section1 h-[200vh]" ref={sectionmain}>
        <Section1 />
        <div className=" section2 relative" ref={herosection}>
          <TransitionManager />
        </div>
      </div>
      <Section3 className="" />
      <AboutSection className="" />
      <ContactSection className="" />
    </>
  );
}

export default Sections;
