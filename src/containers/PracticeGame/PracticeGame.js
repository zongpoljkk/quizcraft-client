import React, { useState } from "react";
import styled from "styled-components";

import { CloseIcon } from "../../components/Icon"
import { ItemCard } from "../../components/ItemCard";
import { Body } from "../../components/Typography";
import { ProblemBox } from "../../components/ProblemBox";
import { AnswerInputBox } from "../../components/AnswerInputBox";

import { COLOR } from "../../global/const"

const PROBLEM = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const ANSWER = '(2^3+4^6)^3-7x';

const PracticeGame = () => {

  const [answer_input, set_answer_input] = useState('');

  return ( 
    <Container>
      <Headline>
        <CloseIcon />
        <ItemCard />
        <ItemCard />
        <Body color={COLOR.MANDARIN}>timer</Body>
      </Headline>
      <ProblemBox
        problem = {PROBLEM}
        problem_content = {PROBLEM_CONTENT}
      />
      <div style={{ marginBottom: 32 }} />
      <AnswerInputBox />
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