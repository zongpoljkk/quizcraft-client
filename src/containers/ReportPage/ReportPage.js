import React, {useState} from "react";
import styled from "styled-components";

import { Header, Subheader } from "../../components/Typography";
import { ProblemBox } from "../../components/ProblemBox";
import { Button } from "../../components/Button"
import { RadioButton } from "../../components/RadioButton";
import { TextField } from "../../components/TextField";

import { REPORT } from "../../global/const";

//MOCK DATA
const PROBLEM_TITLE = "จงทำเลขยกกำลังต่อไปนี้ให้เป็นรูปอย่างง่าย"
const PROBLEM_CONTENT = "g^[14]*g^[-34]*g^[36]*g^[-16]"

const ReportPage = () => {
  const [report_problem, set_report_problem] = useState();
  const [etc_problem, set_etc_problem] = useState();
  
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
          problem={PROBLEM_TITLE}
          problem_content={PROBLEM_CONTENT}
        />
      </div>
      <div style={{marginBottom: "8px"}}>
        <Subheader> ปัญหาที่พบ </Subheader>
      </div>
      {Object.entries(REPORT).map(([report_key, report_value]) => (
        <div style={{marginBottom: "4px"}}>
          <RadioButton
            key = {report_key}
            value={report_problem} 
            selected_value={set_report_problem} 
            choices={[report_value]}
            />
        </div>
      ))}
      {report_problem === "อื่น ๆ" &&
        <TextField
          value={etc_problem}
          onChange={e => set_etc_problem(e.target.value)}
          placeholder="ปัญหาที่พบ"
        />
      }
      <CenterContainer marginTop="36">
        <Button type={report_problem ? "default" : "disabled"}>
          ตรวจ
        </Button>
      </CenterContainer>
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


export default ReportPage;