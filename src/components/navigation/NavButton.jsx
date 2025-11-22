import { useTheme } from '../ThemeProvider';

const NavButton = ({ onClick, isSelected, label }) => {
  const { theme } = useTheme();
  const unselectedColor = theme === 'dark' ? 'bg-white' : 'bg-[#1d1d1d]';
  
  return (
    <button
      onClick={onClick}
      className={`w-4 h-4 pr-2 rounded-full transition-colors duration-300 ${isSelected ? 'bg-[#6f02c6]' : `${unselectedColor} hover:bg-[#6f02c6]`}`}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default NavButton;
