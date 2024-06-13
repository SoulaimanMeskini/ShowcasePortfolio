import React from 'react';

const NavButton = ({ onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`w-4 h-4 pr-2 rounded-full transition-colors duration-300 ${isSelected ? 'bg-[#6f02c6]' : 'bg-[#1d1d1d] hover:bg-[#6f02c6]'} text-white`}
    >
    </button>
  );
};

export default NavButton;
