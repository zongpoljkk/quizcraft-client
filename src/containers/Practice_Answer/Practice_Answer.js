import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Media
import Correct from "../../assets/Correct.png";
import Incorrect from "../../assets/Incorrect.png";
import Correct_Flag from "../../assets/Correct_Flag.png";
import Incorrect_Flag from "../../assets/Incorrect_Flag.png";
import Correct_Backward from "../../assets/Correct_Backward.png";
import Correct_Forward from "../../assets/Correct_Forward.png";
import Incorrect_Backward from "../../assets/Incorrect_Backward.png";
import Incorrect_Forward from "../../assets/Incorrect_Forward.png";

// Color
import { CELERY, TRINIDAD, WHITE } from "../../global/const";
import { convertHexToRGBA } from "../../global/utils";

const PracticeAnswer = () => {
  const [correct, setCorrect] = useState(true);
  // title is an enum ("ถูกต้อง", "วิธีทำที่ถูกต้อง")
  const [title, setTiitle] = useState("ถูกต้อง");
  // Static solution got populated after useEffect and never change
  // So you can always refer to this state
  const [staticSolution, setStaticSolution] = useState(["", "", ""]);
  // solution is an array of string. Each string represents one line of solution
  // At first, the array will have just one string but after forward click, we'll
  // add one more line to the array and remove one line after backward click
  const [solution, setSolution] = useState([
    "2 x 6 = 2 x 2 x 3",
    "= 4 x 3 ",
    "= 12",
  ]);

  const backward = () => {
    if (solution.length !== 0) {
      // TODO: remove last index from solution
      //   setSolution(solution.pop());
    }
  };

  const forward = () => {
    if (solution.length !== staticSolution.length) {
      // TODO: append next step to solution
      // setSolution([...solution, staticSolution[solution.length]])
    }
  };

  useEffect(() => {
    // TODO: Get the solution and store each line in staticSolution
    //   axios.get().then((res) => {
    //       setStaticSolution(res)
    //     })
  });

  // 33 is setting opacity to 0.2
  const correct_background_color = convertHexToRGBA(`${CELERY}`, 20);
  const incorrect_background_color = convertHexToRGBA(`${TRINIDAD}`, 20);

  const Container = styled.div`
    background-color: ${(props) =>
      props.answer ? correct_background_color : incorrect_background_color};
    height: 100vh;
  `;

  const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Sign = styled.img`
    alt: "Correct Sign";
    height: 10vh;
    margin-top: 10vh;
  `;

  const Title = styled.p`
    font-family: Prompt;
    font-size: 5vw;
    color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
  `;

  const Solution = styled.p`
    font-family: Prompt;
    font-size: 5vw;
    color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
  `;

  const Greeting = styled.p`
    font-family: Prompt;
  `;

  const ShiftLeft = styled.img`
    alt: "Correct Backward";
    height: 5vh;
    margin-top: 5vh;
    margin-right: 5vh;
  `;

  const ShiftRight = styled.img`
    alt: "Correct Backward";
    height: 5vh;
    margin-top: 5vh;
    margin-left: 5vh;
  `;

  const NextButton = styled.button`
    background-color: ${(props) =>
      props.answer ? `${CELERY}` : `${TRINIDAD}`};
    border-radius: 10px;
    font-family: Prompt;
    color: ${WHITE};
    width: 40vw;
    height: 5vh;
    margin-top: 5vh;
  `;

  const CorrectFlag = styled.img`
    alt: "Correct Flag";
    height: 3vh;
    margin-left: 10vw;
    margin-top: 5vh;
    display: inline-block;
  `;

  const CorrectReport = styled.p`
    font-family: Prompt;
    color: ${CELERY};
    text-decoration: underline;
    display: inline-block;
    margin-left: 3vw;
  `

  return (
    <Container answer={correct}>
      <CenterDiv>
        {correct ? <Sign src={Correct} /> : <Sign src={Incorrect} />}
      </CenterDiv>
      <CenterDiv>
        <Title answer={correct}>{title}</Title>
      </CenterDiv>
      <CenterDiv>
        <ul style={{ listStyle: "none" }}>
          {solution.map((line) => {
            // TODO: Replace Math.random() with solution.id after it has one
            return (
              <li key={Math.random()}>
                <Solution answer={correct}>{line}</Solution>
              </li>
            );
          })}
        </ul>
      </CenterDiv>
      {/* {correct && solution.length === staticSolution.length ? ( */}
      {correct ? (
        <CenterDiv>
          <Greeting>ยินดีด้วย! คุณได้รับ 1 เหรียญ</Greeting>
        </CenterDiv>
      ) : null}

      {solution.length === staticSolution.length ? null : correct ? (
        <CenterDiv>
          <ShiftLeft src={Correct_Backward} onClick={backward} />
          <ShiftRight src={Correct_Forward} onClick={forward} />
        </CenterDiv>
      ) : (
        <CenterDiv>
          <ShiftLeft src={Incorrect_Backward} onClick={backward} />
          <ShiftRight src={Incorrect_Forward} onClick={forward} />
        </CenterDiv>
      )}
      <CenterDiv>
        <NextButton answer={correct}>ทำต่อ</NextButton>
      </CenterDiv>
      <div>
        <CorrectFlag src={Correct_Flag} />
        <CorrectReport>รายงาน</CorrectReport>
      </div>
    </Container>
  );
};

export default PracticeAnswer;
