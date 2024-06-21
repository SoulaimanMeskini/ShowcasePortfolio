import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import loadingGif from '../../assets/EyesLoading.gif';

const loadingScreenVariants = {
  hidden: { opacity: 0, transition: { duration: 1.2 } },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1.0 } }
};

const LoadingScreen = () => {
  const gifSrc = useMemo(() => `${loadingGif}?${new Date().getTime()}`, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={loadingScreenVariants}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-transparent"
    >
      <div className="mb-6">
        <img
          draggable="false"
          src={gifSrc}
          alt="Loading..."
          className="responsive-gif"
          width="100" // Set explicit width
          height="100" // Set explicit height
        />
      </div>
      <div className="absolute bottom-6 flex items-center space-x-2">
        <p className="text-lg font-semibold">Loading</p>
        <motion.span
          className="inline-block w-2 h-2 bg-gray-900 rounded-full"
          animate={{ opacity: [0, 1, 0], transition: { duration: 1.2, repeat: Infinity } }}
        ></motion.span>
        <motion.span
          className="inline-block w-2 h-2 bg-gray-900 rounded-full"
          animate={{ opacity: [0, 1, 0], transition: { duration: 1.2, repeat: Infinity, delay: 0.4 } }}
        ></motion.span>
        <motion.span
          className="inline-block w-2 h-2 bg-gray-900 rounded-full"
          animate={{ opacity: [0, 1, 0], transition: { duration: 1.2, repeat: Infinity, delay: 0.8 } }}
        ></motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
