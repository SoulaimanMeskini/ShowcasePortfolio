import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import FollowingEyes from './Eyes';
import ClickMe from './svg/ClickMe'; 

const EyesHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev);
      }, 4000); 
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const hoverVariants = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer"
      style={{ zIndex: 10 }}
    >
      <Link to="/draw">
        <FollowingEyes />
      </Link>
      <motion.div  
        className="absolute text-lg font-bold text-[#1d1d1d] -right-10 -top-10 transform rotate-45"
        variants={hoverVariants}
        initial="hidden"
        animate={isHovered ? "visible" : (isVisible ? "visible" : "hidden")}
        style={{ zIndex: 20 }}
      >
        <ClickMe /> 
      </motion.div>
    </div>
  );
};

export default EyesHover;
