import React, { useEffect, useState } from "react";

// Components
import CenterDiv from "../../components/CenterDiv/CenterDiv";
import { Container } from "./components/Container";
import Sign from "./components/Sign";
import Title from "./components/Title";
import { SolutionDiv, Solution } from "./components/Solution";
import { GreetingDiv, Greeting } from "./components/Greeting";
import { ShiftDiv, ShiftLeft, ShiftRight } from "./components/Shift";
import NextButton from "./components/NextButton";
import { ReportFlag, ReportText } from "./components/Report";

// Media
import Correct from "../../assets/Correct.png";
import Incorrect from "../../assets/Incorrect.png";
import Correct_Flag from "../../assets/Correct_Flag.png";
import Incorrect_Flag from "../../assets/Incorrect_Flag.png";
import Correct_Backward from "../../assets/Correct_Backward.png";
import Correct_Forward from "../../assets/Correct_Forward.png";
import Incorrect_Backward from "../../assets/Incorrect_Backward.png";
import Incorrect_Forward from "../../assets/Incorrect_Forward.png";

// Helper
import { backward, forward } from "./PracticeAnswerHelper";

const PracticeAnswer = () => {
  const [correct, set_correct] = useState(false);
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
    "= 4 x 3 ",
  ]);

  useEffect(() => {
    // TODO: Get the solution and store each line in staticSolution
    //   axios.get().then((res) => {
    //       setStaticSolution(res)
    //     })
  });

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
          {/* <Greeting style={{marginBottom: "36px"}}></Greeting> */}
          <Greeting style={{ visibility: "hidden" }}>Wrong</Greeting>
        </GreetingDiv>
      )}

      {solution.length === staticSolution.length ? (
        <ShiftDiv>
          <NextButton answer={correct}>ทำต่อ</NextButton>
        </ShiftDiv>
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

export default PracticeAnswer;
