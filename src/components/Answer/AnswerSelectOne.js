import React, { useState } from "react";
import styled from "styled-components";

import { Body } from "../Typography";
import { COLOR } from "../../global/const"

import { formatContent } from "./AnswertHelper";

export const AnswerSelectOne = ({
  content = '',
  set_answer
}) => {

  const [selected_answer, set_selected_answer] = useState(null);

  const outputContent = (item) => {
    if(item.length === 4) {
      return (
        <Container>
          <Body>{item[0].content}</Body>
          <div style={{ width: 8 }}/>
          <div 
            onClick={() => {
              set_selected_answer(item[1].content)
              set_answer(item[1].content)
            }}
            style={{
              backgroundColor: selected_answer === item[1].content ? COLOR.ISLAND_SPICE : null,
              borderRadius: 5
            }}
          >
            <AnswerBucket>
              <Body color={COLOR.MANDARIN}>{item[1].content}</Body>
            </AnswerBucket>
          </div>
          <AnswerBucket>,</AnswerBucket>
          <div 
            onClick={() => {
              set_selected_answer(item[2].content)
              set_answer(item[2].content)
            }}
            style={{
              backgroundColor: selected_answer === item[2].content ? COLOR.ISLAND_SPICE : null,
              borderRadius: 5
            }}
          >
            <AnswerBucket>
              <Body color={COLOR.MANDARIN}>{item[2].content}</Body>
            </AnswerBucket>
          </div>
          <div style={{ width: 8 }}/>
          <Body>{item[3].content}</Body>
        </Container>
      );
    }
    else {
      if(item[0].type === "content") {
        return (
          <Container>
            <Body>{item[0].content}</Body>
            <div style={{ width: 8 }}/>
            <div 
              onClick={() => {
                set_selected_answer(item[1].content)
                set_answer(item[1].content)
              }}
              style={{
                backgroundColor: selected_answer === item[1].content ? COLOR.ISLAND_SPICE : null,
                borderRadius: 5
              }}
            >
              <AnswerBucket>
                <Body color={COLOR.MANDARIN}>{item[1].content}</Body>
              </AnswerBucket>
            </div>
            <AnswerBucket>,</AnswerBucket>
            <div 
              onClick={() => {
                set_selected_answer(item[2].content)
                set_answer(item[2].content)
              }}
              style={{
                backgroundColor: selected_answer === item[2].content ? COLOR.ISLAND_SPICE : null,
                borderRadius: 5
              }}
            >
              <AnswerBucket>
                <Body color={COLOR.MANDARIN}>{item[2].content}</Body>
              </AnswerBucket>
            </div>
          </Container>
        );
      }
      else {
        return (
          <Container>
            <div 
              onClick={() => {
                set_selected_answer(item[0].content)
                set_answer(item[0].content)
              }}
              style={{
                backgroundColor: selected_answer === item[0].content ? COLOR.ISLAND_SPICE : null,
                borderRadius: 5
              }}
            >
              <AnswerBucket>
                <Body color={COLOR.MANDARIN}>{item[0].content}</Body>
              </AnswerBucket>
            </div>
            <AnswerBucket>,</AnswerBucket>
            <div 
              onClick={() => {
                set_selected_answer(item[1].content)
                set_answer(item[1].content)
              }}
              style={{
                backgroundColor: selected_answer === item[1].content ? COLOR.ISLAND_SPICE : null,
                borderRadius: 5
              }}
            >
              <AnswerBucket>
                <Body color={COLOR.MANDARIN}>{item[1].content}</Body>
              </AnswerBucket>
            </div>
            <div style={{ width: 8 }}/>
            <Body>{item[2].content}</Body>
          </Container>
        );
      }
    }
  };

  return ( 
    <Container>
      {outputContent(formatContent(content))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const AnswerBucket = styled.div.attrs(props => ({
  margin_left: props.margin_left || 8,
  margin_right: props.margin_right || 8,
}))`
  font-family: Prompt, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${COLOR.MANDARIN};
  margin-left: ${props => props.margin_left}px;
  margin-right: ${props => props.margin_right}px;
`;