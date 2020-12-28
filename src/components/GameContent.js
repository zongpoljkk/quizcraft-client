import React, { useEffect } from "react";
import styled from "styled-components";

import { AnswerMathInput } from "./Answer/AnswerMathInput";
import { AnswerSelectOne } from "./Answer/AnswerSelectOne";
import { AnswerRadioChoice } from "./Answer/AnswerRadioChoice";

import { ANSWER_TYPE } from "../global/const";

const GameContent = ({
  type,
  correct_answer = "",
  content = "",
  question = "",
  choices = {},
  answer,
  set_answer,
}) => {
  const checkMathInput = () => {
    console.log(correct_answer);
    // console.log(answer);
    if (type === ANSWER_TYPE.MATH_INPUT) {
      const base = document
        .getElementById("answerBox_0")
        .getElementsByTagName("input")[0].value;
      const exponent = document
        .getElementById("answerBox_1")
        .getElementsByTagName("input")[0].value;
      console.log(base);
      console.log(exponent);
    }
  };

  useEffect(() => {
  });

  return (
    <Container>
      {type === ANSWER_TYPE.MATH_INPUT && (
        <AnswerMathInput
          correct_answer={correct_answer}
          set_answer={set_answer}
        />
      )}
      {type === ANSWER_TYPE.SELECT_ONE && (
        <AnswerSelectOne content={content} set_answer={set_answer} />
      )}
      {type === ANSWER_TYPE.RADIO_CHOICE && (
        <AnswerRadioChoice
          question={question}
          choices={choices}
          set_answer={set_answer}
          answer={answer}
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
