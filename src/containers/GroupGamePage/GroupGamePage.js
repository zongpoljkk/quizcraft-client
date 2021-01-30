import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Timer from "react-compound-timer";

import { Subheader } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal"
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button"
import { ProblemIndex } from "../../components/ProblemIndex"
import { AnswerModal } from "../../components/AnswerModal"
import useModal from "../../components/useModal";
import GameContent from "../../components/GameContent";
import LoadingPage from "../LoadingPage/LoadingPage";
import { PointBox } from "./components/PointBox";

import { ANSWER_TYPE, COLOR, LARGE_DEVICE_SIZE, WRONG_ANSWER } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import { useGetGroupGame, checkGroupAnswer } from "./GroupGamePageHelper";

const GroupGamePage = ({ history }) => {
  
  const location = useLocation();
  const [isShowing, toggle] = useModal();
  const [used_time, set_used_time] = useState();
  const [is_time_out, set_is_time_out] = useState(false);
  const [answer, set_answer] = useState();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const user_id = localStorage.getItem("userId");
  const [answer_modal_loading, set_answer_modal_loading] = useState(false);
  const [correct, set_correct] = useState();
  const [correct_answer, set_correct_answer] = useState("");

  const {
    getGroupGame,
    loading,
    current_index,
    number_of_problem,
    time_per_problem,
    user,
    problem
  } = useGetGroupGame(user_id, location.state.group_id);

  const onSkip = () => {
    set_answer(WRONG_ANSWER);
    set_used_time(time_per_problem);
  };

  const onSend = () => {
    console.log(answer);
    console.log(time_per_problem);
    console.log(used_time);
    if(answer) {
      console.log(answer)
      toggle();
      // TODO: connect API send answer
      set_answer_modal_loading(true);
      checkGroupAnswer(user_id, problem._id, answer, "group", location.state.group_id, used_time).then((res) => {
        console.log(res)
        set_correct(res.data.correct);
        set_correct_answer(res.data.correctAnswer);
      });
    };
  };

  const onTimeOut = () => {
    set_is_time_out(true);
    onSkip();
  };

  useEffect(() => {
    getGroupGame();
  }, []);

  // Wait until user time has been updated, then call onSend
  useEffect(() => {
    onSend();
  }, [used_time])

  // close loading modal after getting correct_answer from backend
  useEffect(() => {
    console.log("useEffect get data back from BE")
    console.log(correct_answer);
    if (correct_answer) {
      set_answer_modal_loading(false);
    }
  }, [correct_answer])

  return ( 
    <Container>
      {loading 
        ? <LoadingPage/>
        : (
        <Timer
          formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
          startImmediately={false}
          lastUnit="h"
          initialTime={time_per_problem*1000}
          direction="backward"
        >
          {({ getTime, start, reset }) => (
            <React.Fragment>
              {is_time_out ? reset() : start()}
              <Headline>
                <ExitModal onExit={() => history.push("/")}/>
                <div style={{ marginRight: 8 }}/>
                <ProblemIndex indexes={number_of_problem} current_index={current_index+1}/>
                {user &&
                  <div style={{ marginRight: 8 }}>
                    <PointBox points={user?.point}/>
                  </div>
                }
              </Headline>
              <TimeContainer>
                <Subheader color={COLOR.MANDARIN}>
                  <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                </Subheader>
              </TimeContainer>
              <React.Fragment>
                <ProblemBox
                  problem={problem.title}
                  problem_content={problem.answerType === ANSWER_TYPE.MATH_INPUT ? problem.body : null}
                />
                <ContentContainer 
                  style={{ alignSelf: problem.answerType === ANSWER_TYPE.MATH_INPUT ? "center" : "flex-start" }}
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
                  />
                </ContentContainer>
                {user &&
                  <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
                    <Button
                      type="outline"
                      onClick={() => {
                        onSkip();
                      }}
                    >
                      ข้าม
                    </Button>
                    <Button
                      type={answer ? "default" : "disabled"}
                      onClick={() => {
                        set_used_time((time_per_problem - getTime()/1000));
                      }}
                    >
                      ส่ง
                    </Button>
                  </ButtonContainer>
                }
                {answer_modal_loading && <LoadingPage overlay={true} />}
                {!answer_modal_loading ? <AnswerModal
                  isShowing={isShowing}
                  toggle={toggle}
                  subject={location.state.subject_name}
                  correct={correct}
                  answer={correct ? null : correct_answer}
                  overlay_clickable={false}
                /> : null}
                {getTime() <= 0 && onTimeOut()}
              </React.Fragment>
            </React.Fragment>
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
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  justify-content: ${props => props.justifyContent};
`;

export default withRouter(GroupGamePage);