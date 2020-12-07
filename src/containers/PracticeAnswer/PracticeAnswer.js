import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Components
// import CenterDiv from "../../components/CenterDiv/CenterDiv";
import { Container } from "./components/Container";
import Sign from "./components/Sign";
import { SolutionDiv, Solution } from "./components/Solution";

// Media
import Correct_Flag from "../../assets/Correct_Flag.png";
import Incorrect_Flag from "../../assets/Incorrect_Flag.png";
import Correct_Backward from "../../assets/Correct_Backward.png";
import Correct_Forward from "../../assets/Correct_Forward.png";
import Incorrect_Backward from "../../assets/Incorrect_Backward.png";
import Incorrect_Forward from "../../assets/Incorrect_Forward.png";
import Coin from "../../components/Coin/Coin.jsx";

// Helper
import { backward, forward } from "./PracticeAnswerHelper";

// Global
import { Body, SEMI_BOLD } from "../../components/Typography";
import { COLOR } from "../../global/const";
import { BUTTON_RADIUS } from "../../components/Button/Button";

const PracticeAnswer = () => {
  const [correct, set_correct] = useState(true);
  // title is an enum ("ถูกต้อง", "วิธีทำที่ถูกต้อง")
  const [title, set_title] = useState("ถูกต้อง");
  // Static solution got populated after useEffect and never change
  // So you can always refer to this state
  const [staticSolution, set_static_solution] = useState([
    "2 x 6 = 2 x 2 x 3",
    "= 4 x 3 ",
    "= 12",
  ]);
  // solution is an array of string. Each string represents one line of solution
  // At first, the array will have just one string but after forward click, we'll
  // add one more line to the array and remove one line after backward click
  const [solution, set_solution] = useState([
    "2 x 6 = 2 x 2 x 3",
    // "= 4 x 3 ",
    // "= 12",
  ]);
  const [firstClick, setFirstClick] = useState(false);

  const greetingHolder = () => {
    if (firstClick && correct) {
      return (
        <div
          style={{
            marginTop: "104px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Body style={{ lineHeight: "1.2em" }}>
            ยินดีด้วย! คุณได้รับ 1 เหรียญ
          </Body>
          <Coin />
        </div>
      );
    } else {
      if (!correct) {
        return (
          <div
            style={{
              marginTop: "104px",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Body style={{ lineHeight: "1.2em", visibility: "hidden" }}></Body>
          </div>
        );
      }
    }
  };

  const arrowHolder = () => {
    if (firstClick) {
      if (solution.length === staticSolution.length) {
        return (
          <ShiftDiv>
            <NextButton answer={correct}>ทำต่อ</NextButton>
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
    <Container answer={correct} onClick={handleFirstClick}>
      <div>
        <CenterDiv>
          {/* {correct ? <Sign src={Correct} /> : <Sign src={Incorrect} />} */}
          <Sign answer={correct} />
        </CenterDiv>
        <CenterDiv>
          <Title answer={correct}>{title}</Title>
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
      </div>

      {correct ? (
        <div>
          <ReportFlag src={Correct_Flag} />
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

const NextButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: ${(props) =>
    props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`};
  font-family: Prompt;
  font-weight: 400;
  font-size: 16px;
  color: ${COLOR.WHITE};
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

// This cannot use the Header because color got overwritten by Header's color props
const ReportText = styled.p`
  font-family: Prompt;
  color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
  text-decoration: underline;
  display: inline-block;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ShiftDiv = styled(CenterDiv)`
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

const Title = styled.p`
  font-family: Prompt;
  font-size: 24px;
  font-weight: ${SEMI_BOLD};
  color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
`;

export default PracticeAnswer;
