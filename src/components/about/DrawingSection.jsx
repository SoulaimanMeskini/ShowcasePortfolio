import React from 'react';
import { motion } from 'framer-motion';
import Draw from '../Draw';

const DrawingSection = () => {
  return (
    <section className="h-screen w-full snap-start flex justify-center items-center relative">
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 z-10">
          <Draw enableDrawing={false} enableLink={false} />
        </div>
      </motion.div>
    </section>
  );
};

export default DrawingSection;

