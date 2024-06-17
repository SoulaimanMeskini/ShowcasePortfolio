const CloseText = () => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path id="closeTextPath" fill="none" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
      <text fill="#1d1d1d" fontSize="15">
        <textPath href="#closeTextPath" startOffset="50%" textAnchor="middle">
          Close
        </textPath>
      </text>
    </svg>
  );
};

export default CloseText;
