import { useState, useEffect, useCallback } from "react";
import { useTheme } from "./ThemeProvider";
import EyesLayout from "../assets/Eyeslayout.webp";
import EyeBall from "../assets/Eyeball.webp";

/**
 * 
 * @param {Integer} scalingFactor decimal value like 1.8 for 180% scaling
 * @returns 
 */
const FollowingEyes = ({ scalingFactor = 1, upscale = 1 }) => {
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  const { theme } = useTheme();

  const handleMouseMove = useCallback((event) => {
    const x = (event.clientX * 100) / window.innerWidth;
    const y = (event.clientY * 100) / window.innerHeight;
    setMousePosition({ x: `${x}%`, y: `${y}%` });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const defaultWidtLayout = (250 * upscale) * scalingFactor;
  const defaultHightLayout = (130 * upscale) * scalingFactor;
  const borderColor = theme === 'dark' ? '#1d1d1d' : '#f5f5f5';
  // Use the same background color as the page (from CSS variable)
  const backgroundColor = theme === 'dark' ? '#1d1d1d' : 'transparent';
  const classNameStringLayout = `relative w-[${defaultWidtLayout}px] h-[${defaultHightLayout}px] flex justify-center items-center rounded-full overflow-hidden border-8 max-sm:w-[130px] max-sm:h-[70px]`;

  const defaultDiameterEyeball = (90 * upscale) * scalingFactor;
  const classNameStringEyeball = `absolute w-[${defaultDiameterEyeball}px] h-[${defaultDiameterEyeball}px] top-[50%] left-[50%] rounded-full max-sm:w-12 max-sm:h-12`;


  const Eye = ({ mousePosition }) => {
    return (
      <div className="relative flex justify-center items-center" style={{ margin: "0 10%" }}>
        <div className={classNameStringLayout} style={{ borderColor: borderColor, backgroundColor: backgroundColor }}>
          <img
            className={classNameStringEyeball}
            src={EyeBall}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: `translate(-${mousePosition.x}, -${mousePosition.y})`,
              userSelect: "none",
              pointerEvents: "none",
              filter: theme === 'dark' ? 'invert(1) brightness(2)' : 'none'
            }}
            draggable="false"
            alt="Eye Ball"
          />
          <img
            className="absolute h-full w-full"
            src={EyesLayout}
            style={{
              userSelect: "none",
              pointerEvents: "none",
              filter: theme === 'dark' ? 'invert(1) brightness(2)' : 'none'
            }}
            draggable="false"
            alt="Eye Layout"
          />
        </div>
      </div>
    )
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Eye mousePosition={mousePosition} />
      <Eye mousePosition={mousePosition} />
    </div>
  );
};

export default FollowingEyes;