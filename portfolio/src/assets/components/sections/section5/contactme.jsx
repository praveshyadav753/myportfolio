import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

// Helper function to handle sending email (you'd replace this with a real backend/email service)
const handleSubmit = (e) => {
  e.preventDefault();
  // In a real application, you'd send this data to a backend API
  console.log("Form submitted!");
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  alert("Message sent! (Simulated)");
  e.target.reset(); // Clear the form
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // When section start enters viewport to when section end leaves viewport
  });

  // Parallax for a background layer (e.g., a subtle pattern or image)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Background moves slower

  // Parallax for content within the section (moves slightly faster than background)
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]); // Content moves slightly slower than default scroll

  // Mouse interactivity refs and motion values
  const cardRef = useRef(null); // Ref for the element that will tilt/pan
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false); // To enable/disable tilt on hover

  // Determine rotation and pan based on mouse position
  // These values are subjective and can be fine-tuned
  const rotateX = useTransform(mouseY, [0, 1], [-15, 15]); // Adjust range for tilt intensity
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);
  const panX = useTransform(mouseX, [0, 1], [-20, 20]); // Adjust range for pan intensity
  const panY = useTransform(mouseY, [0, 1], [-20, 20]);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      // Normalize mouse position to a 0-1 range within the card
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Optionally reset values smoothly
    mouseX.set(0.5); 
    mouseY.set(0.5);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Scroll in view animation variants
  const inViewVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      } 
    },
  };

  const itemStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children for sequential reveal
      },
    },
  };

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 }); // Animate once on entry

  return (
    <section 
      id='contact'
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Parallax Background Layer 1 (Subtle grid/pattern) */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[url('/images/dots-grid.svg')] bg-repeat opacity-10"
        style={{ y: yBg }} // Moves slower than content
      />

      {/* Parallax Background Layer 2 (Larger shapes, moving slightly differently) */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
      >
        <div className="w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </motion.div>

      {/* Main content wrapper with its own parallax */}
      <motion.div 
        style={{ y: yContent }} 
        className="relative z-10 w-full max-w-5xl"
      >
        <motion.h2 
          variants={inViewVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-5xl lg:text-7xl font-extrabold text-white text-center mb-16 relative"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Contact Me
          </span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-gray-700 opacity-5 z-0 font-extrabold pointer-events-none select-none">
            REACH OUT
          </span>
        </motion.h2>

        {/* Contact Card with 3D Mouse Interactivity */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          style={{
            rotateX: isHovering ? rotateX : 0,
            rotateY: isHovering ? rotateY : 0,
            x: isHovering ? panX : 0,
            y: isHovering ? panY : 0,
            transformStyle: "preserve-3d", // Crucial for 3D effect
            perspective: "1000px" // Creates depth
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5 // Adjust mass for more/less inertia
          }}
          variants={itemStaggerVariants} // Use stagger for sub-elements
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-70"
        >
          {/* Left Side: Contact Info */}
          <motion.div 
            variants={inViewVariants} 
            className="flex flex-col gap-6 text-gray-300 lg:w-1/2"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Let's Connect!</h3>
            <p className="text-lg leading-relaxed">
              want to hire me?, a question, or just want to say hello? Feel free to reach out. I'd love to hear from you!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-purple-400 text-xl" />
                <a href="mailto:praveshydv.p@gmail.com" className="hover:text-purple-400 transition-colors">
                  praveshydv.p@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-purple-400 text-xl" />
                <a href="tel:+916261568895" className="hover:text-purple-400 transition-colors">
                  +91 62615 68895
                </a>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-purple-400 text-xl" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <motion.a 
                whileHover={{ y: -5, scale: 1.1 }} 
                href="https://github.com/praveshyadav753" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={28} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, scale: 1.1 }} 
                href="www.linkedin.com/in/pravesh-yadav-a36b111a1" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaLinkedin size={28} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, scale: 1.1 }} 
                href="https://x.com/Pravesh_753?t=RYD9MPA9gpGd7T_e0SlYxg&s=09" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaXTwitter size={28} />
              </motion.a>
             
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            variants={inViewVariants} 
            className="lg:w-1/2"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all duration-300" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 outline-none transition-all duration-300" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  required 
                  className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 outline-none resize-y transition-all duration-300"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message <FaEnvelope className="ml-2" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;