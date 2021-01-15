import React, { useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Subheader } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal"
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button"
import { ProblemIndex } from "../../components/ProblemIndex"
import { AnswerModal } from "../../components/AnswerModal"
import useModal from "../../components/useModal";
import GameContent from "../../components/GameContent";
import LoadingPage from "../LoadingPage/LoadingPage";
import { PointBox } from "./components/PointBox";

import { ANSWER_TYPE, COLOR, LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

// MOCK DATA
const NUMBER_OF_QUIZ = 30;
const TITLE = 'แบบทดสอบความรู้ทั่วไปมากๆ มากแบบมากๆจริงนะจ๊ะ';
const PROBLEM_CONTENT = 'โจทย์';
const CORRECT_ANSWER = '(22^[5]*22^[2])*22^[39]';
const CONTENT = 'You can only join the football team if you can stay late on [Mondays.&Fridays.]';
const QUESTION = '[] should be more than 200 words.';
const CHOICES = ["slowly", "slowled", "slows", "slowing"];
const TYPE_ANSWER = "RADIO_CHOICE";
const CORRECT = false;
const CORRECT_ANSWER_FROM_BACKEND = "(22^[5]*22^[2])*22^[39+4x]";
const LOADING = false;
const CURRENT_INDEX = 1;
const POINT = 999;
const TIME = 180;

const GroupGamePage = ({ history }) => {
  
  const location = useLocation();
  const [isShowing, toggle] = useModal();
  const [used_time, set_used_time] = useState();
  const [is_time_out, set_is_time_out] = useState(false);
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

  const onSkip = () => {
    // TODO: connect API send no answer
  };

  const onSend = () => {
    if(answer) {
      toggle();
      // TODO: connect API send answer
    };
  };

  const onTimeOut = () => {
    set_is_time_out(true);
    // TODO: connect API get new problem
  };

  return ( 
    <Container>
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        startImmediately={false}
        lastUnit="h"
        initialTime={TIME*1000}
        direction="backward"
      >
        {({ getTime, start, stop, reset }) => (
          <React.Fragment>
            {is_time_out ? reset() : start()}
            <Headline>
              {/* <ExitModal onExit={() => onExit(location.state.subject_name, location.state.topic_name)}/> */}
              <ExitModal />
              <div style={{ marginRight: 8 }}/>
              <ProblemIndex indexes={NUMBER_OF_QUIZ} current_index={CURRENT_INDEX}/>
              <div style={{ marginRight: 8 }}/>
              <PointBox points={POINT}/>
            </Headline>
            <TimeContainer>
              <Subheader color={COLOR.MANDARIN}>
                <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
              </Subheader>
            </TimeContainer>
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
                      onSkip();
                    }}
                  >
                    ข้าม
                  </Button>
                  <Button
                    type={answer ? "default" : "disabled"}
                    onClick={() => {
                      set_used_time(getTime()/1000);
                      onSend();
                    }}
                  >
                    ส่ง
                  </Button>
                </ButtonContainer>
                <AnswerModal
                  isShowing={isShowing}
                  toggle={toggle}
                  // TODO: add real data instand of CORRECT after connect API
                  correct={CORRECT}
                  answer={CORRECT ? null : CORRECT_ANSWER_FROM_BACKEND}
                  overlay_clickable={false}
                />
                {getTime() <= 0 && onTimeOut()}
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
  display: flex;
  align-self: center;
  width: 68px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  justify-content: ${props => props.justifyContent};
`;

export default withRouter(GroupGamePage);