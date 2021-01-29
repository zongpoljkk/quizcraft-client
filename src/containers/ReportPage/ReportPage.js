import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";

import { Header, Subheader } from "../../components/Typography";
import { ProblemBox } from "../../components/ProblemBox";
import GameContent from "../../components/GameContent";
import { Button } from "../../components/Button";
import { RadioButton } from "../../components/RadioButton";
import { TextField } from "../../components/TextField";
import useModal from "../../components/useModal";
import { ConfirmResultModal } from "../../components/ConfirmResultModal";

import { ANSWER_TYPE, CONTAINER_PADDING, REPORT } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import { useSendReport } from "./ReportPageHelper";


const ReportPage = ({ history }) => {
  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [report_problem, set_report_problem] = useState();
  const [etc_problem, set_etc_problem] = useState();
  const [report_content, set_report_content] = useState();
  const [isShowing, toggle] = useModal();
  const user_id = localStorage.getItem("userId");
  var date;
  const { sendReport, report_success } = useSendReport(user_id, location.state.problem_id, report_content, date);

  const handleOnclick = (content) => {
    set_report_content(content);
    date = new Date();
    sendReport();
    toggle();
  }

  const onSubmit = () => {
    history.goBack();
  }

  useEffect(() => {
    sendReport();
  }, [report_content]);
  
  return ( 
    <Container>
      <CenterContainer>
        <Header> รายงาน </Header>
      </CenterContainer>
      <div style={{marginTop: "16px"}}>
        <Subheader> โจทย์ </Subheader>
      </div>
      <div style={{marginTop: "8px", marginBottom: "24px"}}>
        <ProblemBox
          problem={location.state.problem_title}
          problem_content={
            location.state.answer_type === ANSWER_TYPE.MATH_INPUT ? location.state.problem_content : null
          }
          show_game_content = {true}
          answer_type={location.state.answer_type}
          subject={location.state.subject_name}
          question={location.state.problem_content}
          content={location.state.problem_content}
        />
      </div>
      <div style={{marginBottom: "8px"}}>
        <Subheader> ปัญหาที่พบ </Subheader>
      </div>
      {Object.entries(REPORT).map(([report_key, report_value]) => (
        <div style={{marginLeft: "8px", marginBottom: "4px"}}>
          <RadioButton
            key = {report_key}
            value={report_problem} 
            selected_value={set_report_problem} 
            choices={[report_value]}
            />
        </div>
      ))}
      {report_problem === REPORT.ETC &&
        <TextfieldContainer width={screen_width-CONTAINER_PADDING-32}>
          <TextField 
            height="36"
            value={etc_problem}
            onChange={e => set_etc_problem(e.target.value)}
            placeholder="ปัญหาที่พบ"
          />
        </TextfieldContainer>
      }
      <CenterContainer marginTop="36">
        <Button 
          type={((report_problem && report_problem !== REPORT.ETC) || (report_problem === REPORT.ETC && etc_problem)) ? "default" : "disabled"}
          onClick={() => report_problem !== REPORT.ETC ? handleOnclick(report_problem) : handleOnclick(etc_problem)}
        >
          ยืนยัน
        </Button>
      </CenterContainer>
      <ConfirmResultModal
        isShowing={isShowing}
        toggle={toggle}
        success={report_success}
        success_description="ขอบคุณสำหรับความใส่ใจ :)"
        fail_description="ล้มเหลว กรุณาส่งปัญหานี้ใหม่อีกครั้ง"
        onSubmit={()=>onSubmit()}
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

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 16px;
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