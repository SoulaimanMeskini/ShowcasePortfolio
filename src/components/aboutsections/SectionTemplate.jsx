import React, { useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { FaFileAlt } from 'react-icons/fa';
import CV from '../../assets/soulaimancv.pdf';
import Socials from '../Socials';

const SectionTemplate = ({ imgsource, imgalt, imgtext, title, text: TextComponent, cv = false, socials = false }) => {
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="h-screen w-full snap-start flex justify-center items-center p-4 md:p-8">
      <motion.div
        className="flex flex-col md:flex-row justify-between"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center">
          <img 
            src={imgsource} 
            draggable="false" 
            alt={imgalt} 
            className="rounded-2xl max-w-xs md:max-w-sm h-72 md:h-96 object-cover mb-2"
            width="384" // Replace with the actual width of your image
            height="288" // Replace with the actual height of your image
          />
          <p className="text-gray-500 text-xs md:text-sm">{imgtext}</p>
        </div>
        <div className="flex flex-col justify-center items-center px-3 md:px-5 md:items-start space-y-2 md:space-y-4 w-full md:w-1/2 max-w-lg">
          <h1 className="text-lg md:text-2xl mt-2 md:mt-4">{title}</h1>
          <div className="text-xs md:text-base text-justify mt-2 md:mt-4 mb-2 md:mb-4 text-[#1d1d1d]">
            <TextComponent />
          </div>
          <div className="flex gap-2 md:gap-4">
            {cv && (
              <a
                href={CV}
                download
                className="flex items-center text-[#1d1d1d] underline mt-1 md:mt-3 transition-colors duration-300 hover:text-[#6f02c6]"
              >
                <FaFileAlt className="mr-1" />
                <span className="font-bold text-sm md:text-lg">Resume</span>
              </a>
            )}
            {socials && <Socials />}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionTemplate;
