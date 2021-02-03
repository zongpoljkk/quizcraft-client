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

import { ANSWER_TYPE, COLOR, LARGE_DEVICE_SIZE, WRONG_ANSWER } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import { useGetGroupGame, checkGroupAnswer } from "./GroupGamePageHelper";
import {
  useGetNumberOfAnswer,
  useGetNextProblem
} from "./GroupGamePageHelper";
import { useServerSentEvent } from "../WaitingRoomPage/WaitingRoomPageHelper";

const GroupGamePage = ({ history }) => {
  
  const location = useLocation();
  const [isShowing, toggle] = useModal();
  const [used_time, set_used_time] = useState();
  const [is_time_out, set_is_time_out] = useState(false);
  const [answer, set_answer] = useState();
  const [skip, set_skip] = useState(false);
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const user_id = localStorage.getItem("userId");
  const [answer_modal_loading, set_answer_modal_loading] = useState(false);
  const [sent_answer, set_sent_answer] = useState(false);
  const [correct, set_correct] = useState();
  const [correct_answer, set_correct_answer] = useState("");

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
  const { getNextProblem } = useGetNextProblem(location.state.group_id);

  const {
    listening,
    subscribe,
    next_problem,
    send_answer
  } = useServerSentEvent();

  // const onSkip = () => {
  //   set_answer(WRONG_ANSWER);
  // };

  const onSend = () => {
    if(answer) {
      console.log(`usedTime: ${used_time}`)
      set_sent_answer(true);
      checkGroupAnswer(user_id, problem._id, answer, "GROUP", location.state.group_id, used_time).then((res) => {
        set_correct(res.data.correct);
        set_correct_answer(res.data.correctAnswer);
      });
      set_answer_modal_loading(false);
      toggle();
    };
  };

  const onTimeOut = () => {
    set_answer(WRONG_ANSWER);
    set_used_time(time_per_problem)
    set_is_time_out(true);
  };

  const handleNextProblem = () => {
    if(current_index+1 === number_of_problem) {
      // TODO: connect API check answer hold 10-15 sec then route to result page
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
      // TODO: connect API check answer hold 10-15 sec and getGroupGame()
      getGroupGame();
      set_skip(false);
    }
  };

  useEffect(() => {
    if(!listening) {
      subscribe(location.state.group_id);
    };
    getGroupGame();
  }, []);

  // Wait until user time has been updated, then call onSend
  useEffect(() => {
    console.log("useEffect: answer modal loading")
    console.log(used_time);
    console.log(answer)
    // Prevent calling onSend again when time is out
    if (!sent_answer && answer && used_time) {
      console.log("call callModal")
      set_answer_modal_loading(true);
    }
  }, [answer, used_time, is_time_out])

  useEffect(() => {
    console.log(`useEffect: onSend`)
    if (answer_modal_loading) {
      console.log("call onsend")
      onSend();
    }
  }, [answer_modal_loading])

  // close loading modal after getting correct_answer from backend and time is up
  // useEffect(() => {
  //   // // TODO: Wait til the time is up
  //   if (correct_answer) {
  //     set_answer_modal_loading(false);
  //   }
  // }, [correct_answer, is_time_out])

  // // TODO: Display how many people answer already
  // useEffect(() => {

  // }, [gotEventFromBackend])
  
  useEffect(() => {
    getNumberOfAnswer();
  }, [send_answer]);

  useEffect(() => {
    if(next_problem) {
      // reset state
      set_sent_answer(false);
      set_answer();
      set_used_time();
      set_is_time_out(false);

      handleNextProblem();
    };
  }, [next_problem]);

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
            <Container>
              {is_time_out ? stop() : start()}
              <Headline>
                <ExitModal onExit={() => {
                  subscribe(location.state.group_id);
                  history.push("/");
                }}/>
                <div style={{ marginRight: 8 }}/>
                <ProblemIndex indexes={number_of_problem} current_index={current_index+1}/>
                {user &&
                  <div style={{ marginRight: 8 }}>
                    <PointBox points={user?.point}/>
                  </div>
                }
              </Headline>
              <TimeContainer>
                <Subheader color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Subheader>
              </TimeContainer>
              {is_creator &&
                <div style={{ marginBottom: 8 }}>
                  <NumberOfAnswer
                    number_of_answer={number_of_answer}
                    number_of_members={number_of_members}
                    // showButton={number_of_answer === number_of_members || is_time_out}
                    showButton={is_creator}
                    button_title="ตรวจสอบคำตอบ"
                    onNext={() => {
                      console.log(`answer: ${answer}`, `used_time: ${used_time}`, `is_time_out: ${is_time_out}`)
                      if (!sent_answer) {
                        set_answer(WRONG_ANSWER);
                        set_used_time(time_per_problem);
                        // onSkip();
                      }
                      set_is_time_out(true);
                    }}
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
                {(user && (!skip && !is_time_out)) && !sent_answer &&
                  <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
                    <Button
                      type="outline"
                      onClick={() => {
                        set_answer(WRONG_ANSWER)
                        set_used_time(time_per_problem);
                        // onSkip();
                      }}
                    >
                      ข้าม
                    </Button>
                    <Button
                      type={answer ? "default" : "disabled"}
                      onClick={answer ? () => {
                        set_used_time((time_per_problem - getTime()/1000));
                      } : () => {}}
                    >
                      ส่ง
                    </Button>
                  </ButtonContainer>
                }
                {answer_modal_loading && <LoadingPage overlay={true} />}
                {is_time_out ? <AnswerModal
                  isShowing={isShowing}
                  toggle={toggle}
                  subject={location.state.subject_name}
                  correct={correct}
                  answer={correct ? null : correct_answer}
                  overlay_clickable={false}
                  buttonTitle={current_index+1 !== number_of_problem ? "เริ่มข้อต่อไป" : "จบเกม"}
                  onButtonClick={() => {
                    set_correct();
                    set_answer();
                    getNextProblem()
                  }}
                  is_creator={is_creator}
                  group_mode={true}
                /> : null}
                {getTime() <= 0 && onTimeOut()}
              </React.Fragment>
            </Container>
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
  margin-right: 16px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  justify-content: ${props => props.justifyContent};
`;

export default withRouter(GroupGamePage);