import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderBubbleComponent from './HeaderBubble';
import CustomLogo from '../svg/CustomLogo';
import FollowingEyes from '../FollowingEyes';
import useScrollVisibility from '../hooks/useScrollVisibility';
import { useTheme } from '../ThemeProvider';

const Header = ({ showLogo, isLookbookPage, showEyes = false }) => {
  const scrollDirection = useScrollVisibility();
  const [isHovered, setIsHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 100) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
      <motion.div
        className={`fixed top-0 z-[998] h-[80px] w-full flex items-center p-5 overflow-hidden transition-colors duration-300 ${
          isLookbookPage
            ? theme === 'dark'
              ? 'bg-[#1d1d1d] bg-opacity-50 backdrop-blur-md'
              : 'bg-transparent'
            : theme === 'dark'
              ? 'bg-[#1d1d1d] bg-opacity-50 backdrop-blur-md'
              : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: scrollDirection === 'down' && !isHovered ? '-100%' : '0%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute left-5 hidden md:block">
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
          <HeaderBubbleComponent />
        </div>
        {showEyes && (
          <div className="absolute right-20 md:right-24 hidden md:block">
            <div className="scale-50">
              <FollowingEyes scalingFactor={0.5} />
            </div>
          </div>
        )}
        <div className={`absolute ${showEyes ? 'right-5' : 'right-5 md:right-20'} top-1/2 transform -translate-y-1/2 z-[999]`}>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 text-[#1d1d1d] dark:text-white"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>
  );
};

export default Header;
