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
  marginBottom
}) => {

  const asciimath2latex = require("asciimath-to-latex");
  var textWithNBSpaceReplaced = content.replace(/\xA0/g,' ');

  const hasThaiString = (word) => {
    var regExp = /[ก-๛]/gi;
    return regExp.test(word);
  };

  const DisplayText = (content, index) => {
      if (hasThaiString(content)) {
        return (
          <Typography key={index} fontWeight={fontWeight} fontSize={fontSize} color={color}>
            {content}
          </Typography>
        );
      } else {
        return (
          <Typography
            key={index}
            fontWeight={fontWeight}
            fontSize={fontSize}
            color={color}
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
    <Container justifyContent={justifyContent} marginBottom={marginBottom}>
      {textWithNBSpaceReplaced.split("\n").map((line, i) => {
        return (
          <div key={i}>{line.split(" ").map((text, idx) => DisplayText(text, idx))}</div>
        );
      })}
    </Container>
  );
};

const Container = styled.div.attrs((props) => ({
  justifyContent: props.justifyContent,
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) => props.justifyContent};
  overflow: visible;
  outline: none;
  margin-top: 2px;
  margin-bottom: ${(props) => props.marginBottom}px;
`;

const Typography = styled.div.attrs((props) => ({
  fontWeight: props.fontWeight,
  fontSize: props.fontSize,
  color: props.color || COLOR.CHARCOAL,
}))`
  display: inline-block;
  font-family: Prompt, sans-serif;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  outline: none;
  margin-right: 4px;
`;
