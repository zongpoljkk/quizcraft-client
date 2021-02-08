import React from "react";
import styled from "styled-components";

import { NAVBAR_HEIGHT } from "../global/const";

const Page = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 32px;
  margin-top: ${NAVBAR_HEIGHT}px;
`;

export default Page;
