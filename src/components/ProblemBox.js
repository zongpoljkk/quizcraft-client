import React from "react";
import styled from "styled-components";
import Tex2SVG from "react-hook-mathjax";

import { Subheader } from "./Typography";

import { COLOR, CONTAINER_PADDING } from "../global/const";
import { convertHexToRGBA, useWindowDimensions, cDot2TimesFormat } from "../global/utils";

export const ProblemBox = ({
  problem = '',
  problem_content = '',
}) => {

  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const asciimath2latex = require("asciimath-to-latex");

  const splitProblem = (problem_content) => {
    const split_problem = problem_content.split("{");
    var non_math_text;
    if (split_problem.length > 1) {
      non_math_text = split_problem[1].replace("}", "");
      return (
        <Subheader>
          <Tex2SVG
            display="inline"
            latex={asciimath2latex(cDot2TimesFormat(split_problem[0]))}
          />
          <div style={{marginRight: "8px"}}/>
          {non_math_text}
        </Subheader>
      );
    }
    return (
      <Subheader>
        <Tex2SVG
          display="inline"
          latex={asciimath2latex(cDot2TimesFormat(split_problem[0]))}
        />
      </Subheader>
    );
  }; 

  return (
    <ProblemContainer>
      <ProblemComponent>
        <Subheader>{problem}</Subheader>
        {problem_content ? (
          <Problem width={screen_width - CONTAINER_PADDING - 48}>
            {splitProblem(problem_content)}
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
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 3px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${convertHexToRGBA(COLOR.CHARCOAL, 40)};
  }
`;
