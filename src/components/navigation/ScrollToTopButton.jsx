// src/components/navigation/ScrollToTopButton.jsx

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-10 right-6 w-12 h-12 bg-[#1d1d1d] text-[#f5f5f5] rounded-full transition-transform duration-300 hover:scale-110 hover:bg-[#6f02c6] flex items-center justify-center z-[500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
          <motion.div
            className="fixed z-[400]"
            style={{ bottom: '3.5rem', right: '0rem' }} // Use inline styles to adjust the position
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="100" height="50" viewBox="0 0 100 50">
              <path id="topTextPath" fill="none" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0" />
              <text fontSize="14" fill="#1d1d1d">
                <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
                 TO TOP
                </textPath>
              </text>
            </svg>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
