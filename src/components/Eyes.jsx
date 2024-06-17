import { useState, useEffect, useCallback } from "react";
import EyesLayout from "../assets/Eyeslayout.png";
import EyeBall from "../assets/Eyeball.png";

const FollowingEyes = () => {
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });

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

  return (
    <div className="flex justify-center items-center h-full">
      {/* Left Eye */}
      <div className="relative flex justify-center items-center mx-16">
        <div className="relative w-[250px] h-[130px] flex justify-center items-center rounded-full overflow-hidden border-8 border-[#f5f5f5] max-sm:w-[130px] max-sm:h-[70px]">
          <img
            className="absolute w-[102px] h-[100px] top-[50%] left-[50%] rounded-full max-sm:w-12 max-sm:h-12"
            src={EyeBall}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: `translate(-${mousePosition.x}, -${mousePosition.y})`,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable="false"
            alt="Eye Ball"
          />
          <img
            draggable="false"
            className="absolute h-full w-full"
            src={EyesLayout}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
            alt="Eye Layout"
          />
        </div>
      </div>
      {/* Right Eye */}
      <div className="relative flex justify-center items-center mx-16">
        <div className="relative w-[250px] h-[130px] flex justify-center items-center rounded-full overflow-hidden border-8 border-[#f5f5f5] max-sm:w-[130px] max-sm:h-[70px]">
          <img
            className="absolute w-[100px] h-[100px] top-[50%] left-[50%] rounded-full max-sm:w-12 max-sm:h-12"
            src={EyeBall}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: `translate(-${mousePosition.x}, -${mousePosition.y})`,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable="false"
            alt="Eye Ball"
          />
          <img
            draggable="false"
            className="absolute h-full w-full"
            src={EyesLayout}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
            alt="Eye Layout"
          />
        </div>
      </div>
    </div>
  );
};

export default FollowingEyes;
