import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowRight,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const LetsConnect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null); 

  const socialLinks = [
    { icon: <FiMail className="w-5 h-5" />, url: "mailto:praveshydv.p@gmail.com" },
    {
      icon: <FiGithub className="w-5 h-5" />,
      url: "https://github.com/praveshyadav753",
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/pravesh-yadav-a36b111a1/",
    },
    {
      icon: <FiTwitter className="w-5 h-5" />,
      url: "https://x.com/Pravesh_753?t=RYD9MPA9gpGd7T_e0SlYxg&s=09",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const arrowVariants = {
    initial: { rotate: 0 },
    rotated: { rotate: 90 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-5 relative z-10 h-10"
      ref={wrapperRef}
    >
      <div className="flex flex-col w-fit items-start gap-5">
        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center
            text-white px-1 py-2 rounded-full
            transition-colors
            whitespace-nowrap font-bold text-lg
            z-20
          "
        >
          <span>Let's Connect</span>
          <motion.span
            className="ml-1"
            variants={arrowVariants}
            animate={isOpen ? "rotated" : "initial"}
            transition={{ duration: 0.2 }}
          >
            <FiArrowRight size={25}/>
          </motion.span>
        </motion.button>

        {/* Social links in horizontal layout */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex ml-0 space-x-2"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-md text-indigo-600
                             hover:bg-indigo-100 transition-colors cursor-pointer
                             flex items-center justify-center"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LetsConnect;