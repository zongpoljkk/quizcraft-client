import React from "react";
import styled from "styled-components";
import Tex2SVG from "react-hook-mathjax";

import { COLOR } from "../global/const";
import { cDot2TimesFormat } from "../global/utils";

export const DisplayText = ({
  content,
  justifyContent,
  fontWeight,
  fontSize,
  color,
}) => {

  const asciimath2latex = require("asciimath-to-latex");
  
  const hasThaiString = (word) => {
    var regExp = /[ก-๛]/gi;
    return regExp.test(word);
  };

  const DisplayAnswerText = (content) => {
      if (hasThaiString(content)) {
        return (
          <Typography fontWeight={fontWeight} fontSize={fontSize} color={color}>
            {content}
          </Typography>
        );
      } else {
        return (
          <Typography
            fontWeight={fontWeight}
            fontSize={fontSize}
            color={color}
            margin={4}
          >
            <Tex2SVG
              display="inline"
              latex={asciimath2latex(cDot2TimesFormat(content))}
            />
          </Typography>
        );
      }
  };

  return (
    <Container justifyContent={justifyContent}>
      {content.split(" ").map((text, i) => (
        <div key={i}>{DisplayAnswerText(text, i)}</div>
      ))}
    </Container>
  );
};

const Container = styled.div.attrs((props) => ({
  justifyContent: props.justifyContent,
}))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) => props.justifyContent};
  overflow: visible;
`;

const Typography = styled.div.attrs((props) => ({
  fontWeight: props.fontWeight,
  fontSize: props.fontSize,
  color: props.color || COLOR.CHARCOAL,
  margin: props.margin,
}))`
  display: flex;
  font-family: Prompt, sans-serif;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  margin-left: ${(props) => props.margin}px;
  margin-right: ${(props) => props.margin}px;
`;
