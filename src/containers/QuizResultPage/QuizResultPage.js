import React from "react";
import styled from "styled-components";

// Typography
import { Header } from "../../components/Typography";

const QuizResultPage = () => {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        <Header>สรุปคะแนน</Header>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default QuizResultPage;
