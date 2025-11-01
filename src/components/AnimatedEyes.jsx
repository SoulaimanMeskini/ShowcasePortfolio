import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EyesLayout from "../assets/Eyeslayout.webp";
import EyeBall from "../assets/Eyeball.webp";

const AnimatedEyes = () => {
  const Eye = () => {
    return (
      <div className="relative flex justify-center items-center" style={{ margin: "0 5%" }}>
        <div className="relative w-[80px] h-[42px] flex justify-center items-center rounded-full overflow-hidden border-4 border-[#f5f5f5]">
          <motion.img
            className="absolute w-[28px] h-[28px] rounded-full"
            src={EyeBall}
            initial={{
              left: "30%",
              top: "50%",
              x: "-50%",
              y: "-50%"
            }}
            animate={{
              left: ["30%", "70%", "30%"],
              top: "50%",
              x: "-50%",
              y: "-50%"
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            style={{
              userSelect: "none",
              pointerEvents: "none"
            }}
            draggable="false"
            alt="Eye Ball"
          />
          <img
            className="absolute h-full w-full object-cover"
            src={EyesLayout}
            style={{
              userSelect: "none",
              pointerEvents: "none"
            }}
            draggable="false"
            alt="Eye Layout"
          />
        </div>
      </div>
    );
  };

  return (
    <Link to="/draw" className="cursor-pointer">
      <div className="flex justify-center items-center">
        <Eye />
        <Eye />
      </div>
    </Link>
  );
};

export default AnimatedEyes;

