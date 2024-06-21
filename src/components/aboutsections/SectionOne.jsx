import React, { useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import LogoBlack from '../svg/Logo';
import MouseAnimation from '../animations/MouseAnimation';
import SwipeAnimation from '../animations/SwipeAnimation';
import Draw from '../Draw';

const SectionOne = () => {
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="h-screen w-full snap-start flex justify-center items-center relative">
      <motion.div
        className="flex flex-col md:flex-row justify-center items-center h-full w-full z-20"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="hidden md:flex justify-center items-center w-full md:w-1/2 h-full relative">
          <Draw enableDrawing={false} canvasScale={1} eyesScale={0.4} />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-1/2 max-w-md md:max-w-lg">
          <div className="svg-container mx-auto w-45 h-45">
            <LogoBlack />
          </div>
          <h1 className="text-3xl text-center font-bold">Soulaiman Meskini</h1>
          <hr className="w-full max-w-[14rem] border-t-1 border-black rounded" />
          <h2 className="text-xl text-center">Portfolio Website</h2>
          <p className="text-md text-center md:block hidden">Scroll down to see and read more</p>
          <p className="text-md text-center md:hidden">Swipe to see and read more</p>
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
