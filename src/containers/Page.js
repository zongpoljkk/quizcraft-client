import React from "react";
import styled from "styled-components";


const Page = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 32px;
`;

export default Page;
