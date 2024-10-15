import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className="flex justify-center items-center min-h-screen py-20 px-16">
      <div className="w-full max-w-7xl">
        {error && <p className="text-red-500 text-center w-full">{error}</p>}
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry gutter="16px">
            {images.map((image) => (
              <div key={image.id} className="flex justify-center items-center">
                <img
                  src={image.url}
                  className="block rounded-lg object-cover"
                  alt={`Gallery illustration ${image.id}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default ImageGallery;
