import React, { useRef, useEffect } from "react";
import Section1 from "./section1/section1page";
import "../../css/Sections.css";
import TransitionManager from "./section2/skills"; // This is where your skills section with internal scroll logic is
import HeroSection from "./section1/HeroImage"; // The 'element' you're animating
import Section3 from "./section3/section3";
import AboutSection from "./section4/AboutMe";
import ContactSection from "./section5/contactme";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../navbar/navbar";

function Sections() {
  const skillsection = useRef(null); // Changed name to avoid confusion with HeroSection component
  const sectionmainRef = useRef(null); // Changed name to avoid confusion with sectionmain variable
  const animationarea =skillsection.current
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Ensure all refs are valid before proceeding
    if (!skillsection.current || !sectionmainRef.current) {
      console.warn("GSAP: One or more refs are null. Skipping ScrollTrigger setup.");
      return;
    }

    const durationValue = skillsection.current.offsetHeight;
    console.log("Calculated Duration for ScrollTrigger:", durationValue);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger:skillsection.current , 
        start: "top center", 
        end: "top top", 
        scrub: 1,
        markers: false, 
      },
    });
    timeline.to(".element", { y:690, ease: "none" }); 

    
    const mainSectionPinTrigger = ScrollTrigger.create({
      trigger: sectionmainRef.current,
      start: "top top", 
      end: `+=${durationValue}`, 
      pin: false, 
      scrub: 1, 
      markers: false, 
      snap: {
        snapTo: 1, 
        duration: 0.3,
        ease: "power2.inOut",
      },
    });

    return () => {
     
      timeline?.scrollTrigger.kill(); // Kill the timeline's associated ScrollTrigger
      mainSectionPinTrigger?.kill();  // Kill the pin trigger
      
      
    };
  }, []); 

  return (
    <>
      <Navbar />
      <div className="element z-10 absolute hidden md:block top-0 w-full pointer-events-none ">
          <HeroSection />
        </div>
      <div className="Section1" ref={sectionmainRef}>

        <Section1 /> 

        <TransitionManager  ref={skillsection} /> 

        <Section3 />
        <AboutSection />
        <ContactSection />

        
      </div>
    </>
  );
}

export default Sections;