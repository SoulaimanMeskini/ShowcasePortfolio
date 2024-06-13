import React from 'react';
import { FaPencilAlt, FaRedo } from 'react-icons/fa';

const NavDraw = ({ onPencilClick, onResetClick }) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4 z-20">
      <button onClick={onPencilClick} className="p-3 bg-[#1d1d1d] text-[#f5f5f5] rounded-full flex items-center justify-center border border-black">
        <FaPencilAlt />
      </button>
      <button onClick={onResetClick} className="p-3 bg-[#1d1d1d] text-[#f5f5f5] rounded-full flex items-center justify-center transition-transform transform hover:scale-125">
        <FaRedo />
      </button>
    </div>
  );
};

export default NavDraw;
