import React from "react";
import styled from "styled-components";

import { COLOR } from "../global/const"

export const ItemCard = ({
  children
}) => {

  const ItemCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${COLOR.SILVER_OPACITY_30};
    height: 32px;
    width: 56px;
    border-radius: 4px;
  `;

  return (
    <ItemCard>{children}</ItemCard>
  );
};