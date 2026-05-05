import React, { useState, useRef, useEffect } from 'react';
import Projects from '../components/projects/Projects';
import Header from '../components/navigation/Header';
import NavButton from '../components/navigation/NavButton';

const ProjectsPage = () => {
  const STORAGE_KEY = 'projects:lastSection';
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
    const savedSection = localStorage.getItem(STORAGE_KEY);
    if (savedSection) {
      const savedEl = document.getElementById(savedSection);
      if (savedEl && scrollRef.current) {
        requestAnimationFrame(() => {
          scrollRef.current.scrollTo({
            top: savedEl.offsetTop,
            behavior: 'auto'
          });
          setSelectedSection(savedSection);
        });
      }
    }

    const handleScroll = () => {
      const sections = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8'].map(id => document.getElementById(id));
      
      const visibleSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0;
      });

      if (visibleSection) {
        setSelectedSection(visibleSection.id);
        localStorage.setItem(STORAGE_KEY, visibleSection.id);
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
  }, [STORAGE_KEY]);

  return (
    <div className="relative w-full h-screen flex flex-col">
      <Header showLogo={true} showEyes={true} />
      <div className="flex-grow">
        <Projects scrollRef={scrollRef} />
      </div>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 hidden md:flex flex-col pr-4">
        <NavButton onClick={() => scrollToSection('section1')} isSelected={selectedSection === 'section1'} />
        <NavButton onClick={() => scrollToSection('section2')} isSelected={selectedSection === 'section2'} />
        <NavButton onClick={() => scrollToSection('section3')} isSelected={selectedSection === 'section3'} />
        <NavButton onClick={() => scrollToSection('section4')} isSelected={selectedSection === 'section4'} />
        <NavButton onClick={() => scrollToSection('section5')} isSelected={selectedSection === 'section5'} />
        <NavButton onClick={() => scrollToSection('section6')} isSelected={selectedSection === 'section6'} />
        <NavButton onClick={() => scrollToSection('section7')} isSelected={selectedSection === 'section7'} />
        <NavButton onClick={() => scrollToSection('section8')} isSelected={selectedSection === 'section8'} />
      </div>
    </div>
  );
};

export default ProjectsPage;
