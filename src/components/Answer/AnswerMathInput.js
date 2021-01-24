import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "../Typography";
import { COLOR } from "../../global/const";

import { mathAnswerBox } from "./AnswertHelper";

export const AnswerMathInput = ({
  correct_answer = "",
  set_answer,
  answer,
}) => {
  // const [mainAns, setMainAns] = useState([]);
  const [mainAns, setMainAns] = useState({});
  const [powerAns, setPowerAns] = useState([]);
  const [ans_template, set_ans_template] = useState([]);

  const outputBoxes = (item, index) => {
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
          key={item.type + index}
          // TODO: SetMainAns by appending to array
          // onChange={(e) => setMainAns(e.target.value)}
          onChange={(e) => handleMainAns(e.target.value, index)}
        />
      );
    }
  };

  const handleMainAns = (text, index) => {
    setMainAns((mainAns) => {
      return {
        ...mainAns,
        [index]: text,
      };
    });
  };

  const outputAnswer = (item, index) => {
    if (item.type === "(") {
      return "(";
    } else if (item.type === ")") {
      return ")";
    } else if (item.type === "main") {
      return "main" + index;
    } else if (item.type === "power") {
      return "power";
    } else {
      return "main" + index;
    }
  };

  useEffect(() => {
    const temp_ans_template = mathAnswerBox(correct_answer).map(
      (box, index) => {
        return outputAnswer(box, index);
      }
    );
    console.log(temp_ans_template);
    console.log(`temp_ans_template_length: ${temp_ans_template.length}`);
    // TODO: DO NOT SET IF ALREADY ANSWER
    if (!answer) {
      set_ans_template(temp_ans_template);
    }
  }, []);

  useEffect(() => {
    console.log(ans_template);
    console.log(`mainAns:`);
    console.log(mainAns);
    const tempAns = [...ans_template];
    // if (tempAns.includes("main")) {
    //   tempAns[tempAns.indexOf("main")] = mainAns;
    // }
    console.log(`tempAns before replacement:`);
    console.log(tempAns);
    for (var key in mainAns) {
      if (tempAns.includes("main" + key)) {
        tempAns[tempAns.indexOf("main" + key)] = mainAns[key];
      }
    }
    if (tempAns.includes("power")) {
      tempAns[tempAns.indexOf("power")] = `^[${powerAns}]`;
    }
    console.log(`tempAns after replacement`);
    console.log(tempAns);
    const join_ans = tempAns.join("");
    // If user type in input then we set answer
    if (!join_ans.includes("main")) {
      set_answer(join_ans);
    }
    console.log(`join_ans: ${join_ans}`);
  }, [mainAns, powerAns, ans_template]);

  return (
    <Container>
      {mathAnswerBox(correct_answer).map((box, i) => (
        <div key={i} id={`answerBox_${i}`}>
          {outputBoxes(box, i)}
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
