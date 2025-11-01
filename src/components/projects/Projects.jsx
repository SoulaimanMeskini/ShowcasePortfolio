import React, { useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ProjectTemplate from './ProjectTemplate';
import { ProjectTitle1, ProjectTitle2, ProjectTitle3, ProjectTitle4, ProjectTitle5, ProjectTitle6, ProjectText1, ProjectText2, ProjectText3, ProjectText4, ProjectText5, ProjectText6 } from '../../text/text';
import Footer from '../navigation/Footer';

// Image imports
import RubyImage1 from '../../assets/project/Ruby1.webp';
import RubyImage2 from '../../assets/project/Ruby2.webp';
import RubyImage4 from '../../assets/project/Ruby4.mp4';
import SouraikoImage1 from '../../assets/project/Souraiko1.webp';
import SouraikoImage2 from '../../assets/project/Souraiko2.mp4';
import SouraikoImage3 from '../../assets/project/Souraiko3.webp';
import SouraikoImage4 from '../../assets/project/Souraiko4.webp';
import ZeldaImage1 from '../../assets/project/zelda1.webp';
import ZeldaImage2 from '../../assets/project/zelda2.webp';
import VentilatieImage1 from '../../assets/project/ventilatieland1.webp';
import VentilatieImage2 from '../../assets/project/ventilatieland2.webp';
import VentilatieImage3 from '../../assets/project/ventilatieland3.webp';
import CustomMediaImage1 from '../../assets/project/custommedia1.webp';
import CustomMediaImage2 from '../../assets/project/custommedia2.webp';
import CustomMediaPdf from '../../assets/project/custommedia.pdf';

const CustomMediaImages = [
  { src: CustomMediaImage1, alt: 'Custom Media Image 1' },
  { src: CustomMediaImage2, alt: 'Custom Media Image 2' }
];

const VentilatieImages = [
  { src: VentilatieImage1, alt: 'Ventilatieland Image 1' },
  { src: VentilatieImage2, alt: 'Ventilatieland Image 2' },
  { src: VentilatieImage3, alt: 'Ventilatieland Image 3' }
];

const RubyImages = [
  { src: RubyImage1, alt: 'Ruby Image 1' },
  { src: RubyImage2, alt: 'Ruby Image 2' },
  { src: RubyImage4, alt: 'Ruby Video 4' }
];
const SouraikoImages = [
  { src: SouraikoImage1, alt: 'Souraiko Image 1' },
  { src: SouraikoImage2, alt: 'Souraiko Video 2' },
  { src: SouraikoImage3, alt: 'Souraiko Image 3' },
  { src: SouraikoImage4, alt: 'Souraiko Image 4' }
];
const ZeldaImages = [
  { src: ZeldaImage1, alt: 'Zelda Image 1' },
  { src: ZeldaImage2, alt: 'Zelda Image 2' }
];

const Projects = ({ scrollRef }) => {
  const controlsArray = [useAnimation(), useAnimation(), useAnimation(), useAnimation(), useAnimation()];

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
    { images: ZeldaImages, title: ProjectTitle6, text: ProjectText6 },
    { images: SouraikoImages, title: ProjectTitle5, text: ProjectText5 },
    { images: CustomMediaImages, title: ProjectTitle1, text: ProjectText1, link: "https://goconnect.jp/author/soulaiman-meskini/", linkText: "Visit Articles", pdfUrl: CustomMediaPdf },
    { images: VentilatieImages, title: ProjectTitle2, text: ProjectText2, link: "https://www.ventilatieland.nl/nl_NL/ontdek-onze-keuzehulp" },
    { images: RubyImages, title: ProjectTitle4, text: ProjectText4, instagram: "https://www.instagram.com/rubymus.ic/", centerVideo: true },
  ];

  return (
    <div
      className="relative h-screen w-screen md:snap-y md:snap-mandatory overflow-y-scroll scroll-container"
      ref={scrollRef}
    >
      {projectData.map((data, index) => (
        <motion.section
          key={index + "project"}
          id={`section${index + 1}`}
          className="project-section min-h-screen w-full md:h-full md:snap-center flex justify-center items-center py-8 md:py-0"
          initial={{ opacity: 0 }}
          animate={controlsArray[index]}
          transition={{ duration: 0.7 }}
        >
          <ProjectTemplate
            images={data.images}
            title={data.title}
            text={data.text}
            imgStyles={{ width: '90%' }}
            videoStyles={{ width: '90%', height: 'auto' }}
            instagram={data.instagram}
            link={data.link}
            linkText={data.linkText}
            centerVideo={data.centerVideo}
            pdfUrl={data.pdfUrl}
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
