import React from "react";
import styled from "styled-components";

import Homepage from "./Homepage/Homepage";

const Page = () => {

  const Container = styled.div`
    display: flex;
    flex: 1;
    padding: 32px;
  `;

  return ( 
    <Container>
      <Homepage />
    </Container>
  );
};

export default Page;