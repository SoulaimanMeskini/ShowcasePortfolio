import { useLayoutEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Footer from '../components/navigation/Footer';
import SectionTemplate from "./aboutsections/SectionTemplate";
import SectionOne from "./aboutsections/SectionOne";
import AboutMeImage from "../assets/AboutMeImage1.webp";
import AboutMeImage2 from "../assets/AboutMeImage2.webp";
import AboutMeImage3 from "../assets/AboutMeImage3.webp";
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

const AboutMe = ({ setShowLogo, scrollRef }) => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();

  useLayoutEffect(() => {
    const handleScroll = () => {
      const firstSection = document.getElementById("section1");
      const secondSection = document.getElementById("section2");
      const thirdSection = document.getElementById("section3");
      const fourthSection = document.getElementById("section4");

      if (firstSection && secondSection && thirdSection && fourthSection) {
        const firstBounding = firstSection.getBoundingClientRect();
        const secondBounding = secondSection.getBoundingClientRect();
        const thirdBounding = thirdSection.getBoundingClientRect();
        const fourthBounding = fourthSection.getBoundingClientRect();

        if (firstBounding.top <= 0 && firstBounding.bottom > 0) {
          setShowLogo(false);
        } else if (
          (secondBounding.top <= 0 && secondBounding.bottom > 0) ||
          (thirdBounding.top <= 0 && thirdBounding.bottom > 0) ||
          (fourthBounding.top <= 0 && fourthBounding.bottom > 0)
        ) {
          setShowLogo(true);
        } else {
          setShowLogo(false);
        }
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize state based on initial scroll position
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
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
        let control = null;
        switch (entry.target.id) {
          case "section1":
            control = controls1;
            break;
          case "section2":
            control = controls2;
            break;
          case "section3":
            control = controls3;
            break;
          case "section4":
            control = controls4;
            break;
        }

        if (control) {
          if (entry.isIntersecting) {
            control.start({ opacity: 1 });
          } else {
            control.start({ opacity: 0 });
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [controls1, controls2, controls3, controls4, scrollRef]);

  return (
    <div
      className="relative h-screen w-screen md:snap-y md:snap-mandatory overflow-y-scroll no-scrollbar scroll-container"
      ref={scrollRef}
    >
      <motion.div style={{ scaleX: 1 }} />
      <motion.section
        id="section1"
        className="h-full w-full md:snap-center"
        initial={{ opacity: 0 }}
        animate={controls1}
        transition={{ duration: 0.7 }}
      >
        <SectionOne />
      </motion.section>
      <motion.section
        id="section2"
        className="h-full w-full md:snap-center"
        initial={{ opacity: 0 }}
        animate={controls2}
        transition={{ duration: 0.7 }}
      >
        <SectionTemplate
          imgsource={AboutMeImage}
          imgalt="Portrait"
          imgtext={AboutImgText1}
          title={AboutTitle1}
          text={AboutText1}
        />
      </motion.section>
      <motion.section
        id="section3"
        className="h-full w-full md:snap-center"
        initial={{ opacity: 0 }}
        animate={controls3}
        transition={{ duration: 0.7 }}
      >
        <SectionTemplate
          imgsource={AboutMeImage2}
          imgalt="Van Gogh"
          imgtext={AboutImgText2}
          title={AboutTitle2}
          text={AboutText2}
          cv={true}
        />
      </motion.section>
      <motion.section
        id="section4"
        className="h-full w-full md:snap-center"
        initial={{ opacity: 0 }}
        animate={controls4}
        transition={{ duration: 0.7 }}
      >
        <SectionTemplate
          imgsource={AboutMeImage3}
          imgalt="Modern Portrait"
          imgtext={AboutImgText3}
          title={AboutTitle3}
          text={AboutText3}
          socials={true}
        />
        <div className="pb-1 md:hidden">
          <Footer />
        </div>
      </motion.section>
    </div>
  );
};

export default AboutMe;
