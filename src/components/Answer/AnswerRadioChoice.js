import React from "react";
import styled from "styled-components";
import Tex2SVG from "react-hook-mathjax";

import { Body } from "../Typography";
import { RadioButton } from "../RadioButton";

import { COLOR, CONTAINER_PADDING } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import { splitQuestion } from "./AnswertHelper";

const MIN_BLANK_WIDTH = 40;
const MAX_BLANK_WIDTH = 140;

export const AnswerRadioChoice = ({
  question = '',
  subject = '',
  choices = {},
  set_answer,
  answer
}) => {

  const { height, width: screen_width } = useWindowDimensions();
  const asciimath2latex = require("asciimath-to-latex");

  const outputQuestion = (item) => {
    if (item.length === 3 || item[0].type === "content") {
      return (
        <QuestionContainer>
          <div>
            <Body>{item[0].content}</Body>
          </div>
          {item[1].content === ""
            ? <BlankField />
            : <div style={{ marginLeft: 8, marginRight: 8 }}>
                <Body color={COLOR.MANDARIN}>{item[1].content}</Body>
              </div>
          }
          <Body>{item[2]?.content}</Body>
        </QuestionContainer>
      );
    }
    else if(item){
      return (
        <QuestionContainer>
          <div>
            <Body>
              <Tex2SVG display="inline" latex={asciimath2latex(item)} />
            </Body>
          </div>
        </QuestionContainer>
      );
    }
    else {
      return (
        <QuestionContainer>
          {item[0].content === ""
            ? <BlankField margin_left={1}/>
            : <div style={{ marginLeft: 8, marginRight: 8 }}>
                <Body color={COLOR.MANDARIN}>{item[0].content}</Body>
              </div>
          }
          <div>
            <Body>{item[1].content}</Body>
          </div>
        </QuestionContainer>
      );
    }
  };

  return (
    <Container width={screen_width - CONTAINER_PADDING}>
      <div style={{ marginBottom: 16 }}>
        {subject === "คณิตศาสตร์"
          ? outputQuestion(question)
          : outputQuestion(splitQuestion(question))}
      </div>
      <div style={{ marginLeft: 16 }}>
        <RadioButton
          value={answer}
          subject={subject}
          selected_value={set_answer}
          choices={choices}
        />
      </div>
    </Container>
  );
};

const Container = styled.div.attrs(props => ({
  width: props.width,
}))`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: ${props => props.width}px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BlankField = styled.div.attrs(props => ({
  margin_left: props.margin_left|| 8
}))`
  display: flex;
  flex: 1;
  border: 1px solid ${COLOR.CHARCOAL};
  border-radius: 10px;
  height: 24px;
  min-width: ${MIN_BLANK_WIDTH}px;
  max-width: ${MAX_BLANK_WIDTH}px;
  margin-left: ${props => props.margin_left}px;
  margin-right: 8px;
`;