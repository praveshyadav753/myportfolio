// src/components/SkillsCard.jsx
import React from 'react';
import { motion, scale } from 'framer-motion'; // Import motion
import ShapedCard from './shapedcard';


const skillsData = [
  { name: 'Python', level: 75 },
  { name: 'ReactJS', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'HTML + CSS', level: 95 },
  { name: 'Django', level: 60 },
  { name: 'MySQL', level: 80 },
  { name: 'REST API', level: 50 },
];

const SkillBar = ({ skill, level, index }) => {
  // Framer Motion Variants for the skill bar
  const barVariants = {
    hidden: { width: 0 }, // Initial state: 0 width
    visible: {
      width: `${level}%`, // Final state: desired level width
      transition: {
        duration: 1, // 1 second duration
        ease: "easeOut", // Smooth easing
        delay: index * 0.1, // Stagger animation for each bar
      },
    },
  };

  return (
    <div className="mb-3">
      <div className="text-gray-300 text-sm mb-1">{skill}</div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          variants={barVariants}
          initial="hidden"
          whileInView="visible" 
          
          viewport={{ once: true, amount: 0.5 }} // Animate once when 50% visible
        ></motion.div>
      </div>
    </div>
  );
};




const SkillsCard = () => {
  // Variants for the whole SkillsCard reveal
  const cardRevealVariants = {
    hidden: { opacity: 0, y: 50,scale: 0.8 }, // Starts invisible and 50px down
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,  
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
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
     
      viewport={{ once: false, amount: 0.2 }} 
      className="inline-block"
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
            // Pass index to SkillBar for staggered animation
            <SkillBar key={skill.name} skill={skill.name} level={skill.level} index={index} />
          ))}
        </div>
      </ShapedCard>
    </motion.div>
  );
};

export default SkillsCard;