import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Components
import { CenterDiv } from "../../components/CenterDiv/CenterDiv";

// Media
import Correct from "../../assets/Correct.png";
import Incorrect from "../../assets/Incorrect.png";
import Correct_Flag from "../../assets/Correct_Flag.png";
import Incorrect_Flag from "../../assets/Incorrect_Flag.png";
import Correct_Backward from "../../assets/Correct_Backward.png";
import Correct_Forward from "../../assets/Correct_Forward.png";
import Incorrect_Backward from "../../assets/Incorrect_Backward.png";
import Incorrect_Forward from "../../assets/Incorrect_Forward.png";

// Global
import {
  CELERY,
  TRINIDAD,
  WHITE,
  SEMI_BOLD,
  MEDIUM,
  CHARCOAL,
  LINE_HEIGHT,
  BUTTON_RADIUS,
} from "../../global/const";
import { convertHexToRGBA } from "../../global/utils";

const PracticeAnswer = () => {
  const [correct, setCorrect] = useState(false);
  // title is an enum ("ถูกต้อง", "วิธีทำที่ถูกต้อง")
  const [title, setTiitle] = useState("ถูกต้อง");
  // Static solution got populated after useEffect and never change
  // So you can always refer to this state
  const [staticSolution, setStaticSolution] = useState([
    "2 x 6 = 2 x 2 x 3",
    "= 4 x 3 ",
    "= 12",
  ]);
  // solution is an array of string. Each string represents one line of solution
  // At first, the array will have just one string but after forward click, we'll
  // add one more line to the array and remove one line after backward click
  const [solution, setSolution] = useState(["2 x 6 = 2 x 2 x 3", "= 4 x 3 "]);

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

  const Sign = styled.img`
    alt: "Correct Sign";
    height: 72px;
    margin-top: 68px;
  `;

  const Title = styled.p`
    font-family: Prompt;
    font-size: 24px;
    font-weight: ${SEMI_BOLD};
    color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
  `;

  const SolutionDiv = styled(CenterDiv)`
    margin: 64px auto 104px auto;
  `;

  const Solution = styled.p`
    font-family: Prompt;
    font-weight: ${MEDIUM};
    font-size: 20px;
    line-height: ${LINE_HEIGHT};
    color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
  `;

  const GreetingDiv = styled(CenterDiv)`
    margin-top: 104px;
  `;

  const Greeting = styled.p`
    font-family: Prompt;
    color: ${CHARCOAL};
    line-height: ${LINE_HEIGHT};
  `;

  const ShiftDiv = styled(CenterDiv)`
    margin-top: 20px;
  `;

  const ShiftLeft = styled.img`
    alt: "Correct Backward";
    height: 40px;
    margin-right: 32px;
  `;

  const ShiftRight = styled.img`
    alt: "Correct Backward";
    height: 40px;
    margin-left: 32px;
  `;

  const NextButton = styled.button`
    width: 160px;
    height: 48px;
    background-color: ${(props) =>
      props.answer ? `${CELERY}` : `${TRINIDAD}`};
    font-family: Prompt;
    font-weight: 400;
    font-size: 16px;
    color: ${WHITE};
    margin-top: 20px;
    border-radius: ${BUTTON_RADIUS};
    border: 0px;
  `;

  const ReportFlag = styled.img`
    alt: "Report Flag";
    height: 24px;
    margin: 32px 8px 0 32px;
    display: inline-block;
  `;

  const ReportText = styled.p`
    font-family: Prompt;
    color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
    text-decoration: underline;
    display: inline-block;
  `;

  return (
    <Container answer={correct}>
      <CenterDiv>
        {correct ? <Sign src={Correct} /> : <Sign src={Incorrect} />}
      </CenterDiv>
      <CenterDiv>
        <Title answer={correct}>{title}</Title>
      </CenterDiv>
      <SolutionDiv>
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
      </SolutionDiv>
      {/* {correct && solution.length === staticSolution.length ? ( */}
      {correct ? (
        <GreetingDiv>
          <Greeting>ยินดีด้วย! คุณได้รับ 1 เหรียญ</Greeting>
        </GreetingDiv>
      ) : (
        <GreetingDiv>
          <Greeting></Greeting>
        </GreetingDiv>
      )}

      {solution.length === staticSolution.length ? (
        <CenterDiv>
          <NextButton answer={correct}>ทำต่อ</NextButton>
        </CenterDiv>
      ) : correct ? (
        <ShiftDiv>
          <ShiftLeft src={Correct_Backward} onClick={backward} />
          <ShiftRight src={Correct_Forward} onClick={forward} />
        </ShiftDiv>
      ) : (
        <ShiftDiv>
          <ShiftLeft src={Incorrect_Backward} onClick={backward} />
          <ShiftRight src={Incorrect_Forward} onClick={forward} />
        </ShiftDiv>
      )}

      {correct ? (
        <div>
          <ReportFlag src={Correct_Flag} />{" "}
          <ReportText answer={correct}>รายงาน</ReportText>
        </div>
      ) : (
        <div>
          <ReportFlag src={Incorrect_Flag} />{" "}
          <ReportText answer={correct}>รายงาน</ReportText>
        </div>
      )}
    </Container>
  );
};

export default PracticeAnswer;
