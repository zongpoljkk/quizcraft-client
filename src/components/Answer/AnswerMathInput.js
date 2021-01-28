import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header, Subheader } from "../Typography";
import { COLOR } from "../../global/const";

import { mathAnswerBox } from "./AnswertHelper";

let mainCurlyBraces = [];
let powerExists = false;

export const AnswerMathInput = ({ correct_answer = "", set_answer }) => {
  const [mainAns, setMainAns] = useState("");
  const [powerAns, setPowerAns] = useState("");

  const outputBoxes = (item) => {
    if (item.type === "(" && (item.last_type === "numerator" || item.last_type === "denumerator")) {
      if (mainCurlyBraces.length === 0) {
        mainCurlyBraces.push("(");
      }
      return (
        <BoxSpace marginTop={36}>
          <Header>(</Header>
        </BoxSpace>
      );
    } else if (item.type === "(" && item.last_type === "power") {
      return (
        <BoxSpace>
          <Header>(</Header>
        </BoxSpace>
      );
    } else if (item.type === "power") {
      powerExists = true;
      return (
        <PowerInputAnswer
          width={item.width}
          onChange={(e) => setPowerAns(e.target.value)}
        />
      );
    } else if (item.type === ")" && (item.last_type === "numerator" || item.last_type === "denumerator")) {
      return (
        <BoxSpace marginTop={36}>
          <Header>)</Header>
        </BoxSpace>
      );
    } else if (item.type === ")" && item.last_type === "power") {
      return (
        <BoxSpace>
          <Header>)</Header>
        </BoxSpace>
      );
    } else if (item.type === "/") {
      return (
        <BoxSpace marginTop={32}>
          <Divider>/</Divider>
        </BoxSpace>
      );
    } else if (item.type === "display") {
      if (item.text == "*") {
        return (
          <BoxSpace marginTop={item.last_type === "power" ? 6 : 40}>
            <Subheader>x</Subheader>
          </BoxSpace>
        );
      } else {
        return (
          <BoxSpace marginTop={item.last_type === "power" ? 6 : 42}>
            <Subheader>{item.text}</Subheader>
          </BoxSpace>
        );
      }
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
    let curlyMain = mainAns;
    let curlyPower = powerAns;
    let tempAnsString;
    if (mainCurlyBraces.length > 0) {
      // There are curly braces at main Ans
      curlyMain = "(" + mainAns + ")";
    }
    if (powerExists) {
      curlyPower = "[" + powerAns + "]";
    }
    tempAns = [curlyMain, curlyPower];
    if (curlyPower !== "") {
      tempAnsString = tempAns.join("^");
    } else {
      tempAnsString = curlyMain;
    }
    set_answer(tempAnsString);

    // Cleanup
    mainCurlyBraces = [];
    powerExists = false;
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

const Divider = styled.div`
  font-family: Prompt, sans-serif;
  font-weight: 500;
  font-size: 34px;
  color: ${COLOR.CHARCOAL};
`;

const BoxSpace = styled.div.attrs((props) => ({
  marginTop: props.marginTop
}))`
  margin-top: ${(props) => props.marginTop}px;
  margin-left: 4px;
  margin-right: 4px;
`;
