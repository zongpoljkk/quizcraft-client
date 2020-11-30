import React from "react";
import styled from "styled-components";

import { Subheader } from "./Typography";

import { COLOR } from "../global/const"

export const ProblemBox = ({
  problem = '',
  problem_content = '',
}) => {

  const ProblemContainer = styled.div`
    background: ${COLOR.ISLAND_SPICE};
    border-radius: 10px;
    padding: 24px;
  `;

  const Problem = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px
  `;

  return ( 
    <ProblemContainer>
      <Subheader>{problem}</Subheader>
      <Problem>
        <Subheader>{problem_content}</Subheader>
      </Problem>
    </ProblemContainer>
  );
};
