import React, { useEffect, useState, useRef } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";
import useSound from "use-sound";

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
  getAndCheckAnswer,
  useSkipItem,
  useRefreshItem,
} from "./QuizGamePageHelper";

import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
import level_up from "../../assets/sounds/level_up.mp3";

import { ANSWER_TYPE, COLOR, DIFFICULTY, GAME_MODE } from "../../global/const";
import { hasStringOrNumber } from "../../global/utils";

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
  USED: "USED",
};
export const NUMBER_OF_QUIZ = 10;

const QuizGamePage = ({ history }) => {
  const location = useLocation();

  const [isShowing, toggle] = useModal();
  const [used_time, set_used_time] = useState();
  const [time_start, set_time_start] = useState(true);
  const [user_answer, set_user_answer] = useState();
  const [skip, set_skip] = useState(ITEM_USAGE.UN_USE);
  const [refresh, set_refresh] = useState(ITEM_USAGE.UN_USE);
  const [current_index, set_current_index] = useState(1);
  const [correct, set_correct] = useState(false);
  const [solution, set_solution] = useState("");
  const [answer_key, set_answer_key] = useState("");
  const [score, set_score] = useState(0);
  const [earned_exp, set_earned_exp] = useState(0);
  const [earned_coins, set_earned_coins] = useState(0);
  const [is_level_up, set_is_level_up] = useState(false);
  const [is_rank_up, set_is_rank_up] = useState(false);
  const [answer_modal_loading, set_answer_modal_loading] = useState(false);
  const previousRewards = useRef({ earned_exp, earned_coins });

  const user_id = localStorage.getItem("userId");

  const [playCorrectSound] = useSound(correctSound, { volume: 0.25 });
  const [playWrongSound] = useSound(wrongSound, { volume: 0.25 });
  const [playLevelUpSound] = useSound(level_up, { volume: 0.25 });

  const {
    getEachProblem,
    loading,
    problem_id,
    set_problem_id,
    body,
    answer_type,
    title,
    correct_answer,
    correct_answer_for_display,
    choices,
    have_hint,
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
  const { postSkipItem } = useSkipItem();
  const { postRefreshItem } = useRefreshItem();

  const onSkip = async () => {
    set_skip(ITEM_USAGE.IN_USE);
    await postSkipItem(problem_id);
    set_used_time(0 / 1000);
    set_time_start(false);
    // stop();
    onCheck(
      problem_id,
      localStorage.getItem("userId"),
      correct_answer,
      0,
      location.state.subject_name,
      location.state.topic_name,
      location.state.subtopic_name,
      location.state.difficulty
    );
    set_skip(ITEM_USAGE.UN_USE);
  };

  const onRefresh = async () => {
    set_refresh(ITEM_USAGE.IN_USE);
    await postRefreshItem(problem_id);
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
    if (user_answer || getTime === 0) {
      const button = document.getElementById("button");
      button.disabled = true;
      set_used_time(getTime / 1000);
      set_answer_modal_loading(true);

      getAndCheckAnswer(
        problemId,
        userId,
        userAnswer,
        getTime / 1000,
        subject,
        topic,
        subtopic,
        GAME_MODE.QUIZ
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
        if (res.data.level_up) {
          set_is_level_up(true);
        }
        if (res.data.rank_up) {
          set_is_rank_up(true);
        }
        res.data.correct ? playCorrectSound() : playWrongSound();
        set_answer_modal_loading(false);
        toggle();
      });
    }
  };

  const onReport = async () => {
    history.push({
      pathname: "./report",
      state: {
        subject_name: location.state.subject_name,
        topic_name: location.state.topic_name,
        subtopic_id: location.state.subtopic_id,
        subtopic_name: location.state.subtopic_name,
        mode: location.state.mode,
        difficulty: location.state.difficulty,
        problem_id: problem_id,
        problem_content: body,
        problem_title: title,
        answer_type: answer_type,
        current_index: current_index,
        number_of_problem: NUMBER_OF_QUIZ,
        score: score,
        earned_exp: earned_exp,
        earned_coins: earned_coins,
      },
    });
  };

  const onNext = (userId, subject, topic, subtopic, difficulty) => {
    if (current_index === NUMBER_OF_QUIZ) {
      //push to result page
      if (is_level_up || is_rank_up) {
        playLevelUpSound();
      }
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
          is_level_up: is_level_up,
          is_rank_up: is_rank_up,
        },
      });
    } else {
      set_current_index((index) => index + 1);
      set_user_answer();
      getEachProblem();
    }
  };

  const getNewAmount = () => {
    getAmountOfItems();
  };

  useEffect(() => {
    getAmountOfItems();
    getEachProblem();
  }, []);

  // Trigger when using onSkip on the last question
  useEffect(() => {
    // Check if both earned_coins and earned_exp already updated
    if (
      previousRewards.current.earned_coins !== earned_coins &&
      previousRewards.current.earned_exp !== earned_exp
    ) {
      if (current_index > NUMBER_OF_QUIZ) {
        history.push({
          pathname:
            "/" +
            location.state.subject_name +
            "/" +
            location.state.topic_name +
            "/" +
            location.state.subtopic_name +
            "/" +
            location.state.difficulty +
            "/quiz-result",
          state: {
            userId: localStorage.getItem("userId"),
            subject: location.state.subject_name,
            topic: location.state.topic_name,
            subtopic: location.state.subtopic_name,
            difficulty: location.state.difficulty,
            score: score,
            earned_exp: earned_exp,
            earned_coins: earned_coins,
          },
        });
      }

      //then update the previousValues to be the current values
      previousRewards.current = { earned_coins, earned_exp };
    }
  }, [earned_exp, earned_coins]);

  useEffect(() => {
    if (location.state.current_index) {
      set_current_index(location.state.current_index + 1);
      set_score(location.state.score);
      set_earned_coins(location.state.earned_coins);
      set_earned_exp(location.state.earned_coins);
    }
  }, [
    location.state.current_index,
    location.state.score,
    location.state.earned_coins,
    location.state.earned_coins,
  ]);

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
              have_hint={have_hint}
              skip={skip}
              onSkip={() => {
                if (current_index <= NUMBER_OF_QUIZ) {
                  onSkip();
                  reset();
                } else {
                  postSkipItem(problem_id);
                }
              }}
              refresh={refresh}
              onRefresh={() => {
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
                    subject={location.state.subject_name}
                    type={answer_type}
                    correct_answer={correct_answer_for_display}
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
                    type={
                      answer_type === ANSWER_TYPE.MATH_INPUT
                        ? hasStringOrNumber(user_answer)
                          ? "default"
                          : "disabled"
                        : user_answer
                        ? "default"
                        : "disabled"
                    }
                    onClick={
                      answer_type === ANSWER_TYPE.MATH_INPUT
                        ? hasStringOrNumber(user_answer)
                          ? () => {
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
                            }
                          : () => {}
                        : user_answer
                        ? () => {
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
                          }
                        : () => {}
                    }
                  >
                    ตรวจ
                  </Button>
                  {answer_modal_loading && <LoadingPage overlay={true} />}
                  <AnswerModal
                    isShowing={isShowing}
                    toggle={toggle}
                    subject={location.state.subject_name}
                    correct={correct}
                    // used_time === 0 means use skip
                    answer={(correct && used_time !== 0 ) ? null : answer_key}
                    show_answer={used_time === 0}
                    buttonTitle={
                      current_index === NUMBER_OF_QUIZ ? "เสร็จสิ้น" : "ทำต่อ"
                    }
                    overlay_clickable={false}
                    onReportClick={() => onReport()}
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
