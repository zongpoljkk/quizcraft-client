import React from "react";
import styled from "styled-components";

import { Body } from "./Typography";

import { COLOR } from "../global/const"

export const Report = ({
  color,
  onClick = () => {},
}) => {

  return (
    <Container onClick={onClick}>
      {/* report flag */}
      <Body color={color} textDecoration="underline">รายงาน</Body>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;