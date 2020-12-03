import React from "react";
import styled from "styled-components";

import { COLOR } from "../global/const"

export const Header = ({
  children,
  color = COLOR.CHARCOAL
}) => {

  const Header = styled.div`
    display: flex;
    font-family: Prompt, sans-serif;
    font-weight: 600;
    font-size: 24px;
    color: ${color};
  `;

  return (
    <Header>
      {children}
    </Header>
  );
};

export const Subheader = ({
  children,
  color = COLOR.CHARCOAL
}) => {

  const Subheader = styled.div`
    display: flex;
    font-family: Prompt, sans-serif;
    font-weight: 500;
    font-size: 20px;
    color: ${color};
  `;

  return (
    <Subheader>
      {children}
    </Subheader>
  );
};

export const Body = ({
  children,
  color = COLOR.CHARCOAL
}) => {

  const Body = styled.div`
    display: flex;
    font-family: Prompt, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: ${color};
  `;

  return (
    <Body>
      {children}
    </Body>
  );
};

export const Overline = ({
  children,
  color = COLOR.CHARCOAL
}) => {

  const Overline = styled.div`
    display: flex;
    font-family: Prompt, sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: ${color};
  `;

  return (
    <Overline>
      {children}
    </Overline>
  );
};