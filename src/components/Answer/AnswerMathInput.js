import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "../Typography";
import { COLOR } from "../../global/const"

import { mathAnswerBox } from "./AnswertHelper";

export const AnswerMathInput = ({
  correct_answer = '',
  set_answer
}) => {

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 350px;
    flex-wrap: wrap;
  `;

  const MainInputAnswer = styled.input.attrs(props => ({
    type: "text",
    width: props.width || 36,
  }))`
    border: 1px solid ${COLOR.SILVER};
    border-radius: 10px;
    outline: none;
    height: 36px;
    width: ${props => props.width}px;
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

  const PowerInputAnswer = styled.input.attrs(props => ({
    type: "text",
    width: props.width || 36,
  }))`
    border: 1px solid ${COLOR.SILVER};
    border-radius: 10px;
    outline: none;
    height: 36px;
    width: ${props => props.width}px;
    font-family: Prompt, sans-serif;
    font-weight: 500;
    font-size: 20px;
    color: ${COLOR.MANDARIN};
    text-align: center;
    &:active {
      border-color: ${COLOR.MANDARIN};
    }
  `;

  const outputBoxes = (item) => {
    if(item.type === "(" && item.last_type === "main") {
      return (
        <div style={{ marginTop: 36, marginRight: 4 }}>
          <Header>(</Header>
        </div>
      );
    }
    else if(item.type === "(" && item.last_type === "power") {
      return (
        <div style={{ marginRight: 4 }}>
          <Header>(</Header>
        </div>
      );
    }
    else if(item.type === "power") {
      return (
        <PowerInputAnswer width={item.width}/>
      );
    }
    else if(item.type === ")" && item.last_type === "main") {
      return (
        <div style={{ marginTop: 36, marginLeft: 4 }}>
          <Header>)</Header>
        </div>
      );
    }
    else if(item.type === ")" && item.last_type === "power") {
      return (
        <div style={{ marginLeft: 4 }}>
          <Header>)</Header>
        </div>
      );
    }
    else {
      return (
        <MainInputAnswer width={item.width}/>
      );
    }
  };

  return ( 
    <Container>
      {mathAnswerBox(correct_answer).map((box, i) => (
        <div key={i}>
          {outputBoxes(box)}
        </div>
      ))}
    </Container>
  );
};
