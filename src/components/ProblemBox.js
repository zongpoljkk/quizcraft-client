import React from "react";
import styled from "styled-components";
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";
import { MathParser } from "mathlex"

import { Subheader } from "./Typography";

import { COLOR } from "../global/const";

export const ProblemBox = ({
  problem = '',
  problem_content = '',
}) => {

  const tex = "(-2)^{-13}*(-2)^{-6}";
  const tex1 = "\\frac{2}{3}"
  const tex2 = "(-2)^{-13}*(-2)^{-6}*\\frac{2}{3}*\\frac{4}{5}"
  const tex3 = "\\frac{(-8)^{9}*(-8)^{29}*(-8)^{-29}}{(-8)^{-32}*(-8)^{38}*(-8)^{20}}"
  const tex4 = "0.0000000058552"
  const math = "((-7/6)^[-31]*(-7/6)^[-18]*(-7/6)^[-21]*(-7/6)^[20]*(-7/6)^[19])/((-7/6)^[-18]*(-7/6)^[-18]*(-7/6)^[45])"

  const MathToLetex = (math) => {
    console.log(math)
    var syntaxTree = MathParser.parse(math);
    // var latexCode = MathParser.render(syntaxTree, 'latex');
    // console.log({syntaxTree});
    // console.log({latexCode});
    // return latexCode;
    return math;
  };

  return (
    <ProblemContainer>
      <Subheader>{problem}</Subheader>
      {problem_content
        ? <Problem>
            {/* <Subheader>{problem_content}</Subheader> */}
            {/* <Subheader>
              <Tex2SVG display="inline" latex={tex3} />
            </Subheader> */}
            <div>
              {MathToLetex(math)}
            </div>
          </Problem>
        : null
      }
    </ProblemContainer>
  );
};

const ProblemContainer = styled.div`
  background: ${COLOR.ISLAND_SPICE};
  border-radius: 10px;
  padding: 24px;
`;

const Problem = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  text-align: center;
`;
