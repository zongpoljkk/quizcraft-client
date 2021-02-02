import React, { useEffect, useState } from "react";
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
import { NumberOfAnswer } from "./components/NumberOfAnswer";

import { ANSWER_TYPE, COLOR, LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import {
  useGetGroupGame,
  useGetNumberOfAnswer,
  useGetNextProblem,
  useServerSentEvent
} from "./GroupGamePageHelper";

// MOCK DATA
const CORRECT = false;
const CORRECT_ANSWER_FROM_BACKEND = "(22^[5]*22^[2])*22^[39+4x]";

const GroupGamePage = ({ history }) => {
  
  const location = useLocation();
  const [isShowing, toggle] = useModal();
  const [used_time, set_used_time] = useState();
  const [is_time_out, set_is_time_out] = useState(false);
  const [answer, set_answer] = useState();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const user_id = localStorage.getItem("userId");

  const {
    getGroupGame,
    loading,
    current_index,
    number_of_problem,
    time_per_problem,
    user,
    problem,
    is_creator
  } = useGetGroupGame(user_id, location.state.group_id);
  const {
    getNumberOfAnswer,
    number_of_answer,
    number_of_members
  } = useGetNumberOfAnswer(location.state.group_id);
  const { getNextProblem, current_index_after_click_next } = useGetNextProblem(location.state.group_id);
  const {
    listening,
    subscribe,
    next_problem,
    send_answer
  } = useServerSentEvent();

  const onNext = () => {
    if(current_index+1 === number_of_problem) {
      // TODO: connect API check answer hold 10-15 sec then route to result page
      subscribe(location.state.group_id);
      history.push({
        pathname: "/" + location.state.subject_name + "/" + location.state.topic_name + "/" + location.state.subtopic_name + "/" + location.state.difficulty + "/" + "group-result", 
        state: {
          group_id : location.state.group_id,
          subject_name : location.state.subject_name,
          topic_name : location.state.topic_name,
          subtopic_name : location.state.subtopic_name,
          difficulty : location.state.difficulty
        }
      });
    } else {
      getNextProblem();
    };
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
    // TODO: connect API check answer
  };

  useEffect(() => {
    getGroupGame();
  }, []);

  useEffect(() => {
    console.log(listening)
    if(!listening) {
      console.log("sub")
      subscribe(location.state.group_id);
    };
  }, [listening]);

  useEffect(() => {
    getNumberOfAnswer();
  }, [send_answer]);

  useEffect(() => {
    if(current_index_after_click_next || next_problem) {
      // TODO: connect API check answer hold 10-15 sec and getGroupGame()
      getGroupGame();
      set_is_time_out(false);
      console.log("eiei")
    };
    console.log("next_problem", next_problem)
    console.log(listening)
  }, [current_index_after_click_next, next_problem]);

  return ( 
    <Container>
      {loading 
        ? <LoadingPage/>
        : (
        <Timer
          formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
          startImmediately={false}
          lastUnit="h"
          initialTime={time_per_problem*1000}
          direction="backward"
        >
          {({ getTime, start, stop }) => (
            <React.Fragment>
              {is_time_out ? stop() : start()}
              <Headline>
                <ExitModal onExit={() => history.push("/")}/>
                <div style={{ marginRight: 8 }}/>
                <ProblemIndex indexes={number_of_problem} current_index={current_index+1}/>
                {user &&
                  <div style={{ marginLeft: 8 }}>
                    <PointBox points={user?.point}/>
                  </div>
                }
              </Headline>
              <TimeContainer>
                <Subheader color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Subheader>
              </TimeContainer>
              {is_creator && (number_of_answer === number_of_members || is_time_out) &&
                <div style={{ marginBottom: 8 }}>
                  <NumberOfAnswer
                    number_of_answer={number_of_answer}
                    number_of_members={number_of_members}
                    button_title={current_index+1 !== number_of_problem ? "เริ่มข้อต่อไป" : "จบเกม"}
                    onNext={() =>  onNext()}
                  />
                </div>
              }
              <React.Fragment>
                <ProblemBox
                  problem={problem.title}
                  problem_content={problem.answerType === ANSWER_TYPE.MATH_INPUT ? problem.body : null}
                />
                <ContentContainer 
                  style={{ alignSelf: problem.answerType === ANSWER_TYPE.MATH_INPUT ? "center" : "flex-start" }}
                >
                  <GameContent 
                    subject={location.state.subject_name}
                    type={problem.answerType}
                    correct_answer={problem.correctAnswer}
                    question={problem.body}
                    choices={problem.choices}
                    content={problem.body}
                    answer={answer}
                    set_answer={set_answer}
                  />
                </ContentContainer>
                {user &&
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
                }
                <AnswerModal
                  isShowing={isShowing}
                  toggle={toggle}
                  // TODO: add real data instand of CORRECT after connect API
                  subject={location.state.subject_name}
                  correct={CORRECT}
                  answer={CORRECT ? null : CORRECT_ANSWER_FROM_BACKEND}
                  overlay_clickable={false}
                />
                {getTime() <= 0 && onTimeOut()}
              </React.Fragment>
            </React.Fragment>
          )}
        </Timer>
      )}
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