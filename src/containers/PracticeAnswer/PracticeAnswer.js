import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import styled from "styled-components";
import useSound from 'use-sound';

// Components
import {
  Container,
  correct_background_color,
  incorrect_background_color,
} from "./components/Container";
import Sign from "./components/Sign";
import { Solution } from "./components/Solution";
import { Button } from "../../components/Button";
import { LottieFile } from "../../components/LottieFile";
import { Report } from "../../components/Report";
import { LevelUpModal } from "../../components/LevelUpModal";
import useModal from "../../components/useModal";
import { DisplayText } from "../../components/HandleText";

// Media
import coin_data from "../../assets/lottie/coin.json";
import Correct_Forward from "../../assets/icon/correct_forward.png";
import Incorrect_Forward from "../../assets/icon/incorrect_forward.png";
import click from "../../assets/sounds/click.mp3";
import recieve_coin from "../../assets/sounds/recieve_coin.mp3";
import level_up from "../../assets/sounds/level_up.mp3";

// Global
import { Body, Header } from "../../components/Typography";

import {
  COLOR,
  CONTAINER_PADDING,
  DEVICE_SIZE,
  TYPOGRAPHY,
  NAVBAR_HEIGHT
} from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const TITLE = {
  CORRECT: "ถูกต้อง",
  INCORRECT: "คำตอบที่ถูกต้องคือ",
};

