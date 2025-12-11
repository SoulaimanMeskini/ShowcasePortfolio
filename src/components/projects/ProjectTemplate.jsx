import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTimes, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectTemplate = ({ images = [], title, text: TextComponent, imgStyles = {}, videoStyles = {}, instagram = null, link = null, linkText = "Visit Project", centerVideo = false, pdfUrl = null, centerText = false }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

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

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

  return (
    <section className={`flex flex-col items-center justify-center w-full p-4 md:w-4/5 md:p-8 ${images.length > 0 ? 'md:flex-row' : 'md:flex-col'} ${images.length === 0 ? 'md:h-full' : 'md:h-auto'} min-h-full`}>
      <div className={`order-1 ${images.length > 0 ? 'md:order-2' : ''} flex justify-center ${centerText ? 'md:items-center' : 'md:items-start'} ${images.length > 0 ? 'w-full md:w-1/2' : 'w-full'} px-3 md:px-5 space-y-2 md:space-y-4 mt-4 md:mt-0 mb-6 md:mb-0`}>
        <div className={`max-w-lg ${centerText ? 'text-center' : ''}`}>
          <h1 className="text-xl md:text-2xl mt-2 md:mt-4 text-[#1d1d1d] dark:text-white">{title}</h1>
          <div className={`text-sm md:text-base ${centerText ? '' : 'text-justify'} mt-2 md:mt-4 mb-2 md:mb-4 text-[#1d1d1d] dark:text-white`}>
            <TextComponent />
          </div>
          <div className={`flex flex-col gap-2 mt-2 ${centerText ? 'items-center' : ''}`}>
            {link && (
              <>
                {link.startsWith('/') ? (
                  <Link
                    to={link}
                    className="inline-flex items-center text-[#1d1d1d] dark:text-white hover:text-[#6f02c6] dark:hover:text-[#6f02c6] transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="text-xl md:text-2xl" />
                    <span className="ml-2 text-sm md:text-base font-semibold underline">{linkText}</span>
                  </Link>
                ) : (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1d1d1d] dark:text-white hover:text-[#6f02c6] dark:hover:text-[#6f02c6] transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="text-xl md:text-2xl" />
                    <span className="ml-2 text-sm md:text-base font-semibold underline">{linkText}</span>
                  </a>
                )}
              </>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#1d1d1d] dark:text-white hover:text-[#6f02c6] dark:hover:text-[#6f02c6] transition-colors duration-300"
              >
                <FaInstagram className="text-2xl md:text-3xl" />
                <span className="ml-2 text-sm md:text-base font-semibold">@rubymus.ic</span>
              </a>
            )}
            {pdfUrl && (
              <a
                href={pdfUrl}
                download
                className="inline-flex items-center text-[#1d1d1d] dark:text-white hover:text-[#6f02c6] dark:hover:text-[#6f02c6] transition-colors duration-300"
              >
                <FaFileAlt className="text-xl md:text-2xl" />
                <span className="ml-2 text-sm md:text-base font-semibold underline">Download Designs (PDF)</span>
              </a>
            )}
          </div>
        </div>
      </div>
      {images.length > 0 && (
        <div className="order-2 md:order-1 w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {images.map((img, index) => {
            const isThirdImageOfThree = images.length === 3 && index === 2;
            const isLastImage = index === images.length - 1;
            const shouldCenter = img.center || (isLastImage && images.length === 3);
            
            return (
              <React.Fragment key={index}>
                {img.src.endsWith(".mp4") ? (
                  <div 
                    key={index + "projectimg"} 
                    className={`flex items-center justify-center p-2 md:p-4 ${centerVideo ? 'col-span-2' : ''} cursor-pointer`}
                    onClick={() => setSelectedMedia({ src: img.src, type: 'video', alt: img.alt })}
                  >
                    <video
                      className={`rounded-2xl object-cover ${centerVideo ? 'w-full md:w-4/5 mx-auto' : 'w-full'} transition-transform hover:scale-105`}
                      style={videoStyles}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <track kind="captions" />
                      <source src={img.src} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div 
                    key={index + "projectimg"} 
                    className={`flex items-center justify-center p-2 md:p-4 cursor-pointer ${shouldCenter || isThirdImageOfThree ? 'col-span-2' : ''}`}
                    onClick={() => setSelectedMedia({ src: img.src, type: 'image', alt: img.alt })}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`rounded-2xl object-cover transition-transform hover:scale-105 ${shouldCenter ? 'w-full md:w-1/6 max-w-[200px] mx-auto' : isThirdImageOfThree ? 'w-1/2' : 'w-full'}`}
                      style={imgStyles}
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                )
                }
              </React.Fragment>
            );
          })}
          </motion.div>
        </div>
      )}

      {/* Modal for enlarged media */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // Close when clicking on the backdrop
              if (e.target === e.currentTarget) {
                setSelectedMedia(null);
              }
            }}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl md:text-4xl hover:text-gray-300 transition-colors z-[10000]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <motion.div
              className="max-w-7xl max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {selectedMedia.type === 'video' ? (
                <video
                  className="max-w-full max-h-[90vh] rounded-lg object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  onClick={(e) => e.stopPropagation()}
                >
                  <track kind="captions" />
                  <source src={selectedMedia.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  className="max-w-full max-h-[90vh] rounded-lg object-contain"
                  draggable="false"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectTemplate;
