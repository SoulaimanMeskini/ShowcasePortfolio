import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderbubbleComponent from './HeaderBubble';
import CustomLogo from '../svg/CustomLogo';
import useScrollVisibility from '../hooks/useScrollVisibility';

const Header = ({ showLogo, isLookbookPage }) => {
  const scrollDirection = useScrollVisibility();

  return (
    <motion.div
      className={`fixed top-0 z-[1000] h-[80px] w-full flex items-center p-5 overflow-hidden ${
        isLookbookPage ? 'bg-[#1d1d1d] bg-opacity-30 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === 'down' ? '-100%' : '0%' }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute left-5 md:block hidden">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CustomLogo />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <HeaderbubbleComponent />
      </div>
    </motion.div>
  );
};

export default Header;
