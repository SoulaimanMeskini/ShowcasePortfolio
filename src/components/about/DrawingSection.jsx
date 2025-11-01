import React from 'react';
import Draw from '../Draw';

const DrawingSection = () => {
  return (
    <div className="h-full w-full flex justify-center items-center relative">
      <Draw enableDrawing={false} enableLink={false} />
    </div>
  );
};

export default DrawingSection;

