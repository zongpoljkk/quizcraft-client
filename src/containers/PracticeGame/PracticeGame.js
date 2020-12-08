import React, { useState } from "react";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal"
import { ItemCard } from "../../components/ItemCard";
import { ProblemBox } from "../../components/ProblemBox";
import { HintItem } from "../../components/HintItem"
import { Button } from "../../components/Button"
import PracticeGameContent from "./PracticeGameContent";

import { useGetHintByProblemId } from "./PracticeGameHelper";

import skip_icon from "../../assets/icon/skip.png";

import { ANSWER_TYPE, COLOR } from "../../global/const"

// MOCK DATA
const PROBLEM = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const ANSWER = '(22^[5]*22^[2])*22^[39]*';
const CONTENT1 = 'You can only join the football team if you can [stay&to stay] late on Mondays.';
const CONTENT2 = '[You&I] can only join the football team if you can stay late on Mondays.';
const CONTENT3 = 'You can only join the football team if you can stay late on [Mondays.&Fridays.]';
const QUESTION1 = 'He runs quite [slow,] so he can\'t play basketball very well.';
const QUESTION2 = 'You have to write an essay tonight but it [] be more than 200 words.';
const QUESTION3 = 'You have to write an essay []';
const QUESTION4 = '[] should be more than 200 words.';
const CHOICES1 = ["slowly", "slowled", "slows", "slowing"];
const CHOICES2 = ["slowlyyyyyyyy", "slowleddddddd"];
const TYPE_ANSWER = "RADIO_CHOICE";

const PROBLEM_ID = "5fce5cd6a775562b4c48d92b";

const PracticeGame = () => {

  const [used_time, set_used_time] = useState();
  const [answer, set_answer] = useState();

  const { getHintByProblemId, hint } = useGetHintByProblemId(PROBLEM_ID);

  const onSkip = () => {
    // TODO: connect API get new question
    console.log("skip ja");
  }

  const onExit = () => {
    // TODO: connect API get new question
    console.log("exit ja");
  }

  return ( 
    <Container>
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        startImmediately={true}
        lastUnit="h"
      >
        {({ getTime }) => (
          <React.Fragment>
            <Headline>
              <ExitModal onExit={onExit}/>
              <HintItem onGetHint={() => getHintByProblemId()} content={hint}/>
              <ItemCard onClick={onSkip}>
                <img src={skip_icon} height={20}/>
              </ItemCard>
              <TimeContainer>
                <Body color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Body>
              </TimeContainer>
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
                question={QUESTION4}
                choices={CHOICES2}
                content={CONTENT3}
                answer={answer}
                set_answer={set_answer}
              />
            </ContentContainer>
            <ButtonContainer>
              <Button
                type={answer ? "default" : "disabled"}
                onClick={() => set_used_time(getTime()/1000)}
              >
                ตรวจ
              </Button>
            </ButtonContainer>
          </React.Fragment>
        )}
      </Timer>
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

const TimeContainer = styled.div`
  width: 68px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default PracticeGame;