import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/navigation/Header';
import Lookbook from '../components/Lookbook'; 

const LookbookPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.4 }}
      className="w-full"
    >
      <Header showLogo={true} animateLogo={false} /> 
      <div className="w-full absolute top-0" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)' }}>
      </div>
      <Lookbook />
    </motion.div>
  );
};

export default LookbookPage;
