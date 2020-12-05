import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/Typography";
import SubtopicBox from "./components/SubtopicBox";

const SubtopicPage = () => {
  const [topic, setTopic] = useState("แกรมมาร์"); //แกรมมาร์, ยกกำลัง
  return (
    <Container>
      <Topic_style>
        <Header> {topic} </Header>
      </Topic_style>
      <SubtopicBox title="แนวโจทย์แบบเติมคำตอบที่ถูกต้อง" />
      <SubtopicBox title="แนวโจทย์แบบมีตัวเลือกที่ถูกต้อง" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Topic_style = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;
export default SubtopicPage;
