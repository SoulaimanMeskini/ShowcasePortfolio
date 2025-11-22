import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { db, storage } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'images'));
        const imageUrls = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const { path } = doc.data();
            if (path.endsWith('.webp') || path.endsWith('.gif')) {
              try {
                const url = await getDownloadURL(ref(storage, path));
                return { id: doc.id, url };
              } catch (error) {
                console.error(`Error getting download URL for ${path}:`, error);
                return null;
              }
            } else {
              return null;
            }
          })
        );
        setImages(imageUrls.filter((image) => image !== null));
      } catch (error) {
        console.error('Error fetching images from Firestore:', error);
        setError('Error fetching images. Please try again later.');
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <>
      {error && <p className="text-red-500 text-center w-full">{error}</p>}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry gutter="16px">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="flex justify-center items-center cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                className="block rounded-lg object-cover transition-transform hover:scale-105"
                alt={`Gallery illustration ${image.id}`}
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // Close when clicking on the backdrop
              if (e.target === e.currentTarget) {
                setSelectedImage(null);
              }
            }}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl md:text-4xl hover:text-gray-300 transition-colors z-[10000]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
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
              <img
                src={selectedImage.url}
                alt={`Gallery illustration ${selectedImage.id}`}
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
                draggable="false"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
