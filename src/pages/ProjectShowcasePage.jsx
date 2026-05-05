import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/navigation/Header';

const PROJECT_CONFIG = {
  'legend-of-zelda': {
    title: 'The Legend of Zelda',
    iframeSrc: '/src/components/projects/project-pages/Legend-of-Zelda-Poc-main/index.html',
    fallbackUrl: 'https://legend-of-zelda-poc.vercel.app/',
  },
  'minecraft-button-generator': {
    title: 'Minecraft Button Generator',
    iframeSrc: '/src/components/projects/project-pages/mc-button-generator-main/index.html',
    fallbackUrl: null,
  },
};

const ProjectShowcasePage = () => {
  const { projectSlug } = useParams();
  const project = PROJECT_CONFIG[projectSlug];
  const isZeldaProject = projectSlug === 'legend-of-zelda';

  if (!project) {
    return (
      <div className="h-screen w-full bg-black text-white">
        <Header showLogo={true} showEyes={false} whiteBackground={false} whiteElements={isZeldaProject} />
        <main className="h-[calc(100vh-80px)] flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-2xl font-semibold">Project not found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black">
      <Header showLogo={true} showEyes={false} whiteBackground={false} whiteElements={isZeldaProject} />
      <iframe
        title={project.title}
        src={project.iframeSrc}
        className="block w-full h-screen border-0"
      />
    </div>
  );
};

export default ProjectShowcasePage;
