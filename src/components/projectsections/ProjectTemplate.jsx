import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ProjectTemplate = ({ images, title, text: TextComponent, imgStyles = {}, videoStyles = {} }) => {
  useEffect(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('draggable', 'false'); // Make video not draggable
    });
  }, []);

  return (
    <section className="flex flex-col items-center w-full p-4 md:w-4/5 md:p-8 md:flex-row">
      <div className="order-1 md:order-2 flex justify-center md:items-start w-full md:w-1/2 px-3 md:px-5 space-y-2 md:space-y-4 mt-4 md:mt-0">
        <div className="max-w-lg">
          <h1 className="text-lg md:text-2xl mt-2 md:mt-4">{title}</h1>
          <div className="text-xs md:text-base text-justify mt-2 md:mt-4 mb-2 md:mb-4 text-[#1d1d1d]">
            <TextComponent />
          </div>
        </div>
      </div>
      <div className="order-2 md:order-1 w-full md:w-1/2 flex items-center justify-center">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {images.map((img, index) => (
            <div key={index} className="flex items-center justify-center md:p-4 p-2">
              {img.src.endsWith(".mp4") ? (
                <video
                  className="rounded-2xl object-cover w-full md:w-4/5"
                  style={videoStyles}
                >
                  <source src={img.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="rounded-2xl object-cover w-full md:w-4/5"
                  style={imgStyles}
                  draggable="false"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectTemplate;
