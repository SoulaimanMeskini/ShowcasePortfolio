import React, { useLayoutEffect, useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import Footer from '../navigation/Footer';
import SectionTemplate from "./SectionTemplate";
import SectionOne from "./SectionOne";
import DrawingSection from "./DrawingSection";
import { useLanguage } from "../LanguageProvider";
import AboutMeImage1 from "../../assets/about/AboutMeImage1.webp";
import AboutMeImage2 from "../../assets/about/AboutMeImage2.webp";
import AboutMeImage3 from "../../assets/about/AboutMeImage3.webp";

const drawingSectionData = {
  id: "section1b",
  component: DrawingSection,
};

const AboutMe = ({ scrollRef }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const { t } = useLanguage();

  // Create animation controls for maximum possible sections (5)
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkDrawing = () => {
      setHasDrawing(!!localStorage.getItem('savedDrawing'));
    };

    checkMobile();
    checkDrawing();

    window.addEventListener('resize', checkMobile);
    const interval = setInterval(checkDrawing, 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  const aboutSectionsData = useMemo(() => {
    const baseSectionsData = [
      {
        id: "section1",
        component: SectionOne,
      },
      {
        id: "section2",
        imgsource: AboutMeImage1,
        imgalt: "Portrait",
        imgtext: t.about.imgText.one,
        title: t.about.titles.one,
        text: t.about.texts.one,
      },
      {
        id: "section3",
        imgsource: AboutMeImage2,
        imgalt: "Van Gogh",
        imgtext: t.about.imgText.two,
        title: t.about.titles.two,
        text: t.about.texts.two,
        cv: true,
      },
      {
        id: "section4",
        imgsource: AboutMeImage3,
        imgalt: "Modern Portrait",
        imgtext: t.about.imgText.three,
        title: t.about.titles.three,
        text: t.about.texts.three,
        socials: true,
      },
    ];

    if (isMobile && hasDrawing) {
      return [baseSectionsData[0], drawingSectionData, ...baseSectionsData.slice(1)];
    }
    return baseSectionsData;
  }, [isMobile, hasDrawing, t]);

  const controlsArray = useMemo(() => {
    const allControls = [controls1, controls2, controls3, controls4, controls5];
    return allControls.slice(0, aboutSectionsData.length);
  }, [aboutSectionsData.length, controls1, controls2, controls3, controls4, controls5]);

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
