import React from "react";
import styled from "styled-components";

const Page = ({
  children
}) => {

  const Container = styled.div`
    display: flex;
    flex: 1;
    padding: 32px;
  `;

  return ( 
    <Container>
      {children}
    </Container>
  );
};

export default Page;