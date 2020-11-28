import React, { useState } from "react";
import styled from "styled-components";

// Media
import Correct from "../../resources/Practice_Answer/Correct.png";
import Incorrect from "../../resources/Practice_Answer/Incorrect.png";
import Correct_Flag from "../../resources/Practice_Answer/Correct_Flag.png";
import Incorrect_Flag from "../../resources/Practice_Answer/Incorrect_Flag.png";

// Color
import { CELERY, TRINIDAD } from "../../global/const";
import { convertHexToRGBA } from "../../global/utils";

const PracticeAnswer = () => {
  const [correct, setCorrect] = useState(true);

  // 33 is setting opacity to 0.2
  const correct_background_color = convertHexToRGBA(`${CELERY}`, 20);
  const incorrect_background_color = convertHexToRGBA(`${TRINIDAD}`, 20);

  const Container = styled.div`
    background-color: ${(props) =>
      props.answer ? correct_background_color : incorrect_background_color};
    height: 100vh;
  `;

  const CorrectSignDiv = styled.div`
    display: flex;
    justify-content: center;
  `;

  const CorrectSign = styled.img`
    alt: "Correct Sign";
    height: 10vh;
    margin-top: 5vh;
  `;

  return (
    <Container answer={correct}>
      <CorrectSignDiv>
        <CorrectSign src={Correct} />
      </CorrectSignDiv>
    </Container>
  );
};

export default PracticeAnswer;
