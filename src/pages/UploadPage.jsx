import React from 'react';
import Header from '../components/navigation/Header';
import Upload from '../components/Upload';
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
      <Upload/>
    </motion.div>
  );
};

export default UploadPage;
