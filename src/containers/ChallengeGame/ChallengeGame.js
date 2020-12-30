import React, { useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal"
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button"
import { ProblemIndex } from "../../components/ProblemIndex"
import GameContent from "../../components/GameContent";
import LoadingPage from "../LoadingPage/LoadingPage";
import { UserInfo } from "./components/UserInfo";

import { ANSWER_TYPE, COLOR, LARGE_DEVICE_SIZE } from "../../global/const"
import { useWindowDimensions } from "../../global/utils"

const NUMBER_OF_QUIZ = 5;

// MOCK DATA
const PROBLEM_ID = "5fcb4ccbc53dd068520072a1";
const TITLE = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const CORRECT_ANSWER = '(22^[5]*22^[2])*22^[39]';
const CONTENT = 'You can only join the football team if you can stay late on [Mondays.&Fridays.]';
const QUESTION = '[] should be more than 200 words.';
const CHOICES = ["slowly", "slowled", "slows", "slowing"];
const TYPE_ANSWER = "RADIO_CHOICE";
const LOADING = false;
const MY_PHOTO = null;
const CHALLENGER_PHOTO = null;
const MY_SCORE = 0;
const CHALLENGER_SCORE = null;
const CURRENT_INDEX = 1;

const ChallengeGame = ({ history }) => {
  
  const location = useLocation();
  const [used_time, set_used_time] = useState();
  const [answer, set_answer] = useState();
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  const onExit = (subject_name, topic_name) => {
    history.push({
      pathname: "/" + subject_name + "/" + topic_name, 
      state: {
        subject_name: subject_name,
        topic_name: topic_name,
      }
    });
  };

  const onCheck = () => {
    if(answer) {
      // TODO: connect API check answer
    }
    // TODO: connect API check answer with blank answer
  };

  return ( 
    <Container>
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        startImmediately={false}
        lastUnit="h"
      >
        {({ getTime, start, stop, reset }) => (
          <React.Fragment>
            {PROBLEM_ID ? start() : reset()}
            <Headline>
              <ExitModal onExit={() => onExit(location.state.subject_name, location.state.topic_name)}/>
              <div style={{ marginRight: 8 }}/>
              <ProblemIndex indexes={NUMBER_OF_QUIZ} current_index={CURRENT_INDEX}/>
              <TimeContainer>
                <Body color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Body>
              </TimeContainer>
            </Headline>
            <UserInfo
              my_image={MY_PHOTO}
              challenger_image={CHALLENGER_PHOTO}
              my_score={MY_SCORE}
              challenger_score={CHALLENGER_SCORE}
            />
            {LOADING 
            ? <LoadingPage/>
            : (
              <React.Fragment>
                <ProblemBox
                  problem={TITLE}
                  problem_content={TYPE_ANSWER === ANSWER_TYPE.MATH_INPUT ? PROBLEM_CONTENT : null}
                />
                <ContentContainer 
                  style={{ alignSelf: TYPE_ANSWER === ANSWER_TYPE.MATH_INPUT ? "center" : "flex-start" }}
                >
                  <GameContent 
                    type={TYPE_ANSWER}
                    correct_answer={CORRECT_ANSWER}
                    question={QUESTION}
                    choices={CHOICES}
                    content={CONTENT}
                    answer={answer}
                    set_answer={set_answer}
                  />
                </ContentContainer>
                <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
                  <Button
                    type="outline"
                    onClick={() => {
                      set_used_time(getTime()/1000);
                      stop();
                      onCheck();
                    }}
                  >
                    ข้าม
                  </Button>
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
                </ButtonContainer>
              </React.Fragment>
            )}
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

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 36px;
`;

const TimeContainer = styled.div`
  width: 68px;
  margin-left: 8px;
`;

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  justify-content: ${props => props.justifyContent};
`;

export default withRouter(ChallengeGame);