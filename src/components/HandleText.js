import React from "react";
import styled from "styled-components";
import Tex2SVG from "react-hook-mathjax";

import { COLOR } from "../global/const";

export const DisplayText = ({ content, justifyContent, fontWeight, fontSize, color }) => {
  
  const asciimath2latex = require("asciimath-to-latex");

  const cDot2TimesFormat = (math) => {
    return math.replace(/[*]/gi, ' xx ');
  }

  const splitContent = (content) => {
    var list = [];
    var current_type = "non-math-text";
    var last_type = "non-math-text";
    var start_index = 0;
    var end_index = 0;
    var current_index = 0;
    var list_index = 0;
    var skip = false;
    var text = "";
    for (let index = 0; index < content.length; index++) {
      if (content.charAt(index) === "{") {
        if (current_index !== index) {
          text = content.substring(start_index, end_index);
          list[list_index] = [text, current_type, last_type];
          list_index += 1;
        }
        last_type = current_type;
        current_type = "numerator";
        skip = true;
        start_index = index + 1;
        current_index = index + 1;
      } else if (content.charAt(index) === "}") {
        text = content.substring(start_index, index);
        list[list_index] = [text, current_type, last_type];
        list_index += 1;
        current_type = last_type;
        last_type = "numerator";
        skip = false;
        start_index = index + 1;
        end_index = index + 1;
        current_index = index + 1;
      } else {
        if (!skip) {
          if (index == content.length - 1) {
            text = content.substring(start_index, content.length);
            list[list_index] = [text, current_type, last_type];
          } else {
            end_index += 1;
          }
        }
      }
    }
  
    var boxes = [];
    var index = 0;
    list.map((item) => {
      if (item[1] !== 0) {
        boxes[index] = {
          text: item[0],
          type: item[1],
          last_type: item[2],
        };
        index = index + 1;
      }
    });
    return boxes;
  };

  const DisplayText = (item) => {
    if (item.type === "numerator") {
      return (
        <Typography
          fontWeight={fontWeight}
          fontSize={fontSize}
          color={color}
          margin={4}
        >
          <Tex2SVG
            display="inline"
            latex={asciimath2latex(cDot2TimesFormat(item.text))}
          />
        </Typography>
      );
    } else {
      return (
        <Typography 
          fontWeight={fontWeight} 
          fontSize={fontSize} 
          color={color}
        >
          {item.text}
        </Typography>
      );
    }
  };

  return (
    <Container justifyContent={justifyContent}>
      {splitContent(content).map((text, i) => (
        <div key={i}>{DisplayText(text, i)}</div>
      ))}
    </Container>
  );
};

const Container = styled.div.attrs((props) => ({
  justifyContent: props.justifyContent || "center"
}))`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  flex-wrap: wrap;
`;

const Typography = styled.div.attrs((props) => ({
  fontWeight: props.fontWeight,
  fontSize: props.fontSize,
  color: props.color || COLOR.CHARCOAL,
  margin: props.margin
}))`
  display: flex;
  font-family: Prompt, sans-serif;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  margin-left: ${(props) => props.margin}px;
  margin-right: ${(props) => props.margin}px;
  
`;
