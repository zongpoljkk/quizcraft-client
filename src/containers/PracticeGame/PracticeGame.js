import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal"
import { ItemCard } from "../../components/ItemCard";
import { ProblemBox } from "../../components/ProblemBox";
import { HintItem } from "../../components/HintItem"
import { Button } from "../../components/Button"
import PracticeGameContent from "./PracticeGameContent";

import { 
  useGetHintByProblemId,
  useGetProblemForUser
} from "./PracticeGameHelper";

import skip_icon from "../../assets/icon/skip.png";

import { ANSWER_TYPE, COLOR } from "../../global/const"

// MOCK DATA
const USER_ID = "5fcb4ccbc53dd068520072a1";

const PracticeGame = () => {

  const location = useLocation();
  const [used_time, set_used_time] = useState();
  const [answer, set_answer] = useState();

  const { 
    getProblemForUser,
    loading,
    problem_id,
    body,
    answer_type,
    title,
    correct_answer,
    choices
  } = useGetProblemForUser(
    USER_ID, 
    location.state.subject_name, 
    location.state.subtopic_name, 
    location.state.difficulty
  );
  const { getHintByProblemId, hint } = useGetHintByProblemId(problem_id);

  const onSkip = () => {
    // TODO: connect API get new question
    console.log("skip ja");
  }

  const onExit = () => {
    // TODO: connect API get new question
    console.log("exit ja");
  }

  useEffect(() => {
    getProblemForUser();
  }, []);

  return ( 
    <React.Fragment>
      {loading 
      ? <div> loading </div>
      : (
        <Container>
          <Timer
            formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
            startImmediately={true}
            lastUnit="h"
          >
            {({ getTime }) => (
              <React.Fragment>
                <Headline>
                  <ExitModal onExit={onExit}/>
                  <HintItem onGetHint={() => getHintByProblemId()} content={hint}/>
                  <ItemCard onClick={onSkip}>
                    <img src={skip_icon} height={20}/>
                  </ItemCard>
                  <TimeContainer>
                    <Body color={COLOR.MANDARIN}>
                      <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                    </Body>
                  </TimeContainer>
                </Headline>
                <ProblemBox
                  problem={title}
                  problem_content={answer_type === ANSWER_TYPE.MATH_INPUT ? body : null}
                />
                <ContentContainer 
                  style={{ alignSelf: answer_type === ANSWER_TYPE.MATH_INPUT ? "center" : "flex-start" }}
                >
                  <PracticeGameContent 
                    type={answer_type}
                    correct_answer={correct_answer}
                    question={body}
                    choices={choices}
                    content={body}
                    answer={answer}
                    set_answer={set_answer}
                  />
                </ContentContainer>
                <ButtonContainer>
                  <Button
                    type={answer ? "default" : "disabled"}
                    onClick={() => set_used_time(getTime()/1000)}
                  >
                    ตรวจ
                  </Button>
                </ButtonContainer>
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

export default PracticeGame;