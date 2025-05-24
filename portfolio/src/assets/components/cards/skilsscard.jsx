// src/components/SkillsCard.jsx
import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import ShapedCard from './shapedcard';
import { useInView } from 'react-intersection-observer'; // Still needed for individual skill bars

const skillsData = [
  { name: 'Python', level: 75 },
  { name: 'ReactJS', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'HTML + CSS', level: 95 },
  { name: 'Django', level: 60 },
  { name: 'MySQL', level: 80 },
  { name: 'REST API', level: 50 },
];

const SkillBar = ({ skill, level }) => {
  // Framer Motion Variants for the skill bar
  const barVariants = {
    hidden: { width: 0 }, // Initial state: 0 width
    visible: {
      width: `${level}%`, // Final state: desired level width
      transition: {
        duration: 1, // 1 second duration
        ease: "easeOut", // Smooth easing
      },
    },
  };

  return (
    <div className="mb-3">
      <div className="text-gray-300 text-sm mb-1">{skill}</div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        {/* Convert div to motion.div */}
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          variants={barVariants}
          initial="hidden"
          whileInView="visible" // Animate to visible when in view
          viewport={{ once: false, amount: 0.4 }} // Re-animate every time, when 50% visible
        ></motion.div>
      </div>
    </div>
  );
};


const SkillsCard = () => {
  // Variants for the whole SkillsCard reveal
  const cardRevealVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts invisible and 50px down
    visible: {
      opacity: 1,
      y: 0, // Animates to its original Y position
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.5, // Duration in seconds
        delay: 0.1,    // Delay before card reveal
      },
    },
  };

  return (
    // Wrap the ShapedCard in a motion.div for its reveal animation
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // Animate every time, when 20% of this SkillsCard is visible
      className="inline-block" // Important: motion.div will be a block element by default, use inline-block if ShapedCard expects parent width
    >
      <ShapedCard
        title="SKILLS"
        height={360}
        cardBgColor="#1A2B3D"
        cardBorderColor="#00C8FF"
        tabBgColor="#007bff"
        className="shadow-2xl"
      >
        <div className="py-2">
          {skillsData.map((skill, index) => (
            <SkillBar key={index} skill={skill.name} level={skill.level} />
          ))}
        </div>
      </ShapedCard>
    </motion.div>
  );
};

export default SkillsCard;