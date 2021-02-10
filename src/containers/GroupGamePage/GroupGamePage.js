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
  WRONG_ANSWER
} from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import {
  useGetGroupGame,
  checkGroupAnswer,
  showAnswer,
  useGetNumberOfAnswer,
  useGetNextProblem
} from "./GroupGamePageHelper";
import { useServerSentEvent, useDeleteGroup } from "../WaitingRoomPage/WaitingRoomPageHelper";

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
  const firstUpdate = useRef(true);

  const {
    getGroupGame,
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
      set_sent_answer(true);
      checkGroupAnswer(
        user_id,
        problem._id,
        answer,
        "GROUP",
        location.state.group_id,
        used_time
      ).then((res) => {
        set_correct(res.data.correct);
        set_correct_answer(res.data.correctAnswer);
      });
      set_answer_modal_loading(false);
    }
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
        },
      });
      window.location.reload();
    } else {
      getGroupGame();
      set_skip(false);
    }
  };

  const handleShowAnswer = () => {
    if (!sent_answer) {
      set_answer(WRONG_ANSWER);
      set_used_time(time_per_problem);
    }
    if (is_creator) {
      showAnswer(location.state.group_id);
    }
  };

  const handleNumberOfAnswer = async () => {
    await getNumberOfAnswer();
  };

  useEffect(() => {
    if (!listening) {
      subscribe(location.state.group_id);
    }
    getGroupGame();
  }, []);

  // when creator click 'ตรวจสอบคำตอบ'
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!is_creator) {
      if (!sent_answer) {
        set_answer(WRONG_ANSWER);
        set_used_time(time_per_problem);
      }
      set_is_time_out(true);
    }
    toggle();
  }, [show_answer]);

  // Wait until user time has been updated, then call onSend
  useEffect(() => {
    // Prevent calling onSend again when time is out
    if (!sent_answer && answer && used_time) {
      set_answer_modal_loading(true);
    }
  }, [answer, used_time, is_time_out]);

  useEffect(() => {
    if (answer_modal_loading) {
      onSend();
    }
  }, [answer_modal_loading]);

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

      handleNextProblem();
      getNumberOfAnswer();
      toggle();
    }
  }, [next_problem]);

  useEffect(() => {
    if (is_time_out) {
      handleShowAnswer();
    }
  }, [is_time_out]);

  useEffect(() => {
    if (delete_group) {
      subscribe(location.state.group_id);
      history.push("/homepage");
      window.location.reload();
    };
  }, [delete_group]);

  return (
    <Container>
      {loading ? (
        <LoadingPage />
      ) : (
        <Timer
          formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
          startImmediately={false}
          lastUnit="h"
          initialTime={time_per_problem * 1000}
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
                    onNext={onTimeOut}
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
                    disabled_math_input={sent_answer ? true : false}
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
                      onClick={
                        answer
                          ? () => {
                              set_used_time(
                                time_per_problem - getTime() / 1000
                              );
                            }
                          : () => {}
                      }
                    >
                      ส่ง
                    </Button>
                  </ButtonContainer>
                )}
                {(sent_answer && !is_time_out) &&
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
                {is_time_out ? (
                  <AnswerModal
                    isShowing={isShowing}
                    toggle={toggle}
                    subject={location.state.subject_name}
                    correct={correct}
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
                    }}
                    onClose={false}
                  />
                ) : null}
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
  transform: scale(2.5);
`;

export default withRouter(GroupGamePage);
