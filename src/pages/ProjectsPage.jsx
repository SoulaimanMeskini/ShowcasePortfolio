import React from 'react';
import Projects from '../components/Projects';
import Header from '../components/navigation/Header';

const ProjectsPage = () => {
  return (
    <div className="relative w-full h-screen flex flex-col">
      <Header showLogo={true} animateLogo={false} />
      <div className="flex-grow">
        <Projects />
      </div>
    </div>
  );
};

export default ProjectsPage;
