// src/components/Sections.jsx
import React, { useRef } from 'react';
import Section1 from './section1/section1page';
import Home from '../home'; // Assuming Home is a layout component
import '../../css/Sections.css';
import TransitionManager from './section2/skills';
import HalfCircularCarousel from './section3/Projectcarseoul';
import Carousel from './section3/Projectcarseoul';
import AboutSection from './section4/AboutMe';
import ContactSection from './section5/contactme';

function Sections() {

  return (
    <Home>
    <div  className="snap-container">
      <sections className="snap-section ">
        <Section1/>
      </sections>

      <TransitionManager/>
      
      <Carousel/>

      <AboutSection/>

      <ContactSection/>


     
     

     
    </div>
    </Home>
  );
}

export default Sections;