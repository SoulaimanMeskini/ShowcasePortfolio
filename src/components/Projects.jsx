import React from 'react';
import { motion } from 'framer-motion';
import ProjectTemplate from './projectsections/ProjectTemplate';
import { ProjectTitle1, ProjectTitle2, ProjectTitle3, ProjectText1, ProjectText2, ProjectText3 } from '../text/text';
import Footer from '../components/navigation/Footer';

// Image imports
import KinderImage1 from '../assets/project/kinder1.png';
import KinderImage2 from '../assets/project/kinder2.png';
import RubyImage1 from '../assets/project/Ruby1.png';
import RubyImage2 from '../assets/project/Ruby2.png';
import RubyImage3 from '../assets/project/Ruby3.png';
import RubyImage4 from '../assets/project/Ruby4.mp4';
import SouraikoImage1 from '../assets/project/Souraiko1.png';
import SouraikoImage2 from '../assets/project/Souraiko2.jpg';
import SouraikoImage3 from '../assets/project/Souraiko3.png';
import SouraikoImage4 from '../assets/project/Souraiko4.png';

const KinderImages = [
  { src: KinderImage1, alt: 'Kinder Image 1' },
  { src: KinderImage2, alt: 'Kinder Image 2' }
];
const RubyImages = [
  { src: RubyImage1, alt: 'Ruby Image 1' },
  { src: RubyImage2, alt: 'Ruby Image 2' },
  { src: RubyImage3, alt: 'Ruby Image 3' },
  { src: RubyImage4, alt: 'Ruby Video 4' }
];
const SouraikoImages = [
  { src: SouraikoImage1, alt: 'Souraiko Image 1' },
  { src: SouraikoImage2, alt: 'Souraiko Image 2' },
  { src: SouraikoImage3, alt: 'Souraiko Image 3' },
  { src: SouraikoImage4, alt: 'Souraiko Image 4' }
];

const Projects = () => {
  const projectData = [
    { images: KinderImages, title: ProjectTitle1, text: ProjectText1 },
    { images: RubyImages, title: ProjectTitle2, text: ProjectText2 },
    { images: SouraikoImages, title: ProjectTitle3, text: ProjectText3 }
  ];

  return (
    <div className="relative w-screen flex flex-col">
      <div className="flex-grow">
        {projectData.map((data, index) => (
          <motion.div
            key={index}
            className="project-section h-screen w-full flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <ProjectTemplate
              images={data.images}
              title={data.title}
              text={data.text}
              imgStyles={{}}
              videoStyles={{ height: "auto" }}
            />
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
