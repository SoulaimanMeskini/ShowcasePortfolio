import React, { useState, useRef, useEffect } from 'react';
import Projects from '../components/projects/Projects';
import Header from '../components/navigation/Header';
import NavButton from '../components/navigation/NavButton';

const ProjectsPage = () => {
  const [selectedSection, setSelectedSection] = useState('section1');
  const scrollRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
      setSelectedSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.getElementById('section1');
      const secondSection = document.getElementById('section2');
      const thirdSection = document.getElementById('section3');
      const fourthSection = document.getElementById('section4');

      if (firstSection && secondSection && thirdSection && fourthSection) {
        const firstBounding = firstSection.getBoundingClientRect();
        const secondBounding = secondSection.getBoundingClientRect();
        const thirdBounding = thirdSection.getBoundingClientRect();
        const fourthBounding = fourthSection.getBoundingClientRect();

        if (firstBounding.top <= 0 && firstBounding.bottom > 0) {
          setSelectedSection('section1');
        } else if (secondBounding.top <= 0 && secondBounding.bottom > 0) {
          setSelectedSection('section2');
        } else if (thirdBounding.top <= 0 && thirdBounding.bottom > 0) {
          setSelectedSection('section3');
        } else if (fourthBounding.top <= 0 && fourthBounding.bottom > 0) {
          setSelectedSection('section4');
        }
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initialize state based on initial scroll position
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col">
      <Header showLogo={true} animateLogo={false} />
      <div className="flex-grow">
        <Projects scrollRef={scrollRef} />
      </div>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 hidden md:flex flex-col pr-4">
        <NavButton onClick={() => scrollToSection('section1')} isSelected={selectedSection === 'section1'} />
        <NavButton onClick={() => scrollToSection('section2')} isSelected={selectedSection === 'section2'} />
        <NavButton onClick={() => scrollToSection('section3')} isSelected={selectedSection === 'section3'} />
        <NavButton onClick={() => scrollToSection('section4')} isSelected={selectedSection === 'section4'} />
      </div>
    </div>
  );
};

export default ProjectsPage;
