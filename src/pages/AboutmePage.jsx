import React, { useState, useRef, useEffect } from 'react';
import AboutMe from "../components/AboutMe";
import Header from '../components/navigation/Header';
import NavButton from "../components/navigation/NavButton";

const AboutMePage = () => {
  const [showLogo, setShowLogo] = useState(false);
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
      const sections = [
        'section1',
        'section2',
        'section3',
        'section4'
      ].map(id => document.getElementById(id));
      
      const visibleSection = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0;
      });
      
      if (visibleSection) {
        setSelectedSection(visibleSection.id);
        setShowLogo(visibleSection.id !== 'section1');
      } else {
        setShowLogo(false);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); 
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [setShowLogo]);

  return (
    <div className="relative w-full h-screen">
      <Header showLogo={showLogo} />
      <AboutMe setShowLogo={setShowLogo} scrollRef={scrollRef} />
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 flex flex-col pr-4 z-50">
        <NavButton onClick={() => scrollToSection('section1')} isSelected={selectedSection === 'section1'} label="Go to section 1" />
        <NavButton onClick={() => scrollToSection('section2')} isSelected={selectedSection === 'section2'} label="Go to section 2" />
        <NavButton onClick={() => scrollToSection('section3')} isSelected={selectedSection === 'section3'} label="Go to section 3" />
        <NavButton onClick={() => scrollToSection('section4')} isSelected={selectedSection === 'section4'} label="Go to section 4" />
      </div>
    </div>
  );
};

export default AboutMePage;
