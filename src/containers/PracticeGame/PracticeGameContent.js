import React, { useState } from "react";
import styled from "styled-components";

import { AnswerMathInput } from "../../components/Answer/AnswerMathInput";
import { AnswerSelectOne } from "../../components/Answer/AnswerSelectOne";
import { AnswerRadioChoice } from "../../components/Answer/AnswerRadioChoice";

import { ANSWER_TYPE } from "../../global/const"

const PracticeGameContent = ({
  type,
  correct_answer='',
  content='',
  question='',
  choices={}
}) => {

  const [answer, set_answer] = useState();

  return ( 
    <Container>
      { type === ANSWER_TYPE.MATH_INPUT &&
        <AnswerMathInput
          correct_answer={correct_answer}
          set_answer={set_answer}
        />
      }
      { type === ANSWER_TYPE.SELECT_ONE &&
        <AnswerSelectOne
          content={content}
          set_answer={set_answer}
        />
      }
      { type === ANSWER_TYPE.RADIO_CHOICE &&
        <AnswerRadioChoice
          question={question}
          choices = {choices}
          set_answer={set_answer}
          answer={answer}
        />
      }
      {console.log("practice",{answer})}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default PracticeGameContent;