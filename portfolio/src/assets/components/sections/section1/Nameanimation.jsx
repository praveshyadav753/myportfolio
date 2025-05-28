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
        damping: 10,
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
      // Added text-center by default, then md:text-start for larger screens
      className="flex flex-col w-full min-h-screen justify-center place-items-center px-4 sm:px-8 md:px-12 lg:px-15 xl:px-20 relative overflow-hidden text-center md:text-start"
    >

      <motion.div
        style={{ y: yContent }}
        // Removed place-items-center from here as it's handled by parent flexbox
        // max-w-full and mx-auto added to center content block on small screens
        className="relative z-10 w-full mx-auto md:mx-0 md:max-w-none"
      >
        {/* Hello, I'm section */}
        <motion.div
          variants={textInViewVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0} // Stagger index
          // Changed from flex-wrap to block and added text alignment if needed
          className="block items-baseline gap-2 text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 sm:mb-4 leading-none"
        >
          {name.map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i} // Pass index for staggered delay
              className="inline-block bg-clip-text text-transparent bg-gradient-to-l from-[#8de1e4] via-[#4fadb1] to-[#185b7a] transition-all duration-300 ease-out"
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
          // Added mx-auto for centering on small screens
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-2 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 h-10 overflow-hidden relative inline-block mx-auto md:mx-0"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {roles[roleIndex].substring(0, charIndex)}
            </motion.span>
          </AnimatePresence>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className=" ml-1 opacity-20 w-5 h-4 text-blue-700"
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
          // Added mx-auto for centering on small screens
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl mb-8 sm:mb-5 leading-relaxed mx-auto md:mx-0"
        >
          I create visually stunning websites, engaging video content, and modern applications using cutting-edge technologies.
        </motion.div>

        {/* LetsConnect component */}
        <motion.div
            variants={textInViewVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={3} // Stagger index
            // To center the LetsConnect button on small screens:
            className="flex justify-center md:justify-start "
        >
          <LetsConnect />
        </motion.div>

      </motion.div>
    </motion.div>
  );
}