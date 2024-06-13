const MouseAnimation = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="relative border-2 border-[#1d1d1d] rounded-full box-border"
        style={{
          width: '30px',
          height: '50px',
        }}
      >
        <div
          className="absolute bg-[#6f02c6] rounded-full box-border animate-sdb9"
          style={{
            width: '5px',
            height: '6px',
            top: '7px',
            left: '50%',
            marginLeft: '-3px',
            animation: 'sdb9 2s infinite',
          }}
        ></div>
      </div>
      <style>{`
        @keyframes sdb9 {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          80% {
            transform: translate(0, 20px);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MouseAnimation;
