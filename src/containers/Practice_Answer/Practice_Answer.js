import React, { useState } from "react";
import styled from "styled-components";

const PracticeAnswer = () => {
  const [correct, setCorrect] = useState(false);

  const Container = styled.div`
    background-color: ${props => props.answer ? 'green' : '#D24C2B'};
    height: 100vh;
    margin-top: 0vh;
  `;

  return (
    <Container answer={correct}>

    </Container>
  );
};

export default PracticeAnswer;
