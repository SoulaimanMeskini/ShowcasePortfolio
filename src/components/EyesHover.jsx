import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import ClickMe from './ClickMe'; 

const EyesHover = ({ enableDrawing, enableLink }) => {
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
      {enableLink && (
        <Link to="/draw">
          <motion.div
            className="absolute text-lg font-bold text-[#1d1d1d] -right-10 -top-10 transform rotate-45"
            variants={hoverVariants}
            initial="hidden"
            animate={isHovered ? "visible" : (isVisible ? "visible" : "hidden")}
            style={{ zIndex: 20 }}
          >
            <ClickMe />
          </motion.div>
        </Link>
      )}
    </div>
  );
};

export default EyesHover;

const ClickMe = () => {
  return (
    <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="curvedPath" fill="transparent" d="M20,80 Q100,10 180,80" />
      </defs>
      <text fill="#1d1d1d" fontSize="18" fontWeight="bold">
        <textPath href="#curvedPath" startOffset="50%" textAnchor="middle">
          Click me
        </textPath>
      </text>
    </svg>
  );
};

export default ClickMe;
