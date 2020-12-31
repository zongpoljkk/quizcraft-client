import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Components
// import CenterDiv from "../../components/CenterDiv/CenterDiv";
import {
  Container,
  correct_background_color,
  incorrect_background_color,
} from "./components/Container";
import Sign from "./components/Sign";
import { Solution } from "./components/Solution";
import { Button } from "../../components/Button";
import { LottieFile } from "../../components/LottieFile";
import { Report } from "../../components/Report";

// Media
import Correct_Backward from "../../assets/Correct_Backward.png";
import Correct_Forward from "../../assets/Correct_Forward.png";
import Incorrect_Backward from "../../assets/Incorrect_Backward.png";
import Incorrect_Forward from "../../assets/Incorrect_Forward.png";
import coin_data from "../../assets/lottie/coin.json";

// Helper
import { backward, forward } from "./PracticeAnswerHelper";

// Global
import { Body, Header } from "../../components/Typography";

import { COLOR, CONTAINER_PADDING } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const NAVBAR_HEIGHT = 54;

const TITLE = {
  CORRECT: "ถูกต้อง",
  INCORRECT: "คำตอบที่ถูกต้องคือ",
};

const MOCKDATA = {
  STATIC_SOL: ["2 x 6 = 2 x 2 x 3", "= 4 x 3 ", "= 12"],
  SOL: ["2 x 6 = 2 x 2 x 3", "= 4 x 3 ", "= 12"],
};

const PracticeAnswer = () => {
  const [correct, set_correct] = useState(true);
  // title is an enum ("ถูกต้อง", "วิธีทำที่ถูกต้อง")
  const [title, set_title] = useState(TITLE.CORRECT);
  // Static solution got populated after useEffect and never change
  // So you can always refer to this state
  const [staticSolution, set_static_solution] = useState(MOCKDATA.STATIC_SOL);
  // solution is an array of string. Each string represents one line of solution
  // At first, the array will have just one string but after forward click, we'll
  // add one more line to the array and remove one line after backward click
  const [solution, set_solution] = useState(MOCKDATA.SOL);
  const [firstClick, setFirstClick] = useState(false);

  const { height, width: screen_width } = useWindowDimensions();

  const greetingHolder = () => {
    if (firstClick && correct) {
      return (
        <GreetingDiv>
          <Body style={{ lineHeight: "1.2em" }}>
            ยินดีด้วย! คุณได้รับ 1 เหรียญ
          </Body>
          {/* <Coin /> */}
          <div style={{ display: "inline-block", marginTop: "8px" }}>
            <LottieFile
              animationData={coin_data}
              loop={false}
              height={30}
              width={30}
            />
          </div>
        </GreetingDiv>
      );
    } else {
      if (!correct) {
        return (
          <GreetingDiv>
            <Body style={{ lineHeight: "1.2em", visibility: "hidden" }}></Body>
          </GreetingDiv>
        );
      }
    }
  };

  const arrowHolder = () => {
    if (firstClick) {
      if (solution.length === staticSolution.length) {
        return (
          <ShiftDiv>
            <div style={{ marginTop: "20px" }}>
              <Button
                type="custom"
                border="none"
                color={COLOR.WHITE}
                backgroundColor={
                  correct ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`
                }
              >
                ทำต่อ
              </Button>
            </div>
          </ShiftDiv>
        );
      } else {
        if (correct) {
          return (
            <ShiftDiv>
              <ShiftLeft
                src={Correct_Backward}
                onClick={() => backward(solution)}
              />
              <ShiftRight
                src={Correct_Forward}
                onClick={() => forward(solution, staticSolution)}
              />
            </ShiftDiv>
          );
        } else {
          return (
            <ShiftDiv>
              <ShiftLeft
                src={Incorrect_Backward}
                onClick={() => backward(solution)}
              />
              <ShiftRight
                src={Incorrect_Forward}
                onClick={() => forward(solution, staticSolution)}
              />
            </ShiftDiv>
          );
        }
      }
    } else {
      return <ShiftDiv></ShiftDiv>;
    }
  };

  const handleFirstClick = () => {
    setFirstClick(true);
  };

  useEffect(() => {
    // TODO: Get the solution and store each line in staticSolution
    //   axios.get().then((res) => {
    //       setStaticSolution(res)
    //     })
  });

  return (
    <Container
      answer={correct}
      onClick={handleFirstClick}
      minHeight={height - CONTAINER_PADDING - NAVBAR_HEIGHT}
    >
      <Background answer={correct} />
      {/* <div style={{display: "flex", flexDirection: "column" ,alignContent: "space-between"}}> */}
      <CenterDiv style={{ marginTop: 32, marginBottom: 16, position: "relative" }}>
        {/* {correct ? <Sign src={Correct} /> : <Sign src={Incorrect} />} */}
        <Sign answer={correct} />
      </CenterDiv>
      <CenterDiv>
        {correct ? (
          <Header color={COLOR.CELERY}>{title}</Header>
        ) : (
          <Header color={COLOR.TRINIDAD}>{title}</Header>
        )}
      </CenterDiv>
      {firstClick ? (
        <SolutionDiv>
          <ul style={{ listStyle: "none", padding: 0 }}>
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
      ) : (
        <SolutionDiv></SolutionDiv>
      )}

      {greetingHolder()}

      {arrowHolder()}

      <ReportContainer>
        <Report correct={correct}/>
      </ReportContainer>
    </Container>
  );
};

const Background = styled.div`
  background-color: ${(props) =>
    props.answer ? correct_background_color : incorrect_background_color};
  width: 100%;
  height: 100%;
  top: 54px;
  left: 0px;
  position: fixed;
  overflow-y: scroll;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SolutionDiv = styled(CenterDiv)`
  margin: 64px auto 104px auto;
  height: 160px;
  overflow: scroll;
`;

const GreetingDiv = styled.div`
  margin-top: 104px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ShiftDiv = styled(CenterDiv)`
  margin-bottom: auto;
  min-height: 72px;
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

const ReportContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export default PracticeAnswer;
