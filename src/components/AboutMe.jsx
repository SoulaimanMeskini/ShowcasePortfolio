import React, { useLayoutEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Footer from '../components/navigation/Footer';
import SectionTemplate from "./aboutsections/SectionTemplate";
import SectionOne from "./aboutsections/SectionOne";
import {
  AboutTitle1,
  AboutTitle2,
  AboutText1,
  AboutText2,
  AboutImgText1,
  AboutImgText2,
  AboutTitle3,
  AboutText3,
  AboutImgText3,
} from "../text/text";
import AboutMeImage1 from "../assets/about/AboutMeImage1.webp";
import AboutMeImage2 from "../assets/about/AboutMeImage2.webp";
import AboutMeImage3 from "../assets/about/AboutMeImage3.webp";

const aboutSectionsData = [
  {
    id: "section1",
    component: SectionOne,
  },
  {
    id: "section2",
    imgsource: AboutMeImage1,
    imgalt: "Portrait",
    imgtext: AboutImgText1,
    title: AboutTitle1,
    text: AboutText1,
  },
  {
    id: "section3",
    imgsource: AboutMeImage2,
    imgalt: "Van Gogh",
    imgtext: AboutImgText2,
    title: AboutTitle2,
    text: AboutText2,
    cv: true,
  },
  {
    id: "section4",
    imgsource: AboutMeImage3,
    imgalt: "Modern Portrait",
    imgtext: AboutImgText3,
    title: AboutTitle3,
    text: AboutText3,
    socials: true,
  },
];

const AboutMe = ({ setShowLogo, scrollRef }) => {
  const controlsArray = [useAnimation(), useAnimation(), useAnimation(), useAnimation()];

  useLayoutEffect(() => {
    const handleScroll = () => {
      const sections = aboutSectionsData.map(({ id }) => document.getElementById(id));
      const visibleSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0;
      });

      setShowLogo(visibleSection && visibleSection.id !== "section1");
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", debouncedHandleScroll);
      handleScroll(); 
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", debouncedHandleScroll);
      }
    };
  }, [setShowLogo, scrollRef]);

  useLayoutEffect(() => {
    const observerOptions = {
      root: scrollRef.current,
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const index = aboutSectionsData.findIndex(({ id }) => id === entry.target.id);
        if (index !== -1) {
          const control = controlsArray[index];
          if (entry.isIntersecting) {
            control.start({ opacity: 1 });
          } else {
            control.start({ opacity: 0 });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [controlsArray, scrollRef]);

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  return (
    <div
      className="relative h-screen w-screen md:snap-y md:snap-mandatory overflow-y-scroll no-scrollbar scroll-container"
      ref={scrollRef}
    >
      {aboutSectionsData.map((sectionData, index) => (
        <motion.section
          key={sectionData.id}
          id={sectionData.id}
          className="h-full w-full md:snap-center"
          initial={{ opacity: 0 }}
          animate={controlsArray[index]}
          transition={{ duration: 0.7 }}
        >
          {sectionData.component ? (
            <sectionData.component />
          ) : (
            <SectionTemplate
              imgsource={sectionData.imgsource}
              imgalt={sectionData.imgalt}
              imgtext={sectionData.imgtext}
              title={sectionData.title}
              text={sectionData.text}
              cv={sectionData.cv}
              socials={sectionData.socials}
            />
          )}
          {index === aboutSectionsData.length - 1 && (
            <div className="pb-1 md:hidden">
              <Footer />
            </div>
          )}
        </motion.section>
      ))}
    </div>
  );
};

export default AboutMe;
