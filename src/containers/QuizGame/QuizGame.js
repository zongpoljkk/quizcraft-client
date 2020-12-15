import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal"
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button"
import { ProblemIndex } from "../../components/ProblemIndex"
import { AnswerModal } from "../../components/AnswerModal"
import useModal from "../../components/useModal";
import GameContent from "../../components/GameContent";
import { HeadlineItem } from "./component/HeadlineItem"
import LoadingPage from "../LoadingPage/LoadingPage";

import { 
  useGetHintByProblemId,
  useGetEachProblem
} from "./QuizGameHelper";

import { ANSWER_TYPE, COLOR } from "../../global/const"

// MOCK DATA
const CORRECT = false;
const CORRECT_ANSWER_FROM_BACKEND = "(22^[5]*22^[2])*22^[39+4x]";
const USER_ID = "5fcb4ccbc53dd068520072a1";

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
  USED: "USED",
}
const NUMBER_OF_QUIZ = 10;

const QuizGame = ({ history }) => {
  
  const location = useLocation();
  const {isShowing, toggle} = useModal();
  const [used_time, set_used_time] = useState();
  const [answer, set_answer] = useState();
  const [skip, set_skip] = useState(ITEM_USAGE.UN_USE);
  const [refresh, set_refresh] = useState(ITEM_USAGE.UN_USE);
  const [current_index, set_current_index] = useState(1);
  
  const { 
    getEachProblem,
    loading,
    problem_id,
    body,
    answer_type,
    title,
    correct_answer,
    choices
  } = useGetEachProblem(
    USER_ID, 
    location.state.subject_name, 
    location.state.subtopic_name, 
    location.state.difficulty,
  );
  const { getHintByProblemId, hint } = useGetHintByProblemId(problem_id);

  const onSkip = () => {
    set_skip(ITEM_USAGE.IN_USE);
    getEachProblem(set_skip);
    set_current_index((index) => index+1);
  };

  const onRefresh = () => {
    set_refresh(ITEM_USAGE.IN_USE);
    getEachProblem(set_refresh);
  };

  const onExit = (subject_name, topic_name) => {
    history.push({
      pathname: "/" + subject_name + "/" + topic_name, 
      state: {
        subject_name: subject_name,
        topic_name: topic_name,
      }
    });
  };

  const onCheck = () => {
    if(answer) {
      toggle();
      // TODO: connect API check answer
    }
  };

  const onNext = () => {
    if(current_index === NUMBER_OF_QUIZ) {
      // TODO: push to result page
    }
    else {
      set_current_index((index) => index+1);
      set_answer();
      getEachProblem();
      // TODO: check amount of item -> set item
    }
  };

  useEffect(() => {
    getEachProblem();
  }, []);

  return ( 
    <Container>
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        startImmediately={true}
        lastUnit="h"
      >
        {({ getTime, start, stop, reset }) => (
          <React.Fragment>
            <Headline>
              <ExitModal onExit={() => onExit(location.state.subject_name, location.state.topic_name)}/>
              <div style={{ marginRight: 8 }}/>
              <ProblemIndex indexes={NUMBER_OF_QUIZ} current_index={current_index}/>
            </Headline>
            <HeadlineItem 
              onGetHint={() => getHintByProblemId()}
              hintContent={hint}
              skip={skip} 
              onSkip={onSkip}
              refresh={refresh}
              onRefresh={onRefresh}
            >
            <TimeContainer>
              <Body color={COLOR.MANDARIN}>
                <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
              </Body>
            </TimeContainer>
            </HeadlineItem>
            {loading 
            ? <LoadingPage/>
            : (
              <React.Fragment>
                <ProblemBox
                  problem={title}
                  problem_content={answer_type === ANSWER_TYPE.MATH_INPUT ? body : null}
                />
                <ContentContainer 
                  style={{ alignSelf: answer_type === ANSWER_TYPE.MATH_INPUT ? "center" : "flex-start" }}
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
                </ContentContainer>
                <CenterContainer>
                  <Button
                    type={answer ? "default" : "disabled"}
                    onClick={() => {
                      set_used_time(getTime()/1000);
                      stop();
                      onCheck();
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
                    buttonTitle={current_index === NUMBER_OF_QUIZ ? "เสร็จสิ้น" : "ทำต่อ"}
                    onButtonClick={() => {
                      onNext();
                      reset();
                      start();
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