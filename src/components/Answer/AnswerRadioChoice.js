import React from "react";
import styled from "styled-components";

import { Body } from "../Typography";
import { RadioButton } from "../RadioButton";
import { DisplayText } from "../HandleText";

import { COLOR, CONTAINER_PADDING } from "../../global/const";
import { useWindowDimensions, convertHexToRGBA } from "../../global/utils";

import { splitQuestion } from "./AnswertHelper";

const MIN_BLANK_WIDTH = 40;
const MAX_BLANK_WIDTH = 140;

export const AnswerRadioChoice = ({
  subject,
  question = '',
  choices = {},
  set_answer = '',
  answer,
  display_choice = true,
  disabled_select
}) => {

  const { height, width: screen_width } = useWindowDimensions();

  const outputQuestion = (item) => {
    if (item.length === 3 || item[0].type === "content") {
      return (
        <QuestionContainer>
          <Body>{item[0].content}</Body>
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
    else {
      return (
        <QuestionContainer>
          {item[0].content === ""
            ? <BlankField margin_left={1}/>
            : <div style={{ marginLeft: 8, marginRight: 8 }}>
                <Body color={COLOR.MANDARIN}>{item[0].content}</Body>
              </div>
          }
          <Body>{item[1].content}</Body>
        </QuestionContainer>
      );
    }
  };


  return (
    <Container width={display_choice ? screen_width-CONTAINER_PADDING : screen_width-CONTAINER_PADDING-48}>
      <div style={{ marginBottom: display_choice ? 16 : 0 }}>
        {subject === "คณิตศาสตร์"
          ? (
            <QuestionContainer>
              <DisplayText content={question}/>
            </QuestionContainer>
          )
          : outputQuestion(splitQuestion(question))
        }
      </div>
      <div style={{ marginLeft: 16 }}>
        <RadioButton
          value={answer}
          subject={subject}
          selected_value={set_answer}
          choices={display_choice ? choices : []}
          disabled_select={disabled_select}
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