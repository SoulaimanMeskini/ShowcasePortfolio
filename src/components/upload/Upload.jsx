import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { FiUploadCloud } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const fetchImages = async () => {
    const querySnapshot = await getDocs(collection(db, 'images'));
    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ ...doc.data(), id: doc.id });
    });
    setUploadedImages(images);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
    setUploadMessage(''); // Clear the message when new files are selected
  }, [files]);

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setUploadMessage('');

    try {
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'images'), {
          path: `images/${file.name}`,
          url,
        });
      });

      await Promise.all(uploadPromises);

      setFiles([]);
      fetchImages(); // Reload the images after upload
      setUploading(false);
      setUploadMessage('Upload successful!');
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploading(false);
      setUploadMessage('Upload failed. Please try again.');
    }
  };

  const handleDeleteClick = (image) => {
    setImageToDelete(image);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return;

    try {
      // Delete the file from Firebase storage
      const storageRef = ref(storage, imageToDelete.path);
      await deleteObject(storageRef);

      // Delete the document from Firestore
      const docRef = doc(db, 'images', imageToDelete.id);
      await deleteDoc(docRef);

      // Update the UI
      setUploadedImages(uploadedImages.filter(img => img.id !== imageToDelete.id));
      setShowConfirmation(false);
      setImageToDelete(null);
      setUploadMessage('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting file:', error);
      setShowConfirmation(false);
      setUploadMessage('Failed to delete image. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
    setImageToDelete(null);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.webp, .gif',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-64 h-64 p-4 border-2 border-dashed rounded-md cursor-pointer transition ${
          isDragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-400 bg-white'
        }`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud size={48} className="text-gray-400" />
        <p className="mt-2 text-lg text-gray-700">
          {isDragActive ? 'Drop the files here ...' : 'Drag & drop some files here, or click to select files'}
        </p>
        <p className="text-sm text-gray-500">Accepted formats: .webp, .gif</p>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img src={file.preview} alt={file.name} className="w-full h-32 object-cover rounded-md" />
              <button
                onClick={() => handleRemoveFile(index)}
                className="absolute top-1 right-1 text-red-600 hover:text-red-800 bg-white rounded-full p-1"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className={`mt-6 px-4 py-2 rounded-md text-white ${
          uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>

      {uploadMessage && (
        <p className="mt-4 text-lg text-center text-gray-700">{uploadMessage}</p>
      )}

      <div className="mt-8 w-full">
        <h2 className="text-lg font-semibold text-gray-700">Uploaded Images:</h2>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image.url} alt={image.path} className="w-full h-32 object-cover rounded-md" />
              <div className="absolute bottom-1 left-1 flex items-center justify-between w-full px-2">
                <a href={image.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{image.path}</a>
                <button onClick={() => handleDeleteClick(image)} className="text-red-600 hover:text-red-800">
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Are you sure?</h2>
            <p className="mt-4 text-gray-600">Do you really want to delete this image? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
              <button onClick={handleDeleteCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
