import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "../Typography";
import { COLOR } from "../../global/const";

import { mathAnswerBox } from "./AnswertHelper";

export const AnswerMathInput = ({ correct_answer = "", set_answer }) => {
  const [mainAns, setMainAns] = useState([]);
  const [powerAns, setPowerAns] = useState([]);
  const [ans_template, set_ans_template] = useState([]);

  const outputBoxes = (item) => {
    if (item.type === "(" && item.last_type === "main") {
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
    const handle_multiple_braces = join_ans.replace("*", "{*}")
    set_answer(handle_multiple_braces);
    console.log(`join_ans: ${handle_multiple_braces}`);
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
