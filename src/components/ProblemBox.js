import React from "react";
import styled from "styled-components";
import Tex2SVG from "react-hook-mathjax";

import { Subheader } from "./Typography";

import { COLOR, CONTAINER_PADDING } from "../global/const";
import { useWindowDimensions } from "../global/utils";

export const ProblemBox = ({
  problem = '',
  problem_content = '',
}) => {

  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const asciimath2latex = require("asciimath-to-latex");

  return (
    <ProblemContainer>
      <ProblemComponent>
        <Subheader>{problem}</Subheader>
        {problem_content ? (
          <Problem width={screen_width - CONTAINER_PADDING - 48}>
            <Tex2SVG
              display="inline"
              latex={asciimath2latex(problem_content)}
            />
          </Problem>
        ) : null}
      </ProblemComponent>
    </ProblemContainer>
  );
};

const ProblemContainer = styled.div`
  background: ${COLOR.ISLAND_SPICE};
  border-radius: 10px;
  padding: 24px;
`;

const ProblemComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Problem = styled.image.attrs(props => ({
  width: props.width
}))`
  max-width: ${props => props.width}px;
  margin-top: 16px;
  align-self: center;
`;
