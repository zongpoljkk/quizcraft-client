import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button";
import { ProblemIndex } from "../../components/ProblemIndex";
import { AnswerModal } from "../../components/AnswerModal";
import useModal from "../../components/useModal";
import GameContent from "../../components/GameContent";
import { HeadlineItem } from "./components/HeadlineItem";
import LoadingPage from "../LoadingPage/LoadingPage";

import {
  useGetAmountOfItems,
  useGetHintByProblemId,
  useGetEachProblem,
  useItem,
  getAndCheckAnswer
} from "./QuizGamePageHelper";

import { ANSWER_TYPE, COLOR } from "../../global/const";

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
  USED: "USED",
};
export const NUMBER_OF_QUIZ = 10;
const QUIZ_MODE = "quiz";

const QuizGamePage = ({ history }) => {
  
  const location = useLocation();
  const [isShowing, toggle] = useModal();
  const [used_time, set_used_time] = useState();
  const [time_start, set_time_start] = useState(true);
  const [user_answer, set_user_answer] = useState();
  const [skip, set_skip] = useState(ITEM_USAGE.UN_USE);
  const [refresh, set_refresh] = useState(ITEM_USAGE.UN_USE);
  const [current_index, set_current_index] = useState(1);
  const user_id = localStorage.getItem("userId");
  const [correct, set_correct] = useState(false);
  const [solution, set_solution] = useState("");
  const [answer_key, set_answer_key] = useState("");
  const [score, set_score] = useState(0);
  const [earned_exp, set_earned_exp] = useState(0);
  const [earned_coins, set_earned_coins] = useState(0);

  const {
    getEachProblem,
    loading,
    problem_id,
    set_problem_id,
    body,
    answer_type,
    title,
    correct_answer,
    choices,
  } = useGetEachProblem(
    user_id,
    location.state.subject_name,
    location.state.subtopic_name,
    location.state.difficulty
  );

  const { getHintByProblemId, hint, set_hint } = useGetHintByProblemId(
    problem_id
  );

  const {
    getAmountOfItems,
    amount_of_hints,
    amount_of_skips,
    amount_of_refreshs,
  } = useGetAmountOfItems(user_id);

  const { putUseItem } = useItem(user_id);

  const onSkip = () => {
    set_skip(ITEM_USAGE.IN_USE);
    getEachProblem(set_skip);
    set_current_index((index) => index + 1);
    set_problem_id();
    set_hint();
  };

  const onRefresh = () => {
    set_refresh(ITEM_USAGE.IN_USE);
    getEachProblem(set_refresh);
    set_problem_id();
    set_hint();
  };

  const onExit = (subject_name, topic_name) => {
    history.push({
      pathname: "/" + subject_name + "/" + topic_name,
      state: {
        subject_name: subject_name,
        topic_name: topic_name,
      },
    });
  };

  const onCheck = (
    problemId,
    userId,
    userAnswer,
    getTime,
    subject,
    topic,
    subtopic,
    difficulty
  ) => {
    if (user_answer) {
      const button = document.getElementById("button");
      button.disabled = true;
      set_used_time(getTime / 1000);

      getAndCheckAnswer(
        problemId,
        userId,
        userAnswer,
        getTime / 1000,
        subject,
        topic,
        subtopic,
        QUIZ_MODE
      ).then((res) => {
        //update earned exp and coins
        set_correct(res.data.correct);
        set_answer_key(res.data.answer);
        set_solution(res.data.solution);
        if (res.data.correct) {
          set_score((score) => score + 1);
          set_earned_exp((earned_exp) => earned_exp + res.data.earned_exp);
          set_earned_coins(
            (earned_coins) => earned_coins + res.data.earned_coins
          );
        }
        toggle();
      });
    }
  };

  const onNext = (userId, subject, topic, subtopic, difficulty) => {
    if (current_index === NUMBER_OF_QUIZ) {
      //push to result page
      history.push({
        pathname:
          "/" +
          subject +
          "/" +
          topic +
          "/" +
          subtopic +
          "/" +
          difficulty +
          "/quiz-result",
        state: {
          userId: userId,
          subject: subject,
          topic: topic,
          subtopic: subtopic,
          difficulty: difficulty,
          score: score,
          earned_exp: earned_exp,
          earned_coins: earned_coins,
        },
      });
    } else {
      set_current_index((index) => index + 1);
      set_user_answer();
      getEachProblem();
      // TODO: check amount of item -> set item
    }
  };

  const getNewAmount = () => {
    getAmountOfItems();
  };

  useEffect(() => {
    getAmountOfItems();
    getEachProblem();
  }, []);

  return (
    <Container>
      <Timer
        formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
        startImmediately={false}
        lastUnit="h"
      >
        {({ getTime, start, stop, reset }) => (
          <React.Fragment>
            {problem_id && time_start ? start() : stop()}
            <Headline>
              <ExitModal
                onExit={() =>
                  onExit(location.state.subject_name, location.state.topic_name)
                }
              />
              <div style={{ marginRight: 8 }} />
              <ProblemIndex
                indexes={NUMBER_OF_QUIZ}
                current_index={current_index}
              />
            </Headline>
            <HeadlineItem
              onGetHint={() => {
                getHintByProblemId();
                if (!hint) {
                  putUseItem("Hint");
                }
              }}
              hintContent={hint}
              skip={skip}
              onSkip={() => {
                if (current_index < NUMBER_OF_QUIZ) {
                  putUseItem("Skip");
                  onSkip();
                  reset();
                } else {
                  // TODO: push to result page and check with empty answer
                  putUseItem("Skip");
                  history.push("/result-page");
                }
              }}
              refresh={refresh}
              onRefresh={() => {
                putUseItem("Refresh");
                onRefresh();
                reset();
              }}
              amount_of_hints={amount_of_hints}
              amount_of_skips={amount_of_skips}
              amount_of_refreshs={amount_of_refreshs}
              getNewAmount={getNewAmount}
            >
              <TimeContainer>
                <Body color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Body>
              </TimeContainer>
            </HeadlineItem>
            {loading ? (
              <LoadingPage />
            ) : (
              <React.Fragment>
                <ProblemBox
                  problem={title}
                  problem_content={
                    answer_type === ANSWER_TYPE.MATH_INPUT ? body : null
                  }
                />
                <ContentContainer
                  style={{
                    alignSelf:
                      answer_type === ANSWER_TYPE.MATH_INPUT
                        ? "center"
                        : "flex-start",
                  }}
                >
                  <GameContent
                    type={answer_type}
                    correct_answer={correct_answer}
                    question={body}
                    choices={choices}
                    content={body}
                    answer={user_answer}
                    set_answer={set_user_answer}
                  />
                </ContentContainer>
                <CenterContainer>
                  <Button
                    id="button"
                    // type={
                    //   answer_type === ANSWER_TYPE.MATH_INPUT
                    //     ? hasNumber(answer)
                    //       ? "default"
                    //       : "disabled"
                    //     : answer
                    //     ? "default"
                    //     : "disabled"
                    // }
                    // onClick={
                    //   answer_type === ANSWER_TYPE.MATH_INPUT
                    //     ? hasNumber(answer)
                    //       ? () => {
                    //           handleCheckAnswerClick(
                    //             problem_id,
                    //             localStorage.getItem("userId"),
                    //             answer,
                    //             getTime(),
                    //             location.state.subject_name,
                    //             location.state.topic_name,
                    //             location.state.subtopic_name,
                    //             location.state.difficulty
                    //           );
                    //         }
                    //       : () => {}
                    //     : answer
                    //     ? () => {
                    //         handleCheckAnswerClick(
                    //           problem_id,
                    //           localStorage.getItem("userId"),
                    //           answer,
                    //           getTime(),
                    //           location.state.subject_name,
                    //           location.state.topic_name,
                    //           location.state.subtopic_name,
                    //           location.state.difficulty
                    //         );
                    //       }
                    //     : () => {}
                    // }
                    type={
                      answer_type === ANSWER_TYPE.MATH_INPUT
                        ? hasNumber(user_answer)
                          ? "default"
                          : "disabled"
                        : user_answer
                        ? "default"
                        : "disabled"
                    }
                    type={user_answer ? "default" : "disabled"}
                    onClick={() => {
                      set_used_time(getTime() / 1000);
                      set_time_start(false);
                      stop();
                      onCheck(
                        problem_id,
                        localStorage.getItem("userId"),
                        user_answer,
                        getTime(),
                        location.state.subject_name,
                        location.state.topic_name,
                        location.state.subtopic_name,
                        location.state.difficulty
                      );
                    }}
                  >
                    ตรวจ
                  </Button>
                  <AnswerModal
                    isShowing={isShowing}
                    toggle={toggle}
                    // TODO: add real data instand of CORRECT after connect API
                    correct={correct}
                    answer={correct ? null : answer_key}
                    buttonTitle={
                      current_index === NUMBER_OF_QUIZ ? "เสร็จสิ้น" : "ทำต่อ"
                    }
                    overlay_clickable={false}
                    onButtonClick={() => {
                      onNext(
                        user_id,
                        location.state.subject_name,
                        location.state.topic_name,
                        location.state.subtopic_name,
                        location.state.difficulty
                      );
                      set_time_start(true);
                      set_problem_id();
                      set_hint();
                      reset();
                    }}
                  />
                </CenterContainer>
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
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default withRouter(QuizGamePage);
