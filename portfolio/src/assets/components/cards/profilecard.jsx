// src/components/ProfileCard.jsx
import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import ShapedCard from './shapedcard'; // Adjust path as needed
import Avatar from './avtar'; // Assuming you have an Avatar component

const ProfileCard = () => {
  // Variants for the ProfileCard reveal animation
  const cardRevealVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts invisible and 50px down
    visible: {
      opacity: 1,
      y: 0, // Animates to its original Y position
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8, // Duration of the animation in seconds
        delay: 0.1,    // Delay before the animation starts
      },
    },
  };

  return (
    // Wrap the ShapedCard in a motion.div for its reveal animation
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      // CHANGED: viewport to re-animate every time it comes into view
      viewport={{ once: false, amount: 0.5 }}
      className="inline-block" // Essential if ShapedCard expects inline-block or similar parent sizing
    >
      <ShapedCard
        title="PROFILE" // The text for the tab
        width={380} // Example width
        height={180} // Example height
        cardBgColor="#1A2B3D" // Matches image background
        cardBorderColor="#00C8FF" // Corrected color for glow
        tabBgColor="#007bff" // A bright blue for the tab, like the image
        className="shadow-2xl" // Add some shadow from Tailwind
      >
        <div className="flex items-center space-x-6 h-full pb-4">
          <div className="flex-shrink-0">
            <Avatar /> {/* Your 3D avatar component */}
          </div>
          <div className="flex-grow grid grid-cols-3 gap-y-2 text-sm text-gray-300 ">
            <div className="col-span-1">Name :</div>
            <div className="col-span-2 font-bold text-white">Pravesh Yadav</div>

            <div className="col-span-1">Age :</div>
            <div className="col-span-2 font-bold text-white">22</div>

            <div className="col-span-1">From :</div>
            <div className="col-span-2 font-bold text-white">India</div>
          </div>
        </div>
      </ShapedCard>
    </motion.div>
  );
};

export default ProfileCard;