import React from "react";
import styled from "styled-components";

import { Subheader } from "../../../components/Typography";

import { COLOR } from "../../../global/const"

export const PointBox = ({ points }) => {

  return (
    <Container backgroundColor={COLOR.MANDARIN}>
      <Subheader color={COLOR.WHITE}>{points}</Subheader>
    </Container>
  );
};

const Container = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;