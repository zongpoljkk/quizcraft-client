import React from "react";
import styled from "styled-components";

import { ExitModal } from "../../components/ExitModal"
import { ItemCard } from "../../components/ItemCard";
import { TimeCounting } from "../../components/TimeCounting";
import { ProblemBox } from "../../components/ProblemBox";
import PracticeGameContent from "./PracticeGameContent";

import { ANSWER_TYPE } from "../../global/const"

// MOCK DATA
const PROBLEM = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const ANSWER = '(2^[3]+4^[2])^[3]-7x^[(x+1)]';
const CONTENT1 = 'You can only join the football team if you can [stay&to stay] late on Mondays.';
const CONTENT2 = '[You&I] can only join the football team if you can stay late on Mondays.';
const CONTENT3 = 'You can only join the football team if you can stay late on [Mondays&Fridays].';
const QUESTION1 = 'He runs quite [slow,] so he can\'t play basketball very well.'
const QUESTION2 = 'You have to write an essay tonight but it [] be more than 200 words.'
const QUESTION3 = 'You have to write an essay []'
const QUESTION4 = '[] should be more than 200 words.'
const CHOICES1 = ["slowly", "slowled", "slows", "slowing"]
const CHOICES2 = ["slowlyyyyyyyy", "slowleddddddd"]

const PracticeGame = () => {

  return ( 
    <Container>
      <Headline>
        <ExitModal />
        <ItemCard />
        <ItemCard />
        <TimeCounting />
      </Headline>
      <ProblemBox
        problem={PROBLEM}
        problem_content={PROBLEM_CONTENT}
      />
      <div style={{ marginBottom: 32 }} />
      <PracticeGameContent 
        type={ANSWER_TYPE.RADIO_CHOICE}
        question={QUESTION2}
        choices={CHOICES2}
      />
      <div style={{ marginBottom: 36 }} />
      <ButtonContainer>button</ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default PracticeGame;