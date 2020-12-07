import React from "react";
import styled from "styled-components";

import { COLOR } from "../global/const"

export const Header = ({
  className,
  children,
  color = COLOR.CHARCOAL
}) => {

  return (
    <Typography className={className} fontWeight={600} fontSize={24} color={color}>
      {children}
    </Typography>
  );
};

export const Subheader = ({
  className,
  children,
  color = COLOR.CHARCOAL
}) => {

  return (
    <Typography className={className} fontWeight={500} fontSize={20} color={color}>
      {children}
    </Typography>
  );
};

export const Body = ({
  className,
  children,
  color = COLOR.CHARCOAL
}) => {

  return (
    <Typography className={className} fontWeight={400} fontSize={16} color={color}>
      {children}
    </Typography>
  );
};

export const Overline = ({
  className,
  children,
  color = COLOR.CHARCOAL
}) => {

  return (
    <Typography className={className} fontWeight={400} fontSize={12} color={color}>
      {children}
    </Typography>
  );
};

const Typography = styled.div.attrs(props => ({
  fontWeight: props.fontWeight,
  fontSize: props.fontSize,
  color: props.color
}))`
  display: flex;
  font-family: Prompt, sans-serif;
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color};
`;
