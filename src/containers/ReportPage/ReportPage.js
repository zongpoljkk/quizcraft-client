import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";

import { Header, Subheader } from "../../components/Typography";
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button";
import { RadioButton } from "../../components/RadioButton";
import { TextField } from "../../components/TextField";
import useModal from "../../components/useModal";
import { ConfirmResultModal } from "../../components/ConfirmResultModal";

import { REPORT } from "../../global/const";

import { useSendReport } from "./ReportPageHelper";

//MOCK DATA
const PROBLEM_TITLE = "จงทำเลขยกกำลังต่อไปนี้ให้เป็นรูปอย่างง่าย"
const PROBLEM_CONTENT = "g^[14]*g^[-34]*g^[36]*g^[-16]"
const PROBLEM_ID = "5fec5c4c1ba7064f71af1727"

const ReportPage = () => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const [report_problem, set_report_problem] = useState();
  const [etc_problem, set_etc_problem] = useState();
  const [report_content, set_report_content] = useState();
  const [isShowing, toggle] = useModal();
  const user_id = localStorage.getItem("userId");
  var date;
  const { sendReport, report_success } = useSendReport(user_id, PROBLEM_ID, report_content, date);

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  const handleOnclick = (content) => {
    set_report_content(content);
    date = new Date();
    sendReport();
    toggle();
  }

  useEffect(() => {
    sendReport();
  }, [report_content]);
  
  return ( 
    <Container ref={ref}>
      <CenterContainer>
        <Header> รายงาน </Header>
      </CenterContainer>
      <div style={{marginTop: "16px"}}>
        <Subheader> โจทย์ </Subheader>
      </div>
      <div style={{marginTop: "8px", marginBottom: "24px"}}>
        <ProblemBox
          problem={PROBLEM_TITLE}
          problem_content={PROBLEM_CONTENT}
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
        <TextfieldContainer width={container_width-32}>
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
          ตรวจ
        </Button>
      </CenterContainer>
      <ConfirmResultModal
        isShowing={isShowing}
        toggle={toggle}
        success={report_success}
        success_description="ขอบคุณสำหรับความใส่ใจ :)"
        fail_description="ล้มเหลว กรุณาส่งปัญหานี้ใหม่อีกครั้ง"
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

export default ReportPage;