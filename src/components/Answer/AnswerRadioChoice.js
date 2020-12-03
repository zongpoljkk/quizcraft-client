import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { Body } from "../Typography";
import { RadioButton } from "../RadioButton"
import { COLOR } from "../../global/const"

import { splitQuestion } from "./AnswertHelper";

const MAX_WIDTH = 350;
const MIN_BLANK_WIDTH = 80;

export const AnswerRadioChoice = ({
  question = '',
  choices = {},
  set_answer,
  answer
}) => {

  const ref = useRef(null);
  const [question_width, set_question_width] = useState();

  useEffect(() => {
    set_question_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 350px;
    flex-wrap: wrap;
  `;

  const BlankField = styled.div.attrs(props => ({
    width: props.width || MIN_BLANK_WIDTH,
    margin_left: props.margin_left|| 8
  }))`
    border: 1px solid ${COLOR.CHARCOAL};
    border-radius: 10px;
    height: 24px;
    width: ${props => props.width}px;
    margin-left: ${props => props.margin_left}px;
    margin-right: 8px;
  `;

  const outputQuestion = (item) => {
    if (item.length === 3 || item[0].type === "content") {
      return (
        <Container>
          <div ref={ref}>
            <Body>{item[0].content}</Body>
          </div>
          {item[1].content === ""
            ? <BlankField 
                width={MAX_WIDTH-question_width-16 > MIN_BLANK_WIDTH 
                  ? MAX_WIDTH-question_width-32
                  : MIN_BLANK_WIDTH
                }
              />
            : <div style={{ marginLeft: 8, marginRight: 8 }}>
                <Body color={COLOR.MANDARIN}>{item[1].content}</Body>
              </div>
          }
          <Body>{item[2]?.content}</Body>
        </Container>
      );
    }
    else {
      return (
        <Container>
          {item[0].content === ""
            ? <BlankField 
                margin_left={1}
                width={MAX_WIDTH-question_width-16 > MIN_BLANK_WIDTH 
                  ? MAX_WIDTH-question_width-32
                  : MIN_BLANK_WIDTH
                }
              />
            : <div style={{ marginLeft: 8, marginRight: 8 }}>
                <Body color={COLOR.MANDARIN}>{item[0].content}</Body>
              </div>
          }
          <div ref={ref}>
            <Body>{item[1].content}</Body>
          </div>
        </Container>
      );
    }
  };

  return ( 
    <Container>
      <div style={{ marginBottom: 16 }}>
        {outputQuestion(splitQuestion(question))}
      </div>
      <div style={{ marginLeft: 16 }}>
        <RadioButton 
          value={answer} 
          selected_value={set_answer}  
          choices={choices}
        />
      </div>
    </Container>
  );
};
