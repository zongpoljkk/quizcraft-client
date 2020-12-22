import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import styled from "styled-components";

// Components
import {
  Container,
  correct_background_color,
  incorrect_background_color,
} from "./components/Container";
import Sign from "./components/Sign";
import { Solution } from "./components/Solution";
import { Button } from "../../components/Button";
import { LottieFile } from "../../components/LottieFile";

// Media
import Correct_Flag from "../../assets/Correct_Flag.png";
import Incorrect_Flag from "../../assets/Incorrect_Flag.png";
import coin_data from "../../assets/lottie/coin.json";

// Global
import { Body, Header } from "../../components/Typography";
import { COLOR } from "../../global/const";
import { useWindowDimensions } from "../../global/util";

const CONTAINER_PADDING = 64;
const NAVBAR_HEIGHT = 54;

const TITLE = {
  CORRECT: "ถูกต้อง",
  INCORRECT: "คำตอบที่ถูกต้องคือ",
};

const MOCKDATA = {
  STATIC_SOL: ["2 x 6 = 2 x 2 x 3", "= 4 x 3 ", "= 12"],
  SOL: ["2 x 6 = 2 x 2 x 3", "= 4 x 3 ", "= 12"],
};

const PracticeAnswer = ({ history }) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const stringToArrayOfString = (v) => [].concat(v).map((name) => name);

  const handleNextButtonClick = () => {
    history.push({
      pathname:
        "/" +
        location.state.subject +
        "/" +
        location.state.topic +
        "/" +
        location.state.subject +
        "/" +
        location.state.difficulty +
        "/practice-game",
      state: {
        userId: location.state.userId,
        problemId: location.state.problemId,
        subject: location.state.subject,
        topic: location.state.topic,
        subtopic: location.state.subtopic,
        difficulty: location.state.difficulty,
      },
    });
  };

  const handleFirstClick = () => {
    if (solution.length === staticSolution.length) {
    } else {
      if (!firstClick) {
        setFirstClick(true);
      } else {
        // Get first value that is not already in solution
        const nextVal = staticSolution.filter((sol) => {
          return !solution.includes(sol);
        });
        set_solution([...solution, nextVal[0]]);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    set_correct(location.state.correct);
    set_title(location.state.correct ? TITLE.CORRECT : TITLE.INCORRECT);
    set_static_solution(location.state.solution.split("\\n"));
    set_solution(
      stringToArrayOfString(location.state.solution.split("\\n")[0])
    );
    setIsLoading(false);
  }, []);

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
          <ShiftDiv style={{ zIndex: "1" }}>
            <div style={{ marginTop: "20px" }}>
              <Button
                type="custom"
                border="none"
                color={COLOR.WHITE}
                backgroundColor={
                  correct ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`
                }
                onClick={() => handleNextButtonClick()}
              >
                ทำต่อ
              </Button>
            </div>
          </ShiftDiv>
        );
      }
    } else {
      return <ShiftDiv></ShiftDiv>;
    }
  };

  return (
    <Container
      answer={correct}
      onClick={handleFirstClick}
      minHeight={height - CONTAINER_PADDING - NAVBAR_HEIGHT}
    >
      <Background answer={correct} />
      {/* <div style={{display: "flex", flexDirection: "column" ,alignContent: "space-between"}}> */}
      <CenterDiv style={{ marginTop: "68px", position: "relative" }}>
        {/* {correct ? <Sign src={Correct} /> : <Sign src={Incorrect} />} */}
        <Sign answer={correct} />
      </CenterDiv>
      <CenterDiv>
        {correct ? (
          <Header color={COLOR.CELERY}>{title}</Header>
        ) : (
          <Header color={COLOR.TRINIDAD}>{title}Î</Header>
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

      {correct ? (
        <ReportDiv>
          <ReportFlag src={Correct_Flag} />
          <ReportText answer={correct}>รายงาน</ReportText>
        </ReportDiv>
      ) : (
        <ReportDiv>
          <ReportFlag src={Incorrect_Flag} />{" "}
          <ReportText answer={correct}>รายงาน</ReportText>
        </ReportDiv>
      )}
    </Container>
  );
};

const Background = styled.div`
  background-color: ${(props) =>
    props.answer ? correct_background_color : incorrect_background_color};
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  overflow-y: scroll;
  z-index: 0;
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

const ReportDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: auto;
  z-index: 1;
`;

const ReportFlag = styled.img`
  alt: "Report Flag";
  height: 24px;
  margin: 32px 8px 0 40px;
  padding-bottom: 4px;
`;

const ReportText = styled.p`
  font-family: Prompt;
  color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
  text-decoration: underline;
  margin-bottom: 0;
`;

export default withRouter(PracticeAnswer);
