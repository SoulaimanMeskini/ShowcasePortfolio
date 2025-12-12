import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Socials = () => {
  return (
    <>
      <a
        draggable="false"
        href="https://github.com/SoulaimanMeskini"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1d1d1d] text-3xl transition-colors duration-300 hover:text-[#6f02c6]"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        draggable="false"
        href="https://www.instagram.com/zwittsal"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1d1d1d] text-3xl transition-colors duration-300 hover:text-[#6f02c6]"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a
        draggable="false"
        href="https://www.linkedin.com/in/soulaiman-meskini-822b761a9/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1d1d1d] text-3xl transition-colors duration-300 hover:text-[#6f02c6]"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
    </>
  );
};

export default Socials;
