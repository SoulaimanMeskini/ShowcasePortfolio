import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LogoBlack from '../svg/Logo';
import MouseAnimation from '../animations/MouseAnimation';
import SwipeAnimation from '../animations/SwipeAnimation';
import Draw from '../Draw';
import AnimatedEyes from '../AnimatedEyes';
import { useLanguage } from '../LanguageProvider';

const SectionOne = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1], [0, 100]);
  const [animationStart, setAnimationStart] = useState(false); // State to control animation start
  const { t } = useLanguage();

  const text = "Soulaiman Meskini";
  const letters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationStart(true); // Trigger animation after timeout (adjust timing as needed)
    }, 1000); // Adjust this timeout based on your loading and fade-in animation duration

    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <section ref={ref} className="h-screen w-full snap-start flex justify-center items-center relative">
      <motion.div
        className="flex flex-col md:flex-row justify-center items-center h-full w-full z-20"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="hidden md:flex justify-center w-full h-full items-center md:w-1/2 relative">
          <Draw enableDrawing={false} enableLink={true} clickMePosition={{ top: '42%', left: '65%' }} />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-1/2 max-w-md md:max-w-lg relative z-30">
          <div className="svg-container mx-auto w-45 h-45">
            <LogoBlack />
          </div>
          <motion.h1
            className="text-3xl text-center font-bold"
            variants={containerVariants}
            initial="hidden"
            animate={animationStart ? "visible" : "hidden"} // Start animation based on state
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <hr className="w-full max-w-[14rem] border-t-1 border-black rounded" />
          <div className="block md:hidden my-4 w-full flex justify-center">
            <AnimatedEyes />
          </div>
          <h2 className="text-xl text-center">{t.hero.subtitle}</h2>
          <p className="text-md text-center md:block hidden">{t.hero.scrollDown}</p>
          <p className="text-md text-center md:hidden">{t.hero.swipeMore}</p>
          <div className="mt-5 w-12 h-12 mx-auto">
            <div className="md:block hidden">
              <MouseAnimation />
            </div>
            <div className="md:hidden">
              <SwipeAnimation />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionOne;
