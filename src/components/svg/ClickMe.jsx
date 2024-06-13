const ClickMe = () => {
  return (
    <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="curvedPath" fill="transparent" d="M20,80 Q100,10 180,80" />
      </defs>
      <text fill="#1d1d1d" fontSize="18" fontWeight="bold">
        <textPath href="#curvedPath" startOffset="50%" textAnchor="middle">
          Click me
        </textPath>
      </text>
    </svg>
  );
};

export default ClickMe;
