import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "../Typography";
import { COLOR } from "../../global/const";

import { mathAnswerBox } from "./AnswertHelper";

let mainCurlyBraces = [];

export const AnswerMathInput = ({ correct_answer = "", set_answer }) => {
  const [mainAns, setMainAns] = useState("");
  const [powerAns, setPowerAns] = useState("");
  const [userAns, setUserAns] = useState([]);

  const checkMathInput = () => {
    // console.log(correct_answer);
    // // console.log(answer);
    // let base;
    // let exponent;
    // if (document.getElementById("answerBox_2")) {
    //   // There are curly braces in this math expression
    //   // answerBox_0 and answerBox_2 are curly braces
    //   base =
    //     "(" +
    //     document.getElementById("answerBox_1").getElementsByTagName("input")[0]
    //       .value +
    //     ")";
    //   exponent = document
    //     .getElementById("answerBox_3")
    //     .getElementsByTagName("input")[0].value;
    // } else {
    //   base = document
    //     .getElementById("answerBox_0")
    //     .getElementsByTagName("input")[0].value;
    //   exponent = document
    //     .getElementById("answerBox_1")
    //     .getElementsByTagName("input")[0].value;
    // }
    // console.log(base);
    // console.log(exponent);
    // exponent = "[" + exponent + "]";
    // // set_answer(base.toString());
    // let tempAns = [];
    // tempAns = [...tempAns, base];
    // tempAns = [...tempAns, exponent];
    // const mathAns = tempAns.join("^");
    // set_answer(mathAns);
  };

  const outputBoxes = (item) => {
    if (item.type === "(" && item.last_type === "main") {
      if (mainCurlyBraces.length === 0) {
        mainCurlyBraces.push("(");
      }
      return (
        <div style={{ marginTop: 36, marginLeft: 4, marginRight: 4 }}>
          <Header>(</Header>
        </div>
      );
    } else if (item.type === "(" && item.last_type === "power") {
      return (
        <div style={{ marginLeft: 4, marginRight: 4 }}>
          <Header>(</Header>
        </div>
      );
    } else if (item.type === "power") {
      return (
        <PowerInputAnswer
          width={item.width}
          onChange={(e) => setPowerAns(e.target.value)}
        />
      );
    } else if (item.type === ")" && item.last_type === "main") {
      return (
        <div style={{ marginTop: 36, marginLeft: 4, marginRight: 4 }}>
          <Header>)</Header>
        </div>
      );
    } else if (item.type === ")" && item.last_type === "power") {
      return (
        <div style={{ marginLeft: 4, marginRight: 4 }}>
          <Header>)</Header>
        </div>
      );
    } else {
      return (
        <MainInputAnswer
          width={item.width}
          onChange={(e) => setMainAns(e.target.value)}
        />
      );
    }
  };

  useEffect(() => {
    let tempAns;
    if (mainCurlyBraces.length > 0) {
      tempAns = ["(" + mainAns + ")", "[" + powerAns + "]"];
    } else {
      tempAns = [mainAns, "[" + powerAns + "]"];
    }
    const tempAnsString = tempAns.join("^");
    setUserAns(tempAnsString);
    set_answer(tempAnsString);
  }, [mainAns, powerAns]);

  return (
    <Container>
      {mathAnswerBox(correct_answer).map((box, i) => (
        <div key={i} id={`answerBox_${i}`}>
          {outputBoxes(box)}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const MainInputAnswer = styled.input.attrs((props) => ({
  type: "text",
  width: props.width || 36,
}))`
  border: 1px solid ${COLOR.SILVER};
  border-radius: 10px;
  outline: none;
  height: 36px;
  width: ${(props) => props.width}px;
  margin-top: 36px;
  margin-bottom: 12px;
  font-family: Prompt, sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: ${COLOR.MANDARIN};
  text-align: center;
  &:focus {
    border-color: ${COLOR.MANDARIN};
  }
`;

const PowerInputAnswer = styled.input.attrs((props) => ({
  type: "text",
  width: props.width || 36,
}))`
  border: 1px solid ${COLOR.SILVER};
  border-radius: 10px;
  outline: none;
  height: 36px;
  width: ${(props) => props.width}px;
  font-family: Prompt, sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: ${COLOR.MANDARIN};
  text-align: center;
  &:active {
    border-color: ${COLOR.MANDARIN};
  }
`;
