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

  const mapDocsToImages = async (docs) => {
    const imageUrls = await Promise.all(
      docs.map(async (doc) => {
        const { path, url } = doc.data();

        if (path) {
          const lowerPath = path.toLowerCase();
          if (
            lowerPath.endsWith('.webp') ||
            lowerPath.endsWith('.gif') ||
            lowerPath.endsWith('.png') ||
            lowerPath.endsWith('.jpg') ||
            lowerPath.endsWith('.jpeg')
          ) {
            try {
              const freshUrl = await getDownloadURL(ref(storage, path));
              return { id: doc.id, url: freshUrl };
            } catch (storageError) {
              console.error(`Error getting download URL for ${path}:`, storageError);
            }
          }
        }

        // Fallback for legacy docs that only have direct URL stored.
        if (url) {
          return { id: doc.id, url };
        }

        return null;
      })
    );
    return imageUrls.filter((image) => image !== null);
  };

  const fetchImages = async () => {
    setError('');

    try {
      const querySnapshot = await getDocs(collection(db, 'images'));
      const mappedImages = await mapDocsToImages(querySnapshot.docs);

      setImages(mappedImages);
    } catch (fetchError) {
      console.error('Error fetching images from Firestore:', fetchError);
      setError('Error fetching images. Storage quota may be exceeded.');
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                onError={() => setImages((prev) => prev.filter((img) => img.id !== image.id))}
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
