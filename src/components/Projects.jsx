import React from 'react';
import EyesHover from './EyesHover';

const ComingSoonPage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden md:flex-row flex-col">
      {/* Left container - EyesHover */}
      <div className="hidden md:flex justify-start items-center w-full md:w-1/2 h-full">
        <div className="transform scale-75 -ml-20">
          <EyesHover />
        </div>
      </div>
      
      {/* Right container - Coming soon message */}
      <div className="flex-1 overflow-y-scroll h-full md:h-screen">
        <div className="flex h-screen justify-center items-center w-full">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold">Coming Soon</h1>
            <hr className="w-full border-t-1.5 border-black rounded" />
            <p className="text-md text-center">
              We're working hard to bring you new content. Stay tuned!
            </p>
            <p className="text-md text-center">
              In the meantime, click <a href="/" className="text-[#6f02c6] font-semibold">here</a> to return to the home page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
