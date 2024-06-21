import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, 'images'));
      const imageUrls = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const url = await getDownloadURL(ref(storage, doc.data().path));
          return { id: doc.id, url };
        })
      );
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="w-full h-48">
          <img src={image.url} alt={`Gallery illustration ${image.id}`} className="w-full h-full object-cover rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
