import React, { useState } from "react";
import styled from "styled-components";

import { CloseIcon } from "../../components/Icon"
import { ItemCard } from "../../components/ItemCard";
import { TimeCounting } from "../../components/TimeCounting";
import { ProblemBox } from "../../components/ProblemBox";
import { AnswerMathInput } from "../../components/Answer/AnswerMathInput";
import { AnswerSelectOne } from "../../components/Answer/AnswerSelectOne";

const PROBLEM = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const ANSWER = '(2^3+4^6)^3-7x^(x+1)';
const CONTENT1 = 'You can only join the football team if you can [stay&to stay] late on Mondays.';
const CONTENT2 = '[You&I] can only join the football team if you can stay late on Mondays.';
const CONTENT3 = 'You can only join the football team if you can stay late on [Mondays&Fridays].';

const PracticeGame = () => {

  const [answer, set_answer] = useState();

  return ( 
    <Container>
      <Headline>
        <CloseIcon />
        <ItemCard />
        <ItemCard />
        <TimeCounting />
      </Headline>
      <ProblemBox
        problem={PROBLEM}
        problem_content={PROBLEM_CONTENT}
      />
      <div style={{ marginBottom: 32 }} />
      <AnswerMathInput
        correct_answer={ANSWER}
        set_answer={set_answer}
      />
      <AnswerSelectOne
        content={CONTENT1}
        set_answer={set_answer}
      />
      <div style={{ marginBottom: 36 }} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export default PracticeGame;