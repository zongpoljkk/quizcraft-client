import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";
import useSound from 'use-sound';

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import { ItemCard } from "../../components/ItemCard";
import { ProblemBox } from "../../components/ProblemBox";
import { HintItem } from "../../components/HintItem";
import { Button } from "../../components/Button";
import GameContent from "../../components/GameContent";
import LoadingPage from "../LoadingPage/LoadingPage";

import {
  useGetHintByProblemId,
  useGetProblemForUser,
  getAndCheckAnswer,
} from "./PracticeGamePageHelper";

import skip_icon from "../../assets/icon/skip.png";
import skip_data from "../../assets/lottie/skip.json";
import { LottieFile } from "../../components/LottieFile";
import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";

import { ANSWER_TYPE, COLOR, GAME_MODE } from "../../global/const";
import { hasStringOrNumber } from "../../global/utils";

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
};

const PracticeGamePage = ({ history }) => {
  const location = useLocation();
  const [answer, set_answer] = useState("");
  const [skip, set_skip] = useState(ITEM_USAGE.UN_USE);
  const [answer_loading, set_answer_loading] = useState(false);
  const user_id = localStorage.getItem("userId");

  const [playCorrectSound] = useSound(correctSound, { volume: 0.25 });
  const [playWrongSound] = useSound(wrongSound, { volume: 0.25 });

  const {
    getProblemForUser,
    loading,
    problem_id,
    body,
    answer_type,
    title,
    correct_answer,
    correct_answer_for_display,
    choices,
    have_hint
  } = useGetProblemForUser(
    user_id,
    location.state.subject_name,
    location.state.subtopic_name,
    location.state.difficulty
  );
  const { getHintByProblemId, hint, reset_hint } = useGetHintByProblemId(problem_id);

  const onSkip = () => {
    set_skip(ITEM_USAGE.IN_USE);
    reset_hint();
    set_answer();
    getProblemForUser(set_skip);
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

  const handleCheckAnswerClick = async (
    problemId,
    userId,
    userAnswer,
    getTime,
    subject,
    topic,
    subtopic,
    difficulty,
    mode,
  ) => {
    set_answer_loading(true);
    getAndCheckAnswer(
      problemId,
      userId,
      userAnswer,
      getTime / 1000,
      topic,
      subtopic,
      GAME_MODE.PRACTICE.type_en,
    ).then((res) => {
      set_answer_loading(false);
      res.data.correct ? playCorrectSound() : playWrongSound()
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
          "/practice-answer",
        state: {
          problemId: problemId,
          problem_content: body,
          problem_title: title,
          answer_type: answer_type,
          userId: userId,
          correct: res.data.correct,
          correct_answer: res.data.answer,
          solution: res.data.solution,
          subject: subject,
          topic: topic,
          subtopic: subtopic,
          difficulty: difficulty,
          earned_coins: res.data.earned_coins,
          mode: location.state.mode,
          is_level_up: res.data.level_up,
          is_rank_up: res.data.rank_up,
          earned_coins: res.data.earned_coins
        },
      });
    });
  };

  useEffect(() => {
    getProblemForUser();
  }, []);

  return (
    <React.Fragment>
      {answer_loading ? (
        <LoadingPage />
      ) : (
        <Container>
          <Timer
            formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
            startImmediately={true}
            lastUnit="h"
          >
            {({ getTime, start, reset }) => (
              <React.Fragment>
                {problem_id ? start() : reset()}
                <Headline>
                  <ExitModal
                    onExit={() =>
                      onExit(
                        location.state.subject_name,
                        location.state.topic_name
                      )
                    }
                  />
                  <HintItem
                    onGetHint={() => getHintByProblemId()}
                    content={hint}
                    have_hint={have_hint}
                  />
                  <ItemCard>
                    {skip === ITEM_USAGE.UN_USE && (
                      <CenterContainer
                        onClick={() => {
                          onSkip();
                          reset();
                        }}
                      >
                        <img src={skip_icon} height={22} />
                      </CenterContainer>
                    )}
                    {skip === ITEM_USAGE.IN_USE && (
                      <SkipContainer>
                        <ZoomItem>
                          <LottieFile
                            animationData={skip_data}
                            loop={false}
                            height={64}
                          />
                        </ZoomItem>
                      </SkipContainer>
                    )}
                  </ItemCard>
                  <TimeContainer>
                    <Body color={COLOR.MANDARIN}>
                      <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                    </Body>
                  </TimeContainer>
                </Headline>
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
                        answer={answer}
                        set_answer={set_answer}
                      />
                    </ContentContainer>
                    <ButtonContainer>
                      <Button
                        type={
                          answer_type === ANSWER_TYPE.MATH_INPUT
                            ? hasStringOrNumber(answer)
                              ? "default"
                              : "disabled"
                            : answer
                            ? "default"
                            : "disabled"
                        }
                        onClick={
                          answer_type === ANSWER_TYPE.MATH_INPUT
                            ? hasStringOrNumber(answer)
                              ? () => {
                                  handleCheckAnswerClick(
                                    problem_id,
                                    localStorage.getItem("userId"),
                                    answer,
                                    getTime(),
                                    location.state.subject_name,
                                    location.state.topic_name,
                                    location.state.subtopic_name,
                                    location.state.difficulty,
                                    location.state.mode
                                  );
                                }
                              : () => {}
                            : answer
                            ? () => {
                                handleCheckAnswerClick(
                                  problem_id,
                                  localStorage.getItem("userId"),
                                  answer,
                                  getTime(),
                                  location.state.subject_name,
                                  location.state.topic_name,
                                  location.state.subtopic_name,
                                  location.state.difficulty,
                                  location.state.mode
                                );
                              }
                            : () => {}
                        }
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
      )}
    </React.Fragment>
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
  margin-bottom: 32px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SkipContainer = styled.div`
  margin-left: -18px;
  transform: rotate(90deg);
`;

const ZoomItem = styled.div`
  transform: scale(1.7);
`;

export default withRouter(PracticeGamePage);
