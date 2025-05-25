import React from 'react';
import { motion, scale } from 'framer-motion';
import ShapedCard from './shapedcard';
import Avatar from './avtar';

const ProfileCard = () => {
  const cardRevealVariants = {
    hidden: { opacity: 0, y: 50 ,scale: 0.8 , }  ,
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 130,
      
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false ,amount:0.4 }}
      className="inline-block"
    >
      <ShapedCard
        title="PROFILE"
        height={180}
        cardBgColor="#1A2B3D"
        cardBorderColor="#00C8FF"
        tabBgColor="#007bff"
        className="shadow-2xl"
      >
        <div className="flex items-center space-x-6 h-full pb-4">
          <div className="flex-shrink-0">
            <Avatar />
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