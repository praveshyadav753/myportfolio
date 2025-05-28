import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './projectcard';

gsap.registerPlugin(ScrollTrigger);

const RadialProjectList = () => {
  const projects = [
    {
      id: 1,
      title: 'QuickServe',
      description: 'A service booking platform that allows users to register, book services, and manage appointments. Includes admin panel and service provider registration.',
      imageUrl: '/Quickserve.png',
      technologies: ['React.js', 'Django', 'Tailwind CSS', 'PostgreSQL','Jwt Authentication'],
      liveUrl: 'https://example.com/quickserve',
      githubUrl: 'https://github.com/praveshyadav753/QuickServe_App'
    },
    {
      id: 2,
      title: 'SmartBites',
      description: 'A mobile web app that provides nutrition facts, ingredients, and health ratings for products. Features barcode scanning and personalized recommendations.',
      imageUrl: '/smartbites.png',
      technologies: ['React.js', 'Django', 'Tailwind CSS', 'Restful API'],
      liveUrl: 'https://smartbites-alpha.vercel.app/',
      githubUrl: 'https://github.com/praveshyadav753/Smartbites'
    },
    {
      id: 3,
      title: 'ParkIt',
      description: 'A web-based car parking management system featuring real-time slot monitoring, surveillance integration, and automated parking using EasyOCR for number plate recognition.',
      imageUrl: '/boutme.png',
      technologies: ['Python', 'yolov5', 'EasyOCR', 'HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://example.com/parkit',
      githubUrl: 'https://github.com/praveshyadav753/advance-parking-management-system'
    },
    {
      id: 4,
      title: 'Music Player System',
      description: 'A modern music player with support for audio playback, playlist management, shuffle, repeat, and volume control using the HTML5 Audio API.',
      imageUrl: '/forground.png',
      technologies: ['Html', 'HTML5 Audio', 'Css', 'JavaScript'],
      liveUrl: 'https://example.com/music-player',
      githubUrl: 'https://github.com/praveshyadav753/music--player'
    }
  ];

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const totalCards = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [center, setCenter] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight * 1.3
  });

  const angleGap = (Math.PI * 2) / totalCards;

  const positionCards = useCallback(
    (index, customCenter = center) => {
      const radiusX = 2000;
      const radiusY = Math.min(customCenter.y - 70, window.innerHeight / 1.2); // Use window.innerHeight here

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const relativeIndex = (i - index + totalCards) % totalCards;
        const angle = relativeIndex * angleGap - Math.PI / 2;

        const x = customCenter.x + radiusX * Math.cos(angle);
        const y = customCenter.y + radiusY * Math.sin(angle);

        const currentX = card._gsTransform?.x ?? 0;
        const currentY = card._gsTransform?.y ?? 0;

        if (Math.abs(currentX - x) > 2 || Math.abs(currentY - y) > 2) {
          gsap.to(card, {
            duration: 1,
            x,
            y,
            ease: 'ease',
            transformOrigin: '51% 50%',
            overwrite: 'auto',
          });
        }
      });
    },
    [angleGap, center, totalCards]
  );

  // Reposition cards when active index changes
  useEffect(() => {
    positionCards(activeIndex);
  }, [activeIndex, positionCards]);

  useEffect(() => {
    let lastIndex = -1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${projects.length * 100}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          const index = Math.floor(scrollProgress * (projects.length - 1));
          if (index !== lastIndex) {
            lastIndex = index;
            setActiveIndex(index);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects.length]);

  // Recalculate center on resize
  useEffect(() => {
    const updateLayout = () => {
      const newCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight * 1.3
      };
      setCenter(newCenter);
      positionCards(activeIndex, newCenter);
    };

    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [activeIndex, positionCards]);

  // Determine if buttons should be disabled
  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === projects.length - 1;

  return (
    <div id='projects' ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      <div className="relative p-2 w-full h-screen flex flex-col items-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-10 text-center z-10 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hidden md:inline"> What I Have Built</span>
          <span className="inline md:hidden bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">My Work</span>
        </h2>

        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="w-[300] md:w-[340px] h-[420px] absolute"
            style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)', willChange: 'transform' }}
          >
            <ProjectCard project={project} isActive={index === activeIndex} />
          </div>
        ))}

        {/* Optional manual nav buttons */}
        <div className="absolute w-[200px] sm:w-[320] bottom-5 left-1/2 transform -translate-x-1/2 flex justify justify-between ">
          <button
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            className={`p-3 rounded-full bg-blue-600 text-white shadow-lg ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={isPrevDisabled}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((i) => Math.min(projects.length - 1, i + 1))}
            className={`p-3 rounded-full bg-blue-600 text-white shadow-lg ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={isNextDisabled}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadialProjectList;