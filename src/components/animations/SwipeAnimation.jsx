import handImage from '../../assets/Hand.webp';

const SwipeAnimation = () => {
  return (
    <div className="flex justify-center items-center text-black relative w-12 h-12">
      <div className="path bg-[#6f02c6] opacity-45 rounded-full absolute animate-swipe-dot"></div>
      <div className="hand-icon bg-center bg-no-repeat bg-cover w-9 h-9 animate-swipe-hand"></div>
      <style>{`
        .hand-icon {
          background-image: url(${handImage});
          background-size: contain;
          transform: rotate(-15deg);
          top: 10px; /* Adjust this value to change the top position of the hand */
          transform-origin: 80% 10%;
        }
        .path {
          transform-origin: 50% 50%;
          align-content: end;
          width: 8px;
          height: 8px;
          transform: translateX(-50%);
          visibility: hidden;
          transform: rotatex(180deg);
          transform-origin: top;
          position: absolute;
        }
        @keyframes swipe-hand {
          0%, 100% {
            transform: translateY(0) rotate(-50deg);
          }
          50% {
            transform: translateY(-20px) rotate(-50deg); /* Adjust this value to change the swipe distance */
          }
        }
        @keyframes swipe-dot {
          0% {
            visibility: hidden;
          }
          12% {
            visibility: visible;
            
          }
          50% {
            visibility: visible;
            height: 18px;

          }
          62% {
            visibility: hidden;
            height: 18px;
          }
        }
        .animate-swipe-hand {
          animation: swipe-hand 2s infinite ease-in;
          animation-direction: reverse;
        }
        .animate-swipe-dot {
          animation: swipe-dot 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SwipeAnimation;
