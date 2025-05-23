import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import LetsConnect from "./connect";
import { useEffect, useRef, useState } from "react";

export default function Name() {
  const name = "Pravesh Yadav".split("");
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Trigger from when the section starts to end to when it ends
  });

  
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // useInView to trigger animations when the component enters the viewport
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 }); 

  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Fullstack Developer",
    "Video Editor",
    
  ];

  // Typewriter effect logic
  useEffect(() => {
    let timeout;
    
    if (isInView) {
      if (isDeleting) {
        if (charIndex > 0) {
          timeout = setTimeout(() => setCharIndex(charIndex - 1), 40); // Slightly faster deletion
        } else {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length); // Cycle roles
        }
      } else {
        if (charIndex < roles[roleIndex].length) {
          timeout = setTimeout(() => setCharIndex(charIndex + 1), 80); // Typing speed
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 1800); // Pause before deleting
        }
      }
    } else {
      // Reset typewriter when out of view, only if it's not currently animating
      // This prevents "flicker" if you scroll quickly past
      if (charIndex > 0 || isDeleting) { // Only reset if there's text or deleting
        setCharIndex(0);
        setIsDeleting(false);
        setRoleIndex(0);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isInView, roleIndex, roles]);

  // Animation variants for common text elements (Hello, I'm, Summary, LetsConnect)
  const textInViewVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, // Softer spring
        damping: 12,
        delay: i * 0.15, // Stagger elements
      } 
    }),
  };

  // Variant for individual name characters (more subtle)
  const charVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: i * 0.03, // Faster stagger for individual chars
      },
    }),
  };

  return (
    <motion.div
      ref={sectionRef}
      className="flex flex-col w-full min-h-screen justify-center px-4 sm:px-8 md:px-12 lg:px-15 xl:px-20 relative overflow-hidden" // Ensure overflow-hidden for parallax
    >
      {/* Background elements can go here if you have any static ones that move with the page */}
      {/* Or dynamic ones that move even slower than content */}

      {/* Content wrapper with parallax effect */}
      <motion.div style={{ y: yContent }} className="relative z-10">
        {/* Hello, I'm section */}
        <motion.div
          variants={textInViewVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0} // Stagger index
          className="flex flex-wrap items-baseline gap-2 text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
        >
          <motion.span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Hello,
          </motion.span>
          <motion.span className="font-medium text-gray-400">
            I'm
          </motion.span>
        </motion.div>

        {/* Name with individual character animation */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-2 sm:mb-4 leading-none"
        >
          {name.map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i} // Pass index for staggered delay
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out" // Removed hover scale here for subtle animation
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Typewriter effect for roles */}
        <motion.div
          variants={textInViewVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1} // Stagger index
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-2 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 h-10 overflow-hidden relative" // Added relative for cursor positioning
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }} // Slightly faster transition for role change
            >
              {roles[roleIndex].substring(0, charIndex)}
            </motion.span>
          </AnimatePresence>
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="inline-block ml-0.5 absolute right-0 top-0 h-full w-1" // Absolute position cursor to stay at end
          >
            |
          </motion.span>
        </motion.div>

        {/* Summary text */}
        <motion.div
          variants={textInViewVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2} // Stagger index
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl mb-8 sm:mb-5 leading-relaxed"
        >
          I create visually stunning websites, engaging video content, and modern applications using cutting-edge technologies.
        </motion.div>

        {/* LetsConnect component */}
        
          <LetsConnect />
       
      </motion.div>
    </motion.div>
  );
}