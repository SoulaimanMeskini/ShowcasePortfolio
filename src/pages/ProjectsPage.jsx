import React from 'react';
import Header from '../components/navigation/Header';
import Projects from '../components/Projects';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.4 }}
      className="w-full"
    >
      <Header showLogo={true} animateLogo={false} />
      <Projects />
    </motion.div>
  );
};

export default ProjectsPage;
