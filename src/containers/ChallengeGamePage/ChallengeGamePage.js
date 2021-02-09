import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";
import useSound from 'use-sound';

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button";
import { AnswerModal } from "../../components/AnswerModal";
import useModal from "../../components/useModal";
import { ProblemIndex } from "../../components/ProblemIndex";
import GameContent from "../../components/GameContent";
import LoadingPage from "../LoadingPage/LoadingPage";
import { UserInfo } from "./components/UserInfo";

import {
  useGetChallengeInfo,
  useGetProblemByChallengeId,
  getAndCheckAnswer,
} from "./ChallengeGamePageHelper";

import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
import level_up from "../../assets/sounds/level_up.mp3";

import { ANSWER_TYPE, COLOR, DEVICE_SIZE, WRONG_ANSWER } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const NUMBER_OF_QUIZ = 5;


const ChallengeGame = ({ history }) => {
  const location = useLocation();
  const [user_answer, set_user_answer] = useState();
  const [correct, set_correct] = useState(false);
  const [answer_key, set_answer_key] = useState("");
  const [current_index, set_current_index] = useState(1);
  const [user_score, set_user_score] = useState(0);
  const [time_start, set_time_start] = useState(true);
  const [isShowing, toggle] = useModal();
  const [is_level_up, set_is_level_up] = useState(false);
  const [is_rank_up, set_is_rank_up] = useState(false);
  const [earned_coins, set_earned_coins] = useState(0);
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const user_id = localStorage.getItem("userId");

  const [playCorrectSound] = useSound(correctSound, { volume: 0.25 });
  const [playWrongSound] = useSound(wrongSound, { volume: 0.25 });
  const [playLevelUpSound] = useSound(level_up, { volume: 0.25 });

  const {
    getChallengeInfo,
    loading_info,
    my_info,
    challenger_info,
  } = useGetChallengeInfo(user_id, location.state.challenge_id);

  const {
    getProblemByChallengeId,
    loading_problem,
    problem_id,
    body,
    answer_type,
    title,
    correct_answer,
    choices,
  } = useGetProblemByChallengeId();

  const onExit = async () => {
    if (current_index === NUMBER_OF_QUIZ) {
      await getProblemByChallengeId(
        location.state.challenge_id,
        my_info.currentProblem
      );
    }
    if(is_level_up || is_rank_up) {
      playLevelUpSound();
    };
    history.push({
      pathname: "./all-challenges",
      state: {
        subject_name: location.state.subject_name,
        topic_name: location.state.topic_name,
        subtopic_id: location.state.subtopic_id,
        subtopic_name: location.state.subtopic_name,
        mode: location.state.mode,
        difficulty: location.state.difficulty,
        earned_coins: earned_coins,
        is_level_up: is_level_up,
        is_rank_up: is_rank_up
      },
    });
  };

  const onNext = async () => {
    if (my_info.currentProblem === NUMBER_OF_QUIZ - 1) {
      onExit();
    } else {
      set_current_index((index) => index + 1);
      set_user_answer();
      my_info.currentProblem++;
      getProblemByChallengeId(
        location.state.challenge_id,
        my_info.currentProblem
      );
    }
  };

  const onCheck = async (
    problemId,
    userId,
    userAnswer,
    getTime,
    subject,
    topic,
    subtopic,
    difficulty
  ) => {
    const check_button = document.getElementById("check_button");
    const skip_button = document.getElementById("skip_button");
    check_button.disabled = true;
    skip_button.disabled = true;

    if (userAnswer) {
      await getAndCheckAnswer(
        problemId,
        userId,
        userAnswer,
        getTime / 1000,
        subject,
        topic,
        subtopic,
        "CHALLENGE",
        location.state.challenge_id,
        my_info.currentProblem
      ).then((res) => {
        set_correct(res.data.correct);
        if (res.data.correct) {
          set_user_score(my_info.score);
        }
        set_answer_key(res.data.answer);
        set_earned_coins(
          (earned_coins) => earned_coins + res.data.earned_coins
        );
        if(res.data.level_up) {
          set_is_level_up(true);
        };
        if(res.data.rank_up) {
          set_is_rank_up(true);
        };
        res.data.correct ? playCorrectSound() : playWrongSound()
      });
      toggle();
    }
  };

  useEffect(() => {
    getChallengeInfo();
  }, []);

  useEffect(() => {
    // Only do once
    if (my_info) {
      getProblemByChallengeId(
        location.state.challenge_id,
        my_info.currentProblem
      );
    }
  }, []);

  return loading_info || loading_problem ? (
    <LoadingPage />
  ) : (
    <Container>
      <Timer
        formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
        startImmediately={false}
        lastUnit="h"
        initialTime={my_info.usedTime}
      >
        {({ getTime, start, stop, reset }) => (
          <React.Fragment>
            {problem_id && time_start ? start() : reset()}
            <Headline>
              <ExitModal onExit={() => onExit()} />
              <div style={{ marginRight: 8 }} />
              <ProblemIndex
                indexes={NUMBER_OF_QUIZ}
                current_index={my_info.currentProblem + 1}
              />
              <TimeContainer>
                <Body color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Body>
              </TimeContainer>
            </Headline>
            <UserInfo
              my_image={my_info.photo}
              challenger_image={challenger_info.photo}
              my_score={user_score}
              challenger_score={challenger_info.score}
              challenger_is_played={challenger_info.isPlayed}
            />
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
                correct_answer={correct_answer}
                question={body}
                choices={choices}
                content={body}
                answer={user_answer}
                set_answer={set_user_answer}
              />
            </ContentContainer>
            <ButtonContainer
              justifyContent={
                screen_width >= DEVICE_SIZE.LARGE
                  ? "space-evenly"
                  : "space-between"
              }
            >
              <Button
                id="skip_button"
                type="outline"
                onClick={() => {
                  stop();
                  set_time_start(false);
                  onCheck(
                    problem_id,
                    user_id,
                    WRONG_ANSWER.MATH,
                    getTime(),
                    location.state.subject_name,
                    location.state.topic_name,
                    location.state.subtopic_name,
                    location.state.difficulty
                  );
                }}
              >
                ข้าม
              </Button>
              <Button
                id="check_button"
                type={user_answer ? "default" : "disabled"}
                onClick={() => {
                  stop();
                  set_time_start(false);
                  onCheck(
                    problem_id,
                    user_id,
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
            </ButtonContainer>
            <AnswerModal
              isShowing={isShowing}
              toggle={toggle}
              subject={location.state.subject_name}
              correct={correct}
              answer={correct ? null : answer_key}
              buttonTitle={
                current_index === NUMBER_OF_QUIZ ? "เสร็จสิ้น" : "ทำต่อ"
              }
              overlay_clickable={false}
              onButtonClick={() => {
                onNext();
                set_time_start(true);
                reset();
              }}
            />
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

const ButtonContainer = styled.div.attrs((props) => ({
  justifyContent: props.justifyContent,
}))`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

export default withRouter(ChallengeGame);
