import React from "react";
import { motion } from "framer-motion";

const LoadingText = () => {
  const letters = ["L", "o", "a", "d", "i", "n", "g"];
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#A5D8FF", "#B5EAD7", "#FFDAC1", "#E2F0CB"];

  return (
    <div className="flex justify-center items-center h-screen "style={{background:' rgba(34,34,34,0.1)'}}>
      <motion.div
        className="text-4xl font-bold tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ 
              rotateY: -180,
              opacity: 0,
              y: 20
            }}
            animate={{ 
              rotateY: 0,
              opacity: 1,
              y: 0,
              color: colors[index]
            }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 100,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -10,
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
            className="inline-block mx-0.5 origin-center"
          >
            {letter}
          </motion.span>
        ))}
        
        {/* Animated dots */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: letters.length * 0.1 + 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8
          }}
          className="ml-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                delay: letters.length * 0.1 + i * 0.2,
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              .
            </motion.span>
          ))}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default LoadingText;