import React, { useEffect, useState, useRef } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Subheader, Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button";
import { ProblemIndex } from "../../components/ProblemIndex";
import { AnswerModal } from "../../components/AnswerModal";
import { LottieFile } from "../../components/LottieFile";
import useModal from "../../components/useModal";
import GameContent from "../../components/GameContent";
import LoadingPage from "../LoadingPage/LoadingPage";
import { PointBox } from "./components/PointBox";
import { NumberOfAnswer } from "./components/NumberOfAnswer";

import sending_lottie from "../../assets/lottie/sending.json";

import {
  ANSWER_TYPE,
  COLOR,
  DEVICE_SIZE,
  WRONG_ANSWER,
  GAME_MODE,
  GROUP_GAME_STATE
} from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import {
  useGetGroupGame,
  checkGroupAnswer,
  showAnswer,
  useGetNumberOfAnswer,
  useGetNextProblem
} from "./GroupGamePageHelper";
import {
  useServerSentEvent,
  useDeleteGroup,
  useLeaveGroup
} from "../WaitingRoomPage/WaitingRoomPageHelper";

const GroupGamePage = ({ history }) => {
  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  const firstUpdate = useRef(true);
  const [isShowing, toggle] = useModal();
  const [used_time, set_used_time] = useState();
  const [is_time_out, set_is_time_out] = useState(false);
  const [answer, set_answer] = useState();
  const [skip, set_skip] = useState(false);
  const [answer_modal_loading, set_answer_modal_loading] = useState(false);
  const [sent_answer, set_sent_answer] = useState(false);
  const [correct, set_correct] = useState();
  const [correct_answer, set_correct_answer] = useState("");
  const [waiting, set_waiting] = useState(false);
  const [remaining_time, set_remaining_time] = useState();

  const user_id = localStorage.getItem("userId");

  const {
    getGroupGame,
    set_loading,
    loading,
    current_index,
    number_of_problem,
    time_per_problem,
    user,
    problem,
    is_creator,
  } = useGetGroupGame(user_id, location.state.group_id);

  const {
    getNumberOfAnswer,
    number_of_answer,
    number_of_members,
  } = useGetNumberOfAnswer(location.state.group_id);

  const { getNextProblem } = useGetNextProblem(location.state.group_id);
  const { deleteGroup } = useDeleteGroup(location.state.group_id, user_id);
  const { leaveGroup } = useLeaveGroup(location.state.group_id, user_id);

  const {
    listening,
    subscribe,
    next_problem,
    send_answer,
    show_answer,
    delete_group
  } = useServerSentEvent();

  const onSend = () => {
    if (answer) {
      set_waiting(true);
      set_sent_answer(true);
      checkGroupAnswer(
        user_id,
        problem._id,
        answer,
        GAME_MODE.GROUP.type_en,
        location.state.group_id,
        used_time
      ).then((res) => {
        set_correct(res.data.correct);
        set_correct_answer(res.data.correctAnswer);
      });
    };
  };

  const onTimeOut = () => {
    set_is_time_out(true);
  };

  const handleNextProblem = () => {
    if (current_index + 1 === number_of_problem) {
      history.push({
        pathname: "./group-result",
        state: {
          group_id: location.state.group_id,
          subject_name: location.state.subject_name,
          topic_name: location.state.topic_name,
          subtopic_name: location.state.subtopic_name,
          difficulty: location.state.difficulty,
          pin : location.state.pin
        },
      });
      window.location.reload();
    } else {
      getGroupGame();
      set_skip(false);
    };
  };

  const handleShowAnswer = async () => {
    if (!sent_answer) {
      set_answer(WRONG_ANSWER);
      set_used_time(time_per_problem);
    };
    if (is_creator) {
      await showAnswer(location.state.group_id);
    };
  };

  const handleNumberOfAnswer = async () => {
    await getNumberOfAnswer();
  };

  const onReport = async (remaining) => {
    history.push({
      pathname: "./report",
      state: {
        group_id: location.state.group_id,
        subject_name: location.state.subject_name,
        topic_name: location.state.topic_name,
        subtopic_name: location.state.subtopic_name,
        difficulty: location.state.difficulty,
        problem_id: problem._id,
        problem_content: problem.body,
        problem_title: problem.title,
        answer_type: problem.answerType,
        correct_answer: correct_answer,
        correct: correct,
        remaining_time: remaining
      },
    });
  };
  
  useEffect(() => {
    if (!listening) {
      subscribe(location.state.group_id);
    };
    getGroupGame();
  }, []);

  // when creator click 'ตรวจสอบคำตอบ'
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    };
    if (!is_creator) {
      if (!sent_answer) {
        set_answer(WRONG_ANSWER);
        set_used_time(time_per_problem);
      };
      set_is_time_out(true);
    };
    if (!isShowing) {
      toggle();
    };
    set_waiting(false);
    set_answer_modal_loading(false);
  }, [show_answer]);

  useEffect(() => {
    if (!sent_answer && answer && used_time && user) {
      onSend();
    };
    if(!sent_answer && is_time_out && !isShowing) {
      set_answer_modal_loading(true);
    };
    if(is_time_out && !user) {
      set_correct_answer(problem.correctAnswer);
    };
  }, [is_time_out, used_time]);

  useEffect(() => {
    handleNumberOfAnswer();
  }, [send_answer]);

  useEffect(() => {
    if (next_problem) {
      // reset state
      set_correct();
      set_sent_answer(false);
      set_answer();
      set_used_time();
      set_is_time_out(false);
      set_waiting(false);
      set_answer_modal_loading(false);
      set_remaining_time(null);
      
      handleNextProblem();
      getNumberOfAnswer();
      if (isShowing) {
        toggle();
      };
    };
  }, [next_problem]);

  useEffect(() => {
    if (is_time_out) {
      if (!isShowing) {
        set_answer_modal_loading(true);
      };
      handleShowAnswer();
    };
  }, [is_time_out]);

  useEffect(() => {
    if (delete_group) {
      subscribe(location.state.group_id);
      history.push("/homepage");
      window.location.reload();
    };
  }, [delete_group]);

  //back from report
  useEffect(() => {
    if (location.state.correct_answer) {
      set_remaining_time(location.state.remaining_time);
      set_correct(location.state.correct);
      set_correct_answer(location.state.correct_answer);
      set_is_time_out(true);
      toggle();
    }
  }, [
    location.state.correct,
    location.state.correct_answer,
    location.state.remaining_time,
  ]);

  useEffect(() => {
    if (user) {
      if (user.state !== GROUP_GAME_STATE.PROBLEM) {
        set_waiting(true);
        set_sent_answer(true);
        if (user.state === GROUP_GAME_STATE.ANSWERED_CORRECT || user.state === GROUP_GAME_STATE.SHOW_ANSWER_CORRECT) {
          set_correct(true);
        } else {
          set_correct(false);
        };
        if (problem) {
          set_correct_answer(problem.correctAnswer);
        };
      };
    };
  }, [user, problem]);

  return (
    <Container>
      {loading ? (
        <LoadingPage />
      ) : (
        <Timer
          formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
          startImmediately={false}
          lastUnit="h"
          initialTime={remaining_time ? remaining_time * 1000 : time_per_problem * 1000}
          direction="backward"
        >
          {({ getTime, start, stop }) => (
            <Container>
              {is_time_out ? stop() : start()}
              <Headline>
                <ExitModal
                  onExit={() => {
                    if(is_creator) {
                      deleteGroup();
                    } else {
                      leaveGroup(location.state.group_id, user_id);
                      subscribe(location.state.group_id);
                      history.push("/homepage");
                      window.location.reload();
                    };
                  }}
                />
                <div style={{ marginRight: 8 }} />
                <ProblemIndex
                  indexes={number_of_problem}
                  current_index={current_index + 1}
                />
                {user && (
                  <div style={{ marginLeft: 8 }}>
                    <PointBox points={user?.point} />
                  </div>
                )}
              </Headline>
              <TimeContainer>
                <Subheader color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Subheader>
              </TimeContainer>
              {is_creator && (
                <div style={{ marginBottom: 8 }}>
                  <NumberOfAnswer
                    number_of_answer={number_of_answer}
                    number_of_members={number_of_members}
                    showButton={is_creator}
                    button_title="ตรวจสอบคำตอบ"
                    onClickButton={() => {
                      set_waiting(false);
                      set_answer_modal_loading(true);
                      onTimeOut();
                    }}
                  />
                </div>
              )}
              <React.Fragment>
                <ProblemBox
                  problem={problem.title}
                  problem_content={
                    problem.answerType === ANSWER_TYPE.MATH_INPUT
                      ? problem.body
                      : null
                  }
                />
                <ContentContainer
                  style={{
                    alignSelf:
                      problem.answerType === ANSWER_TYPE.MATH_INPUT
                        ? "center"
                        : "flex-start",
                  }}
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
                    disabled={sent_answer ? true : false}
                  />
                </ContentContainer>
                {user && !skip && !is_time_out && !sent_answer && (
                  <ButtonContainer
                    justifyContent={
                      screen_width >= DEVICE_SIZE.LARGE
                        ? "space-evenly"
                        : "space-between"
                    }
                  >
                    <Button
                      type="outline"
                      onClick={() => {
                        set_answer(WRONG_ANSWER);
                        set_used_time(time_per_problem);
                      }}
                    >
                      ข้าม
                    </Button>
                    <Button
                      type={answer ? "default" : "disabled"}
                      onClick={() => {
                        if(answer) {
                          set_used_time(
                            time_per_problem - getTime() / 1000
                          );
                        };
                      }}
                    >
                      ส่ง
                    </Button>
                  </ButtonContainer>
                )}
                {(waiting && !is_time_out) &&
                  <LottieCotainer>
                    <ZoomLottie>
                      <LottieFile
                        animationData={sending_lottie}
                        width="80px"
                        height="80px"
                        loop={true}
                      />
                    </ZoomLottie>
                    <Body color={COLOR.MANDARIN}>ส่งคำตอบแล้ว</Body>
                    <Body color={COLOR.MANDARIN}>กรุณารอตรวจสอบคำตอบ</Body>
                  </LottieCotainer>
                }
                {answer_modal_loading && <LoadingPage overlay={true} />}
                {is_time_out && (
                  <AnswerModal
                    isShowing={isShowing}
                    toggle={toggle}
                    subject={location.state.subject_name}
                    correct={correct}
                    group_observer = {!user}
                    answer={correct ? null : correct_answer}
                    overlay_clickable={false}
                    buttonTitle={
                      is_creator
                        ? current_index + 1 !== number_of_problem
                          ? "เริ่มข้อต่อไป"
                          : "จบเกม"
                        : null
                    }
                    onButtonClick={() => {
                      getNextProblem();
                      set_loading(true);
                    }}
                    onReportClick={() => onReport(getTime() / 1000)}
                    onClose={false}
                  />
                )}
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

const ButtonContainer = styled.div.attrs((props) => ({
  justifyContent: props.justifyContent,
}))`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

const LottieCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const ZoomLottie = styled.div`
  zoom: 250%;
  width: 56px;
  height: 56px;
  overflow: hidden;
  margin-top: -16px;
  margin-left: -24px;
`;

export default withRouter(GroupGamePage);
