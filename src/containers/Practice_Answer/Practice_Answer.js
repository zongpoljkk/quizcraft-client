import React, { useState } from "react";
import styled from "styled-components";

const PracticeAnswer = () => {
  const [correct, setCorrect] = useState(false);

  const Container = styled.div`
    background-color: ${props => props.answer ? 'green' : 'red'};
    height: 100vh;
  `;

  return (
    <Container answer={correct}>
      <h1>Practice Answer</h1>
    </Container>
  );
};

export default PracticeAnswer;
