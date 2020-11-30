import React from "react";
import styled from "styled-components";

import { COLOR } from "../global/const"

export const ItemCard = () => {

  const ItemCard = styled.div`
    background: ${COLOR.SILVER};
    opacity: 0.3;
    height: 32px;
    width: 56px;
    border-radius: 4px;
  `;

  return (
    <ItemCard />
  );
};