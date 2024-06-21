import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = ({ width = '380px', height = '55px' }) => {
  return (
    <footer
      className="bg-[#1d1d1d] text-[#f5f5f5] px-6 py-1 mb-5 rounded-full flex justify-between items-center mx-auto"
      style={{ width, height }}
    >
      <div className="text-sm">
        &copy; {new Date().getFullYear()} Soulaiman Meskini
      </div>
      <div className="flex justify-end space-x-4">
        <a
          draggable="false"
          href="https://github.com/SoulaimanMeskini"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f5f5f5] text-2xl transition-colors duration-300 hover:text-[#6f02c6]"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          draggable="false"
          href="https://www.instagram.com/zwittsal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f5f5f5] text-2xl transition-colors duration-300 hover:text-[#6f02c6]"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          draggable="false"
          href="https://www.linkedin.com/in/soulaiman-meskini-822b761a9/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f5f5f5] text-2xl transition-colors duration-300 hover:text-[#6f02c6]"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
