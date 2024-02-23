import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";

// Styled components for the eyes container, box, and the pupil
const EyesContainer = styled.div`
  display: flex;
  justify-content: space-around; // Space the eyes apart
  width: 450px; // Container width to fit both eyes comfortably
`;

const Box = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; // Ensure nothing goes outside the box
`;

const Pupil = styled.div`
  position: absolute;
  width: 100px; // pupil size to fit the design
  height: 100px;
  background-color: black;
  border-radius: 50%;
`;

const Eye = ({ eyeRef }) => {
  const [pupilPosition, setPupilPosition] = useState({ x: 72, y: 72 });

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      if (eyeRef.current) {
        const box = eyeRef.current.getBoundingClientRect();
        const pupilRadius = 40; // Radius for the pupil size
        const boxWidth = box.width - pupilRadius * 2;
        const boxHeight = box.height - pupilRadius * 2;

        let x = e.clientX - box.left - pupilRadius;
        let y = e.clientY - box.top - pupilRadius;

        x = Math.max(0, Math.min(x, boxWidth));
        y = Math.max(0, Math.min(y, boxHeight));

        requestAnimationFrame(() => setPupilPosition({ x, y }));
      }
    }, 10);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [eyeRef]); // Dependency array includes eyeRef to ensure effect is properly applied per eye

  return (
    <Pupil
      style={{ left: `${pupilPosition.x}px`, top: `${pupilPosition.y}px` }}
    />
  );
};

const Eyes = () => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  return (
    <EyesContainer>
      <Box ref={leftEyeRef}>
        <Eye eyeRef={leftEyeRef} />
      </Box>
      <Box ref={rightEyeRef}>
        <Eye eyeRef={rightEyeRef} />
      </Box>
    </EyesContainer>
  );
};

export default Eyes;
