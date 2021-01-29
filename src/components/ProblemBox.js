import React from "react";
import styled from "styled-components";
import Tex2SVG from "react-hook-mathjax";

import { Subheader } from "./Typography";
import GameContent from "./GameContent";

import { ANSWER_TYPE, COLOR, CONTAINER_PADDING } from "../global/const";
import { convertHexToRGBA, useWindowDimensions } from "../global/utils";

export const ProblemBox = ({
  problem = '',
  problem_content = '',
  show_game_content = false,
  answer_type='',
  subject='',
  question='',
  content=''
}) => {

  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const asciimath2latex = require("asciimath-to-latex");

  return (
    <ProblemContainer>
      <ProblemComponent>
        <Subheader>{problem}</Subheader>
        {problem_content ? (
          <Problem width={screen_width - CONTAINER_PADDING - 48}>
            <Subheader>
              <Tex2SVG display="inline" latex={asciimath2latex(problem_content)} />
            </Subheader>
          </Problem>
        ) : show_game_content && (
          <ContentContainer
          width={screen_width - CONTAINER_PADDING - 48}
          alignSelf={
            answer_type === ANSWER_TYPE.MATH_INPUT
              ? "center"
              : "flex-start"
          }
        >
          <GameContent 
            type={answer_type}
            subject={subject}
            question={question}
            content={content}
            display_choice = {false}
            disabled_click = {true}
          />
        </ContentContainer>
        )}
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

const ContentContainer = styled.div.attrs(props => ({
  width: props.width,
  alignSelf: props.alignSelf
}))`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: ${props => props.width}px;
  align-self: ${props => props.alignSelf};
`;
