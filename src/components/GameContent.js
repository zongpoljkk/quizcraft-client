import React from "react";
import styled from "styled-components";

import { AnswerMathInput } from "./Answer/AnswerMathInput";
import { AnswerSelectOne } from "./Answer/AnswerSelectOne";
import { AnswerRadioChoice } from "./Answer/AnswerRadioChoice";

import { ANSWER_TYPE } from "../global/const";

const GameContent = ({
  subject,
  type,
  correct_answer = "",
  content = "",
  question = "",
  choices = {},
  answer,
  set_answer,
  disabled
}) => {

  return (
    <Container>
      {type === ANSWER_TYPE.MATH_INPUT && (
        <AnswerMathInput
          correct_answer={correct_answer}
          set_answer={set_answer}
          answer={answer}
          disabled={disabled}
        />
      )}
      {type === ANSWER_TYPE.SELECT_ONE && (
        <AnswerSelectOne
          content={content}
          set_answer={set_answer}
          disabled_select={disabled}
        />
      )}
      {type === ANSWER_TYPE.RADIO_CHOICE && (
        <AnswerRadioChoice
          subject={subject}
          question={question}
          choices={choices}
          set_answer={set_answer}
          answer={answer}
          disabled_select={disabled}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default GameContent;
