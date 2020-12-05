import React from "react";
import styled from "styled-components";

import { ExitModal } from "../../components/ExitModal"
import { ItemCard } from "../../components/ItemCard";
import { TimeCounting } from "../../components/TimeCounting";
import { ProblemBox } from "../../components/ProblemBox";
import { SkipIcon } from "../../components/Icon";
import { HintItem } from "../../components/HintItem"
import PracticeGameContent from "./PracticeGameContent";

import { ANSWER_TYPE } from "../../global/const"

// MOCK DATA
const PROBLEM = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const ANSWER = '(2^[3]+4^[2])^[3]-7x^[(x+1)]';
const CONTENT1 = 'You can only join the football team if you can [stay&to stay] late on Mondays.';
const CONTENT2 = '[You&I] can only join the football team if you can stay late on Mondays.';
const CONTENT3 = 'You can only join the football team if you can stay late on [Mondays.&Fridays.]';
const QUESTION1 = 'He runs quite [slow,] so he can\'t play basketball very well.';
const QUESTION2 = 'You have to write an essay tonight but it [] be more than 200 words.';
const QUESTION3 = 'You have to write an essay []';
const QUESTION4 = '[] should be more than 200 words.';
const CHOICES1 = ["slowly", "slowled", "slows", "slowing"];
const CHOICES2 = ["slowlyyyyyyyy", "slowleddddddd"];
const HINT = "สมบัติการคูณเมื่อ a, m และ n เป็นจำนวนเต็ม คือ a  x a  = a";
const TYPE_ANSWER = "SELECT_ONE";

const PracticeGame = () => {

  const onSkip = () => {
    // TODO: connect API get new question
    console.log("skip ja");
  }

  return ( 
    <Container>
      <Headline>
        <ExitModal />
        <HintItem content={HINT}/>
        <ItemCard onClick={onSkip}>
          <SkipIcon />
        </ItemCard>
        <TimeCounting />
      </Headline>
      <ProblemBox
        problem={PROBLEM}
        problem_content={PROBLEM_CONTENT}
      />
      <ContentContainer 
        style={{ alignSelf: TYPE_ANSWER === ANSWER_TYPE.MATH_INPUT ? "center" : "flex-start" }}
      >
        <PracticeGameContent 
          type={TYPE_ANSWER}
          correct_answer={ANSWER}
          question={QUESTION2}
          choices={CHOICES2}
          content={CONTENT3}
        />
      </ContentContainer>
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

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 36px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default PracticeGame;