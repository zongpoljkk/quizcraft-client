import React from "react";
import styled from "styled-components";

import { COLOR, TYPOGRAPHY } from "../global/const";

export const Header = ({
  className,
  children,
  color = COLOR.CHARCOAL,
  textDecoration,
  opacity
}) => {

  return (
    <Typography
      className={className}
      fontWeight={TYPOGRAPHY.HEADER.font_weight}
      fontSize={TYPOGRAPHY.HEADER.font_size}
      color={color}
      textDecoration={textDecoration}
      opacity={opacity}
    >
      {children}
    </Typography>
  );
};

export const Subheader = ({
  className,
  children,
  color = COLOR.CHARCOAL,
  textDecoration,
  opacity
}) => {

  return (
    <Typography
      className={className}
      fontWeight={TYPOGRAPHY.SUBHEADER.font_weight}
      fontSize={TYPOGRAPHY.SUBHEADER.font_size}
      color={color}
      textDecoration={textDecoration}
      opacity={opacity}
    >
      {children}
    </Typography>
  );
};

export const Body = ({
  className,
  children,
  color = COLOR.CHARCOAL,
  textDecoration,
  opacity
}) => {

  return (
    <Typography
      className={className}
      fontWeight={TYPOGRAPHY.BODY.font_weight}
      fontSize={TYPOGRAPHY.BODY.font_size}
      color={color}
      textDecoration={textDecoration}
      opacity={opacity}
    >
      {children}
    </Typography>
  );
};

export const Overline = ({
  className,
  children,
  color = COLOR.CHARCOAL,
  textDecoration,
  opacity
}) => {

  return (
    <Typography
      className={className}
      fontWeight={TYPOGRAPHY.OVERLINE.font_weight}
      fontSize={TYPOGRAPHY.OVERLINE.font_size}
      color={color}
      textDecoration={textDecoration}
      opacity={opacity}
    >
      {children}
    </Typography>
  );
};

const Typography = styled.div.attrs(props => ({
  fontWeight: props.fontWeight,
  fontSize: props.fontSize,
  color: props.color,
  textDecoration: props.textDecoration
}))`
  display: flex;
  font-family: Prompt, sans-serif;
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color};
  text-decoration: ${props => props.textDecoration};
  opacity : ${props => props.opacity};
  white-space: pre-wrap;
`;