const PracticeAnswer = ({ history, user_info }) => {
  const [correct, set_correct] = useState(true);
  const [title, set_title] = useState(TITLE.CORRECT);
  // Static solution got populated after useEffect and never change
  // So you can always refer to this state
  const [staticSolution, set_static_solution] = useState("");
  // solution is an array of string. Each string represents one line of solution
  // At first, the array will have just one string but after click next line will be added to the solution
  const [solution, set_solution] = useState("");
  const [firstClick, setFirstClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowing, toggle] = useModal();

  const location = useLocation();

  const [playClickSound] = useSound(click, { volume: 0.25 });
  const [playRecieveCoinSound] = useSound(recieve_coin, { volume: 0.25 });
  const [playLevelUpSound] = useSound(level_up, { volume: 0.25 });

  const handleNextButtonClick = () => {
    history.push({
      pathname:
        "./practice-game",
      state: {
        userId: location.state.userId,
        problemId: location.state.problemId,
        subject_name: location.state.subject,
        topic_name: location.state.topic,
        subtopic_name: location.state.subtopic,
        difficulty: location.state.difficulty,
      },
    });
  };

  const handleArrowClick = () => {
    if (solution.length === staticSolution.length) {
    } else {
      if (!firstClick) {
        setFirstClick(true);
      }
      // Get first value that is not already in solution
      const nextVal = staticSolution.filter((sol) => {
        return !solution.includes(sol);
      });
      let tmpSol = solution.slice();
      tmpSol.push(nextVal[0]);
      set_solution([...tmpSol]);
    }
  };

  const onReport = async () => {
    history.push({
      pathname: "./report",
      state: {
        subject_name: location.state.subject,
        mode: location.state.mode,
        problem_id: location.state.problemId,
        problem_content: location.state.problem_content,
        problem_title: location.state.problem_title,
        answer_type: location.state.answer_type,
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    set_correct(location.state.correct);
    set_title(location.state.correct ? TITLE.CORRECT : TITLE.INCORRECT);
    if (location.state.solution === "" || !location.state.solution) {
      set_static_solution([location.state.correct_answer]);
    } else {
      set_static_solution(location.state.solution.split(/[\r\n]+/));
    };
    set_solution([]);
    setIsLoading(false);
    if(location.state.is_level_up || location.state.is_rank_up) {
      toggle();
    };
  }, []);

  // rerender when solution change
  useEffect(() => {}, [solution]);

  const { height, width: screen_width } = useWindowDimensions();

  const greetingHolder = () => {
    if (firstClick && correct && solution.length === staticSolution.length) {
      return (
        <GreetingDiv>
          <Body style={{ lineHeight: "1.2em" }}>
            {`ยินดีด้วย! คุณได้รับ ${location.state.earned_coins} เหรียญ`}
          </Body>
          <div style={{ display: "inline-block", marginTop: "8px" }}>
            <LottieFile
              animationData={coin_data}
              loop={false}
              height={30}
              width={30}
            />
          </div>
        </GreetingDiv>
      );
    } else {
      if (!correct) {
        return (
          <GreetingDiv>
            <Body style={{ lineHeight: "1.2em", visibility: "hidden" }}></Body>
          </GreetingDiv>
        );
      }
    }
  };

  const arrowHolder = () => {
    if (solution.length === staticSolution.length) {
      return (
        <ShiftDiv style={{ zIndex: "1" }}>
          <div style={{ marginTop: "20px" }}>
            <Button
              type="custom"
              border="none"
              color={COLOR.WHITE}
              backgroundColor={
                correct ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`
              }
              onClick={() => handleNextButtonClick()}
            >
              ทำต่อ
            </Button>
          </div>
          <LevelUpModal
            isShowing={isShowing}
            toggle={toggle}
            rank={location.state.is_rank_up ? user_info?.rank : null}
            level={user_info?.level}
            exp={user_info?.exp}
            max_exp={user_info?.maxExp}
            coin={location.state.earned_coins}
          />
        </ShiftDiv>
      );
    }
    // }
    else {
      return (
        <ShiftDiv style={{ zIndex: "500" }}>
          <img
            src={correct ? Correct_Forward : Incorrect_Forward}
            alt="arrow"
            height={40}
            onClick={() => {
              handleArrowClick();
              playClickSound();
              if(solution.length+1 === staticSolution.length && correct) {
                if(location.state.is_level_up || location.state.is_rank_up) {
                  playLevelUpSound();
                } else {
                  playRecieveCoinSound();
                };
              };
            }}
          />
        </ShiftDiv>
      );
    }
  };

  return (
    <Container
      answer={correct}
      minHeight={height - CONTAINER_PADDING - NAVBAR_HEIGHT}
    >
      <Background answer={correct} />
      <CenterDiv
        style={{ marginTop: 32, marginBottom: 16, position: "relative" }}
      >
        <Sign answer={correct} />
      </CenterDiv>
      <CenterDiv>
        {correct ? (
          <Header color={COLOR.CELERY}>{title}</Header>
        ) : (
          <Header color={COLOR.TRINIDAD}>{title}</Header>
        )}
      </CenterDiv>
      {firstClick ? (
        <SolutionDiv>
            {solution.map((line, i) => {
              return (
                <Solution answer={correct} key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        location.state.subject === "คณิตศาสตร์" &&
                        screen_width < DEVICE_SIZE.LARGE &&
                        line.length > 55
                          ? "flex-start"
                          : "center",
                    }}
                  >
                    {location.state.subject === "คณิตศาสตร์" ? (
                      <DisplayText
                        fontWeight={TYPOGRAPHY.SUBHEADER.font_weight}
                        fontSize={TYPOGRAPHY.SUBHEADER.fontSize}
                        color={correct ? COLOR.CELERY : COLOR.TRINIDAD}
                        content={line}
                      />
                    ) : (
                      line
                    )}
                  </div>
                </Solution>
              );
            })}
        </SolutionDiv>
      ) : (
        <SolutionDiv></SolutionDiv>
      )}

      {greetingHolder()}

      {arrowHolder()}

      <ReportContainer>
        <Report 
          correct={correct} 
          onReport={() => onReport()}
        />
      </ReportContainer>
    </Container>
  );
};

const Background = styled.div`
  background-color: ${(props) =>
    props.answer ? correct_background_color : incorrect_background_color};
  width: 100%;
  height: 100%;
  top: ${NAVBAR_HEIGHT}px;
  left: 0px;
  position: fixed;
  overflow-y: scroll;
  z-index: 0;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SolutionDiv = styled(CenterDiv)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  margin: 16px auto 52px auto;
  height: 280px;
  width: 100%;
  overflow: scroll;
`;

const GreetingDiv = styled.div`
  margin-top: 104px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ShiftDiv = styled(CenterDiv)`
  margin-bottom: auto;
  min-height: 72px;
`;

const ReportContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
`;

export default withRouter(PracticeAnswer);
