import React from "react";
import styled from "styled-components";

import Homepage from "./Homepage/Homepage";
import PracticeGame from "./PracticeGame/PracticeGame";

const Page = () => {

  const Container = styled.div`
    display: flex;
    flex: 1;
    padding: 32px;
  `;

  return ( 
    <Container>
      <PracticeGame />
    </Container>
  );
};

export default Page;