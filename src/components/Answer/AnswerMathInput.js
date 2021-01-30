import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header, Subheader } from "../Typography";
import { COLOR } from "../../global/const";

import { mathAnswerBox } from "./AnswertHelper";

export const AnswerMathInput = ({ correct_answer = "", set_answer }) => {
  const [mainAns, setMainAns] = useState([]);
  const [powerAns, setPowerAns] = useState([]);
  const [ans_template, set_ans_template] = useState([]);

  const outputBoxes = (item) => {
    if (item.type === "(" && item.last_type === "main") {
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
        <BoxSpace marginTop={31}>
          <Divider>/</Divider>
        </BoxSpace>
      );
    } else if (item.type === "display") {
      if (item.text == "*") {
        return (
          <BoxSpace marginTop={item.last_type === "power" ? 8 : 42}>
            <Multiple>x</Multiple>
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
          // TODO: SetMainAns by appending to array
          onChange={(e) => setMainAns(e.target.value)}
        />
      );
    }
  };

  const outputAnswer = (item, index) => {
    if (item.type === "(") {
      return "(";
    } else if (item.type === ")") {
      return ")";
    } else if (item.type === "main") {
      return "main";
    } else if (item.type === "power") {
      return "power";
    }
    else {
      return "main";
    }
  };

  useEffect(() => {
    const ans_template = mathAnswerBox(correct_answer).map((box, index) => {
      return outputAnswer(box, index);
    });
    console.log(ans_template);
    set_ans_template(ans_template);
  }, []);

  useEffect(() => {
    console.log(ans_template);
    const tempAns = [...ans_template]
    if (tempAns.includes("main")) {
      tempAns[tempAns.indexOf("main")] = mainAns;
    }
    if (tempAns.includes("power")) {
      tempAns[tempAns.indexOf("power")] = `^[${powerAns}]`;
    }
    console.log(tempAns)
    const join_ans = tempAns.join("");
    set_answer(join_ans);
    console.log(`join_ans: ${join_ans}`);
  }, [mainAns, powerAns, set_ans_template]);

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

const Multiple = styled.div`
  font-family: Prompt, sans-serif;
  font-weight: 500;
  font-size: 17px;
  color: ${COLOR.CHARCOAL};
`;

const BoxSpace = styled.div.attrs((props) => ({
  marginTop: props.marginTop
}))`
  margin-top: ${(props) => props.marginTop}px;
  margin-left: 4px;
  margin-right: 4px;
`;
