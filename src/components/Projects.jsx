import React, { useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ProjectTemplate from './projectsections/ProjectTemplate';
import { ProjectTitle1, ProjectTitle2, ProjectTitle3, ProjectText1, ProjectText2, ProjectText3 } from '../text/text';
import Footer from '../components/navigation/Footer';

// Image imports
import KinderImage1 from '../assets/project/kinder1.webp';
import KinderImage2 from '../assets/project/kinder2.webp';
import RubyImage1 from '../assets/project/Ruby1.webp';
import RubyImage2 from '../assets/project/Ruby2.webp';
import RubyImage3 from '../assets/project/Ruby3.webp';
import RubyImage4 from '../assets/project/Ruby4.mp4';
import SouraikoImage1 from '../assets/project/Souraiko1.webp';
import SouraikoImage2 from '../assets/project/Souraiko2.webp';
import SouraikoImage3 from '../assets/project/Souraiko3.webp';
import SouraikoImage4 from '../assets/project/Souraiko4.webp';

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

const Projects = ({ scrollRef }) => {
  const controlsArray = [useAnimation(), useAnimation(), useAnimation()];

  useLayoutEffect(() => {
    const observerOptions = {
      root: scrollRef.current,
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        const index = parseInt(target.dataset.index, 10);
        const control = controlsArray[index];
        if (isIntersecting) {
          control.start({ opacity: 1 });
        } else {
          control.start({ opacity: 0 });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.project-section');
    sections.forEach((section, index) => {
      section.dataset.index = index;
      observer.observe(section);
    });

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [controlsArray, scrollRef]);

  const projectData = [
    { images: KinderImages, title: ProjectTitle1, text: ProjectText1 },
    { images: RubyImages, title: ProjectTitle2, text: ProjectText2 },
    { images: SouraikoImages, title: ProjectTitle3, text: ProjectText3 }
  ];

  return (
    <div
      className="relative h-screen w-screen md:snap-y md:snap-mandatory overflow-y-scroll scroll-container"
      ref={scrollRef}
    >
      {projectData.map((data, index) => (
        <motion.section
          key={index+"projcet"}
          id={`section${index + 1}`}
          className="project-section h-full w-full md:snap-center flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={controlsArray[index]}
          transition={{ duration: 0.7 }}
        >
          <ProjectTemplate
            images={data.images}
            title={data.title}
            text={data.text}
            imgStyles={{ width: '80%' }} 
            videoStyles={{ width: '80%', height: 'auto' }} 
          />
        </motion.section>
      ))}
      <div className="footer w-full md:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Projects;
