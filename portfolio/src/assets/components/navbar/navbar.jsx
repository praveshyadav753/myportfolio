import { useState, useEffect, useRef } from 'react'; // Import useRef
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'react-feather';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  // Ref to track if a link click initiated the nav hide
  const isNavLinkClickRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle nav visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down, hide nav if not at top and not triggered by a nav link click
        if (!isNavLinkClickRef.current) { // Only hide if scroll is natural, not from a click
          setShowNav(false);
        }
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        // Scrolling up, or at the very top, always show nav
        setShowNav(true);
        isNavLinkClickRef.current = false; // Reset the ref if we scroll up or reach top
      }

      // Set background when scrolled
      setScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '#resume' },
  ];

  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.getElementById(href.substring(1));

    if (targetElement) {
      isNavLinkClickRef.current = true; // Mark that a nav link was clicked
      setIsOpen(false); // Close the mobile menu first

      // CRITICAL FIX: Add a small delay to allow the menu exit animation to complete
      // and prevent it from blocking scrollIntoView.
      const menuCloseDuration = mobileMenuVariants.exit.transition.duration * 1000; // Convert to ms
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // The setShowNav(true) from here is removed to let the scroll handler manage it
      }, menuCloseDuration + 50); // Add a small buffer (e.g., 50ms)
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeOut" } },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    // Wrap the entire nav in AnimatePresence to handle its own show/hide animation
    <AnimatePresence>
      {showNav && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120 }} // Slightly tweaked spring
          className={`fixed w-full z-50 ${
            scrolled ? 'backdrop-blur-md bg-gray-900/80' : 'bg-transparent' // More explicit background for scrolled
          } transition-all duration-100`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mr-28">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <a
                  href="#home"
                  onClick={(e) => handleNavLinkClick(e, '#home')}
                  className="text-white font-bold text-xl"
                >
                  <span className="text-indigo-400">Portfolio</span>
                </a>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavLinkClick(e, item.href)}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 * index, // Slightly faster stagger
                        type: 'spring',
                        stiffness: 150, // More responsive
                        damping: 15
                      }}
                      whileHover={{
                        scale: 1.05,
                        color: '#818cf8',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-white focus:outline-none"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // Tailwind classes for the mobile menu container
                className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavLinkClick(e, item.href)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 250, // Slightly less stiff for mobile for quicker appearance
                        damping: 20
                      }}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;