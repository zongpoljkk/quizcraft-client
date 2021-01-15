import React from "react";
import styled from "styled-components";

import { COLOR } from "../global/const";

export const ProblemIndex = ({
  indexes,
  current_index,
}) => {

  return ( 
    <Container>
      {Array.from(Array(indexes)).map((x, index) =>
        <IndexBox
          key={index}
          color={index < current_index ? COLOR.GOLDEN_TAINOI : COLOR.ISLAND_SPICE}
          marginRight={index === indexes-1 ? 0 : 2}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-self: center;
`;

const IndexBox = styled.div.attrs(props => ({
  color: props.color,
  marginRight: props.marginRight
}))`
  background: ${props => props.color};
  border-radius: 10px;
  height: 8px;
  width: 100%;
  margin-right: ${props => props.marginRight}px;
`;
