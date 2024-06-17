import React from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
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
      <Footer/>
    </motion.div>
  );
};

export default UploadPage;
