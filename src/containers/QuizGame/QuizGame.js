import React, { useState } from "react";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal"
import { ItemCard } from "../../components/ItemCard";
import { LottieFile } from "../../components/LottieFile"
import { ProblemBox } from "../../components/ProblemBox";
import { HintItem } from "../../components/HintItem"
import { Button } from "../../components/Button"
import { ProblemIndex } from "../../components/ProblemIndex"
import { AnswerModal } from "../../components/AnswerModal"
import useModal from "../../components/useModal";
import GameContent from "../../components/GameContent";

import skip_icon from "../../assets/icon/skip.png";
import skip_data from "../../assets/lottie/skip.json";
import refresh_icon from "../../assets/icon/refresh.png";
import refresh_data from "../../assets/lottie/refresh.json";

import { ANSWER_TYPE, COLOR } from "../../global/const"

// MOCK DATA
const PROBLEM = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const ANSWER = '(22^[5]*22^[2])*22^[39]';
const CONTENT3 = 'You can only join the football team if you can stay late on [Mondays.&Fridays.]';
const QUESTION4 = '[] should be more than 200 words.';
const CHOICES1 = ["slowly", "slowled", "slows", "slowing"];
const TYPE_ANSWER = "RADIO_CHOICE";
const CORRECT = false;
const FINAL_ANSWER = "(22^[5]*22^[2])*22^[39+4x]";

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
  USED: "USED",
}
const NUMBER_OF_QUIZ = 10;

const QuizGame = () => {

  const {isShowing, toggle} = useModal();
  const [used_time, set_used_time] = useState();
  const [answer, set_answer] = useState();
  const [skip, set_skip] = useState(ITEM_USAGE.UN_USE);
  const [refresh, set_refresh] = useState(ITEM_USAGE.UN_USE);
  const [current_index, set_current_index] = useState(1);

  const onSkip = () => {
    // TODO: connect API get new question & add set skip
    set_skip(ITEM_USAGE.IN_USE);
    console.log("skip ja");
  }

  const onRefresh = () => {
    // TODO: connect API get new question & add set refresh
    set_refresh(ITEM_USAGE.IN_USE);
    console.log("refresh ja");
  }

  const onExit = () => {
    // TODO: exit to subtopic
    console.log("exit ja");
  }

  const onCheck = () => {
    if(answer) {
      toggle();
      // TODO: connect API check answer
    }
  }

  const onNext = () => {
    if(current_index === NUMBER_OF_QUIZ) {
      // TODO: push to result page
    }
    else {
      set_current_index((index) => index+1);
      set_answer();
      // TODO: connect API get new question
      // TODO: check amount of item -> set item
    }
  }

  return ( 
    <Container>
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        startImmediately={true}
        lastUnit="h"
      >
        {({ getTime, stop }) => (
          <React.Fragment>
            <Headline>
              <ExitModal onExit={onExit}/>
              <div style={{ marginRight: 8 }}/>
              <ProblemIndex indexes={NUMBER_OF_QUIZ} current_index={current_index}/>
            </Headline>
            <ItemHeadline>
              <HintItem onGetHint={() => {}}/>
              <ItemCard>
                {skip === ITEM_USAGE.UN_USE && (
                  <CenterContainer onClick={onSkip}>
                    <img src={skip_icon} height={22}/>
                  </CenterContainer>
                )}
                {skip === ITEM_USAGE.IN_USE && (
                  <SkipContainer>
                    <ZoomItem>
                      <LottieFile animationData={skip_data} loop={false} height={64}/>
                    </ZoomItem>
                  </SkipContainer>
                )}
                {skip === ITEM_USAGE.USED && (
                  <CenterContainer>
                    <img src={skip_icon} height={22}/>
                    <DisableItem />
                  </CenterContainer>
                )}
              </ItemCard>
              <ItemCard>
                {refresh === ITEM_USAGE.UN_USE && (
                  <CenterContainer onClick={onRefresh}>
                    <img src={refresh_icon} height={22}/>
                  </CenterContainer>
                )}
                {refresh === ITEM_USAGE.IN_USE && 
                  <LottieFile animationData={refresh_data} loop={false} height={48}/>
                }
                {refresh === ITEM_USAGE.USED && (
                  <CenterContainer>
                    <img src={refresh_icon} height={22}/>
                    <DisableItem />
                  </CenterContainer>
                )}
              </ItemCard>
              <TimeContainer>
                <Body color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Body>
              </TimeContainer>
            </ItemHeadline>
            <ProblemBox
              problem={PROBLEM}
              problem_content={PROBLEM_CONTENT}
            />
            <ContentContainer 
              style={{ alignSelf: TYPE_ANSWER === ANSWER_TYPE.MATH_INPUT ? "center" : "flex-start" }}
            >
              <GameContent 
                type={TYPE_ANSWER}
                correct_answer={ANSWER}
                question={QUESTION4}
                choices={CHOICES1}
                content={CONTENT3}
                answer={answer}
                set_answer={set_answer}
              />
            </ContentContainer>
            <CenterContainer>
              <Button
                type={answer ? "default" : "disabled"}
                onClick={() => {
                  set_used_time(getTime()/1000);
                  stop();
                  onCheck();
                }}
              >
                ตรวจ
              </Button>
              <AnswerModal
                isShowing={isShowing}
                toggle={toggle}
                correct={CORRECT}
                answer={CORRECT ? null : FINAL_ANSWER}
                buttonTitle={current_index === NUMBER_OF_QUIZ ? "เสร็จสิ้น" : "ทำต่อ"}
                onButtonClick={() => onNext()}
              />
            </CenterContainer>
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
  margin-bottom: 8px;
`;

const ItemHeadline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 32px;
`;

const SkipContainer = styled.div`
  margin-left: -18px;
  transform: rotate(90deg);
`;

const ZoomItem = styled.div`
  transform: scale(1.7);
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

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DisableItem = styled.div`
  display: flex;
  background-color: ${COLOR.BLACK};
  opacity: 0.3;
  height: 32px;
  width: 56px;
  border-radius: 4px;
  position: absolute;
  margin-top: -5px;
`;

export default QuizGame;