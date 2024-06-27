import React from 'react';
import { FaPencilAlt, FaRedo } from 'react-icons/fa';

const NavDraw = ({ onPencilClick, onResetClick, showText }) => {
  return (
    <div>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4 z-20">
        <button
          onClick={onPencilClick}
          className="p-3 bg-[#1d1d1d] text-[#f5f5f5] rounded-full flex items-center justify-center border border-black"
          aria-label="Pencil"
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={onResetClick}
          className="p-3 bg-[#1d1d1d] text-[#f5f5f5] rounded-full flex items-center justify-center transition-transform transform hover:scale-125"
          aria-label="Reset"
        >
          <FaRedo />
        </button>
      </div>
      {showText && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
          <h1 className="text-2xl text-[#1d1d1d] bg-[#f5f5f5] p-2 rounded">
            You can draw on the screen
          </h1>
        </div>
      )}
    </div>
  );
};

export default NavDraw;
