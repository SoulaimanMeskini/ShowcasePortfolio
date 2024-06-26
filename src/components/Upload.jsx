import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { FiUploadCloud } from 'react-icons/fi';
import { AiOutlineFileImage } from 'react-icons/ai';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
    setUploadMessage(''); // Clear the message when new files are selected
  }, [files]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setUploadMessage(''); // Clear the message when new files are selected
    }
  };

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
      setUploading(false);
      setUploadMessage('Upload successful!');
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploading(false);
      setUploadMessage('Upload failed. Please try again.');
    }
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
        <div className="mt-4 w-64">
          <h2 className="text-lg font-semibold text-gray-700">Selected files:</h2>
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <AiOutlineFileImage size={24} className="text-gray-400" />
                <span className="text-sm text-gray-700">{file.name}</span>
              </li>
            ))}
          </ul>
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
    </div>
  );
};

export default Upload;
