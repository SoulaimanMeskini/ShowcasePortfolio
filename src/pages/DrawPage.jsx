import React from 'react';
import Header from '../components/navigation/Header';
import Draw from '../components/Draw';
import { motion } from 'framer-motion';

const UploadPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.4 }}
      className="w-full"
    >
      <Header showLogo={true} animateLogo={false} />
      <Draw/>
    </motion.div>
  );
};

export default UploadPage;
