const NavButton = ({ onClick, isSelected, label }) => {
  return (
    <button
      onClick={onClick}
      className={`w-4 h-4 pr-2 rounded-full transition-colors duration-300 ${isSelected ? 'bg-[#6f02c6]' : 'bg-[#1d1d1d] hover:bg-[#6f02c6]'}`}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default NavButton;
