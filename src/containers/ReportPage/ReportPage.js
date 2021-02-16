import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";

import { Header, Subheader } from "../../components/Typography";
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button";
import { RadioButton } from "../../components/RadioButton";
import { TextField } from "../../components/TextField";
import useModal from "../../components/useModal";
import { ConfirmResultModal } from "../../components/ConfirmResultModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import { ANSWER_TYPE, CONTAINER_PADDING, MODE, REPORT } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import { useSendReport } from "./ReportPageHelper";


const ReportPage = ({ history }) => {
  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [report_problem, set_report_problem] = useState();
  const [etc_problem, set_etc_problem] = useState();
  const [report_content, set_report_content] = useState();
  const [is_clicked, set_is_clicked] = useState(false);
  const [isShowing, toggle] = useModal();
  const user_id = localStorage.getItem("userId");
  var date;
  const { sendReport, report_success, report_loading } = useSendReport(
    user_id,
    location.state.problem_id,
    report_content,
    date
  );

  const handleOnclick = async (content) => {
    await set_report_content(content);
    date = new Date();
    await set_is_clicked(true);
  };

  const onSubmit = () => {
    if (report_success) {
      if (location.state.mode === MODE.PRACTICE.type) {
        history.goBack();
      } else if (location.state.mode === MODE.CHALLENGE.type) {
        if (location.state.current_index < location.state.number_of_problem) {
          history.goBack();
        } else {
          history.push({
            pathname: "./all-challenges",
            state: {
              subject_name: location.state.subject_name,
              topic_name: location.state.topic_name,
              subtopic_id: location.state.subtopic_id,
              subtopic_name: location.state.subtopic_name,
              mode: location.state.mode,
              difficulty: location.state.difficulty,
            },
          });
        }
      } else if (location.state.mode === MODE.QUIZ.type) {
        if (location.state.current_index < location.state.number_of_problem) {
          history.push({
            pathname: "./quiz-game",
            state: {
              subject_name: location.state.subject_name,
              topic_name: location.state.topic_name,
              subtopic_name: location.state.subtopic_name,
              mode: location.state.mode,
              difficulty: location.state.difficulty,
              current_index: location.state.current_index,
              score: location.state.score,
              earned_exp: location.state.earned_exp,
              earned_coins: location.state.earned_coins,
            },
          });
        } else {
          history.push({
            pathname: "./quiz-result",
            state: {
              subject: location.state.subject_name,
              topic: location.state.topic_name,
              subtopic: location.state.subtopic_name,
              mode: location.state.mode,
              difficulty: location.state.difficulty,
              score: location.state.score,
              earned_exp: location.state.earned_exp,
              earned_coins: location.state.earned_coins,
            },
          });
        }
      } else {
        history.push({
          pathname: "./group-game",
          state: {
            group_id: location.state.group_id,
            subject_name: location.state.subject_name,
            topic: location.state.topic_name,
            subtopic: location.state.subtopic_name,
            difficulty: location.state.difficulty,
            correct_answer: location.state.correct_answer, 
            correct: location.state.correct,
          },
        });
      }
    }
  };

  useEffect(() => {
    if(is_clicked){
      sendReport();
    };
  }, [is_clicked]);

  useEffect(() => {
    if(report_success){
      toggle();
    };
  }, [report_success]);
  
  return (
    <Container>
      <CenterContainer>
        <Header> รายงาน </Header>
      </CenterContainer>
      <div style={{ marginTop: "16px" }}>
        <Subheader> โจทย์ </Subheader>
      </div>
      <div style={{ marginTop: "8px", marginBottom: "24px" }}>
        <ProblemBox
          problem={location.state.problem_title}
          problem_content={
            location.state.answer_type === ANSWER_TYPE.MATH_INPUT
              ? location.state.problem_content
              : null
          }
          show_game_content={true}
          answer_type={location.state.answer_type}
          subject={location.state.subject_name}
          question={location.state.problem_content}
          content={location.state.problem_content}
        />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <Subheader> ปัญหาที่พบ </Subheader>
      </div>
      {Object.entries(REPORT).map(([report_key, report_value]) => (
        <div style={{ marginLeft: "8px", marginBottom: "4px" }}>
          <RadioButton
            key={report_key}
            value={report_problem}
            selected_value={set_report_problem}
            choices={[report_value]}
          />
        </div>
      ))}
      {report_problem === REPORT.ETC && (
        <TextfieldContainer width={screen_width - CONTAINER_PADDING - 32}>
          <TextField
            height="36"
            value={etc_problem}
            onChange={(e) => set_etc_problem(e.target.value)}
            placeholder="ปัญหาที่พบ"
          />
        </TextfieldContainer>
      )}
      <CenterContainer marginTop="36">
        <Button
          type={
            (report_problem && report_problem !== REPORT.ETC) ||
            (report_problem === REPORT.ETC && etc_problem)
              ? "default"
              : "disabled"
          }
          disabled={
            !(
              (report_problem && report_problem !== REPORT.ETC) ||
              (report_problem === REPORT.ETC && etc_problem)
            )
          }
          onClick={() =>
            report_problem !== REPORT.ETC
              ? handleOnclick(report_problem)
              : handleOnclick(etc_problem)
          }
        >
          ยืนยัน
        </Button>
      </CenterContainer>
      {report_loading && <LoadingPage overlay={true} />}
      <ConfirmResultModal
        isShowing={isShowing}
        toggle={toggle}
        success={report_success}
        success_description="ขอบคุณสำหรับความใส่ใจ :)"
        fail_description="ล้มเหลว กรุณาส่งปัญหานี้ใหม่อีกครั้ง"
        onSubmit={() => onSubmit()}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CenterContainer = styled.div.attrs(props => ({
  marginTop: props.marginTop
}))`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.marginTop}px;
`;

const TextfieldContainer = styled.div.attrs(props => ({
  width: props.width
}))`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: ${props => props.width}px;
  margin-left: 32px;
`;

export default withRouter(ReportPage);