import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { COLOR } from "../global/const";

import click from "../assets/sounds/click.mp3";

export const ItemCard = ({
  onClick = () => {},
  disable = false,
  children
}) => {

  const [play] = useSound(click, { volume: 0.25 });

  return (
    disable
    ?
      <DisableCard 
        onClick={() => {
          onClick();
          play();
        }}
      >
        {children}
      </DisableCard>
    :
      <CardContainer
        onClick={() => {
          onClick();
          play();
        }}
      >
        {children}
      </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLOR.SILVER_OPACITY_30};
  height: 32px;
  width: 56px;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
  cursor: pointer;
`;

const DisableCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BLACK};
  opacity: 0.4;
  height: 32px;
  width: 56px;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
`;