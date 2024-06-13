import React, { useCallback, useRef, useState } from "react";
import {  storage } from "../firebase/config";
import { ref, uploadBytesResumable} from "firebase/storage";

const Upload = () => {
  const [fileobj, setfileobj] = useState(null);
  const imageReft = useRef(null);

  const uploadImage = useCallback(() => {
    const storageRef = ref(storage, "images");

    // 'file' comes from the Blob or File API
      console.log(imageReft.current?.target);
      console.log(imageReft.current?.target);
    uploadBytesResumable(storage, imageReft.current?.target, { }).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // storageRef.put(imageReft.current).on(
    //   "state_changed",
    //   (snap) => {
    //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //   },
    //   (err) => {
    //     setError(err);
    //   },
    //   async () => {
    //     const url = await storageRef.getDownloadURL();
    //     const createdAt = timestamp();
    //     await collectionRef.add({ url, createdAt });
    //     setUrl(url);
    //   }
    // );
  }, [fileobj, imageReft]);

  return (
    <div className="flex h-screen w-full overflow-hidden md:flex-row flex-col">
      <div className="flex-1 overflow-y-scroll h-full md:h-screen">
        <div className="flex h-screen justify-center items-center w-full">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl">Hello world</h1>
            <hr className="w-full border-t-1.5 border-black rounded" />
            <p className="text-md">
              Click{" "}
              <a href="/" className="text-blue-500 hover:text-blue-700">
                here
              </a>{" "}
              to get back to the home screen.
            </p>
            <button onClick={uploadImage}>Knopje</button>
            <input
              type="file"
              accept="image/*"
              ref={imageReft}
              onChange={(x) => {
                console.log(x.target);
                setfileobj(x.target);
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
