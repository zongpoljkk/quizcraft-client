import React from "react";
import styled from "styled-components";

import Homepage from "./Homepage/Homepage";
import PracticeGame from "./PracticeGame/PracticeGame";

const Page = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 32px;
`;

export default Page;
