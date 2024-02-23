import React from "react";
import styled from "styled-components";

import Eyes from "../components/Eyes";

export const HomeComponent = () => {
  return (
    <>
      <Home>
        <Eyes></Eyes>
      </Home>
    </>
  );
};

const Home = styled.div`
  p {
    color: whitesmoke;
  }
`;

export default HomeComponent;
