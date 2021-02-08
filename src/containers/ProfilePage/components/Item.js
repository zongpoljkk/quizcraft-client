import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { Header } from "../../../components/Typography";

import click from "../../../assets/sounds/click.mp3";

import { COLOR } from "../../../global/const";

export const Item = ({
  icon,
  amount,
  onClick = () => {},
  special_item,
}) => {

  const [play] = useSound(click, { volume: 0.25 });

  return (
    <Container>
      <ItemContainer
        special_item={special_item}
        onClick={() => {
          onClick();
          play();
        }}
      >
        {special_item ? (
          <img src={icon} width={60} />
        ) : (
          <img src={icon} width={40} />
        )}
      </ItemContainer>
      <div style={{ marginBottom: 4 }} />
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

const ItemContainer = styled.div.attrs((props) => ({
  special_item: props.special_item,
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 86px;
  width: 86px;
  border-radius: 50%;
  ${(props) =>
    props.special_item
      ? `
      background: ${COLOR.ISLAND_SPICE};
    `
      : `
      background: ${COLOR.SILVER_OPACITY_30};
    `}
`;