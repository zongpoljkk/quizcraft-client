import React from "react";
import styled from "styled-components";

import { Header } from "../../../components/Typography";

import { COLOR } from "../../../global/const"

export const Item = ({
  icon,
  amount
}) => {

  return (
    <Container>
      <ItemContainer>
        <img src={icon} width={44}/>
      </ItemContainer>
      <div style={{ marginBottom: 4 }}/>
      <Header>{amount}</Header>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLOR.SILVER_OPACITY_30};
  height: 86px;
  width: 86px;
  border-radius: 50%;
`;