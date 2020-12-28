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
import { HeadlineItem } from "./component/HeadlineItem";
import LoadingPage from "../LoadingPage/LoadingPage";

import {
  useGetAmountOfItems,
  useGetHintByProblemId,
  useGetEachProblem,
  useItem,
} from "./QuizGameHelper";

import { ANSWER_TYPE, COLOR } from "../../global/const";

import { getAndCheckAnswer } from "./QuizGameHelper";

// MOCK DATA
const CORRECT = false;
const CORRECT_ANSWER_FROM_BACKEND = "(22^[5]*22^[2])*22^[39+4x]";
const USER_ID = "5fe1c049e301922c4f2fc0dd";

// MOCK CHOICES
const CONTENT3 =
  "You can only join the football team if you can stay late on [Mondays.&Fridays.]";
const QUESTION4 = "[] should be more than 200 words.";
const CHOICES1 = ["slowly", "slowled", "slows", "slowing"];
const TYPE_ANSWER = "RADIO_CHOICE";

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
  USED: "USED",
};
const NUMBER_OF_QUIZ = 10;

const QuizGame = ({ history }) => {
  const location = useLocation();
  const { isShowing, toggle } = useModal();
  const [used_time, set_used_time] = useState();
  const [answer, set_answer] = useState();
  const [skip, set_skip] = useState(ITEM_USAGE.UN_USE);
  const [refresh, set_refresh] = useState(ITEM_USAGE.UN_USE);
  const [current_index, set_current_index] = useState(1);
  const user_id = localStorage.getItem("userId");
  const [correct, set_correct] = useState(false);

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
    console.log("KAOO");
    if (answer) {
      console.log("MEE ANSWER");
      toggle();
      // TODO: connect API check answer
      set_used_time(getTime / 1000);

      getAndCheckAnswer(
        problemId,
        userId,
        userAnswer,
        getTime / 1000,
        subject,
        topic,
        subtopic
      ).then((res) => {
        console.log(res);
        set_correct(res.data.correct);
        if (current_index === 10) {
          history.push({
            pathname: "/" + subject + "/" + topic,
            // state: {
            //   problemId: problemId,
            //   userId: userId,
            //   correct: res.data.correct,
            //   solution: res.data.solution,
            //   subject: subject,
            //   topic: topic,
            //   subtopic: subtopic,
            //   difficulty: difficulty,
            // },
          });
        }
      });
    }
  };

  const onNext = () => {
    if (current_index === NUMBER_OF_QUIZ) {
      // TODO: push to result page
    } else {
      set_current_index((index) => index + 1);
      set_answer();
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
            {problem_id ? start() : reset()}
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
                    answer={answer}
                    set_answer={set_answer}
                  />
                  {/* <GameContent
                    // type={answer_type}
                    type={TYPE_ANSWER}
                    correct_answer={correct_answer}
                    // question={body}
                    question={QUESTION4}
                    // choices={choices}
                    choices={CHOICES1}
                    // content={body}
                    content={CONTENT3}
                    answer={answer}
                    set_answer={set_answer}
                  /> */}
                </ContentContainer>
                <CenterContainer>
                  <Button
                    type={answer ? "default" : "disabled"}
                    onClick={() => {
                      set_used_time(getTime() / 1000);
                      stop();
                      onCheck(
                        problem_id,
                        localStorage.getItem("userId"),
                        answer,
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
                    correct={CORRECT}
                    answer={CORRECT ? null : CORRECT_ANSWER_FROM_BACKEND}
                    buttonTitle={
                      current_index === NUMBER_OF_QUIZ ? "เสร็จสิ้น" : "ทำต่อ"
                    }
                    onButtonClick={() => {
                      onNext();
                      reset();
                      set_problem_id();
                      set_hint();
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

export default withRouter(QuizGame);
