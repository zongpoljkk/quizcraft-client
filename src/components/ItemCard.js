import React from "react";
import styled from "styled-components";

import { COLOR } from "../global/const"

export const ItemCard = ({
  onClick = () => {},
  disable = false,
  children
}) => {

  return (
    disable
    ? <DisableCard onClick={onClick}>{children}</DisableCard>
    : <CardContainer onClick={onClick}>{children}</CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLOR.SILVER_OPACITY_30};
  min-height: 32px;
  min-width: 56px;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
`;

const DisableCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BLACK};
  opacity: 0.3;
  min-height: 32px;
  min-width: 56px;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
`;