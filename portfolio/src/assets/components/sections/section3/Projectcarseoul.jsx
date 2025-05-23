import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { debounce } from 'lodash';
import ProjectCard from './projectcard';
import '../../../css/HalfCircularCarousel.css';

const projects = [
  {
    id: 1,
    title: 'QuickServe',
    description: 'A service booking platform that allows users to register, book services, and manage appointments. Includes admin panel and service provider registration.',
    imageUrl: 'https://via.placeholder.com/400x200/4B0082/FFFFFF?text=QuickServe',
technologies: ['React.js', 'Django', 'Tailwind CSS', 'PostgreSQL','Jwt Authentication'],
    liveUrl: 'https://example.com/quickserve',
    githubUrl: 'https://github.com/praveshyadav753/QuickServe_App'
  },
  {
    id: 2,
    title: 'SmartBites',
    description: 'A mobile web app that provides nutrition facts, ingredients, and health ratings for products. Features barcode scanning and personalized recommendations.',
    imageUrl: 'https://via.placeholder.com/400x200/228B22/FFFFFF?text=SmartBites',
    technologies: ['React.js', 'Django', 'Tailwind CSS, Restful API'],
    liveUrl: 'https://example.com/smartbites',
    githubUrl: 'https://github.com/praveshyadav753/Smartbites'
  },
  {
    id: 3,
    title: 'ParkIt',
    description: 'A web-based car parking management system featuring real-time slot monitoring, surveillance integration, and automated parking using EasyOCR for number plate recognition.',
    imageUrl: 'https://via.placeholder.com/400x200/1E90FF/FFFFFF?text=ParkIt',
    technologies: ['Python', 'yolov5', 'EasyOCR', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://example.com/parkit',
    githubUrl: 'https://github.com/praveshyadav753/advance-parking-management-system'
  },
  {
    id: 4,
    title: 'Music Player System',
    description: 'A modern music player with support for audio playback, playlist management, shuffle, repeat, and volume control using the HTML5 Audio API.',
    imageUrl: 'https://via.placeholder.com/400x200/000000/FFFFFF?text=Music+Player',
    technologies: ['Html', 'HTML5 Audio', 'Css', 'JavaScript'],
    liveUrl: 'https://example.com/music-player',
    githubUrl: 'https://github.com/praveshyadav753/music--player'
  }
];


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const projectRefs = useRef([]);
  const avatarRef = useRef(null);

  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 200;

  // --- GSAP Animation Logic for Radial Movement ---
  const animateCards = useCallback(() => {
    const totalProjects = projects.length;

    
    const radius = 900; 
    const arcAngle = 140;
    const anglePerCard = arcAngle / (totalProjects > 1 ? (totalProjects - 1) : 1);

   
    const startAngleOffset = arcAngle / 2;

    projectRefs.current.forEach((card, index) => {
      if (!card) return;

      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });

      let relativeIndex = index - currentIndex;

      // Handle wrapping for continuous carousel effect
      if (relativeIndex > totalProjects / 2) {
        relativeIndex -= totalProjects;
      } else if (relativeIndex < -totalProjects / 2) {
        relativeIndex += totalProjects;
      }

      const currentCardAngle = relativeIndex * anglePerCard;
      
      const angleRad = (currentCardAngle * Math.PI) / 180;

      const xCircle = radius * Math.sin(angleRad); // Use sin for X to spread horizontally
      const yCircle = -radius * Math.cos(angleRad); // Use -cos for Y to make it arc downwards from the top of the circle

      
      const translateXAdjust = -CARD_WIDTH / 70;
      const translateYAdjust = -CARD_HEIGHT / 2;

      let finalX = xCircle + translateXAdjust;
      let finalY = yCircle + translateYAdjust + radius; // Add radius to pull the arc down

      const distance = Math.abs(relativeIndex);
      let scale = 1;
      let opacity = 1;
      let zIndex = 20;
      let rotation = relativeIndex * 10; 

      if (distance === 1) {
        scale = 0.8;
        opacity = 0.8;
        zIndex = 15;
        // Adjusted nudges for side cards to make them follow the arc more naturally
        finalX += (relativeIndex > 0 ? 1 : -1) * 60; 
        finalY += 30; 
      } else if (distance === 2) {
        scale = 0.6;
        opacity = 0.6;
        zIndex = 10;
        finalX += (relativeIndex > 0 ? 1 : -1) * 120;
        finalY += 80; 
      } else if (distance > 2) {
        scale = 0.4;
        opacity = 0.2;
        zIndex = 5;
        finalX += (relativeIndex > 0 ? 1 : -1) * 200; 
        finalY += 150; 
      }

      tl.to(card, {
        x: finalX,
        y: finalY,
        scale,
        opacity,
        rotation,
        zIndex,
        display: opacity > 0.05 ? 'flex' : 'none',
      });
    });

    if (avatarRef.current) {
      gsap.to(avatarRef.current, {
        y: -10,
        repeat: 1,
        yoyo: true,
        duration: 0.3,
        ease: 'power1.inOut',
        delay: 0.1,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    animateCards();
  }, [currentIndex, animateCards]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  }, []);

  const handleScroll = useCallback(debounce((event) => {
    if (event.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
    event.preventDefault();
  }, 150, { leading: true, trailing: false }), [goToNext, goToPrev]);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleScroll, { passive: false });
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div id='projects' className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      {/* Semi-circular background base */}
      <div className="absolute bottom-0 w-4/5 h-1/2 bg-gradient-to-t from-blue-900 to-transparent rounded-t-full origin-bottom scale-x-150 transform-gpu z-0"></div>

      {/* Avatar Container */}
      

      <div
        ref={carouselRef}
        className="carousel-main-area relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1000px',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className="carousel-card-wrapper absolute flex items-center justify-center"
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            onClick={() => setCurrentIndex(index)}
          >
            <ProjectCard project={project} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-5 z-40 flex space-x-70">
        <button
          onClick={goToPrev}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;