import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

// Global
import { COLOR } from "../global/const";

import single_click from "../assets/sounds/single_click.mp3";
import double_click from "../assets/sounds/double_click.mp3";

export const Button = ({
  id,
  type,
  size,
  backgroundColor,
  border,
  color,
  onClick = () => {},
  style,
  disabled,
  children
}) => {

  const [playSingle] = useSound(single_click, { volume: 0.25 });
  const [playDouble] = useSound(double_click, { volume: 0.25 });

  return ( 
    <ButtonStyled
      id={id}
      type={type}
      size={size}
      backgroundColor={backgroundColor}
      border={border}
      color={color}
      onClick={() => {
        onClick();
        if(disabled || type === "disabled") {
          playDouble();
        } else {
          playSingle();
        }
      }}
      style={style}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button.attrs((props) => ({
  type: props.type,
  size: props.size,
  backgroundColor: props.backgroundColor,
  border: props.border,
  color: props.color
}))`
  min-width: ${(props) => {
    switch (props.size) {
      case "custom":
        return `${props.width}`;
      case "small":
        return "100px";
      default:
        return "160px";
    }
  }};
  min-height: ${(props) => {
    switch (props.size) {
      case "custom":
        return `${props.height}`;
      case "small":
        return "36px";
      default:
        return "48px";
    }
  }};
  max-height: ${(props) => {
    switch (props.size) {
      case "custom":
        return `${props.height}`;
      case "small":
        return "36px";
      default:
        return "48px";
    }
  }};
  background-color: ${(props) => {
    switch (props.type) {
      case "custom":
        return `${props.backgroundColor}`;
      case "outline":
        return `${COLOR.WHITE}`;
      case "disabled":
        return `${COLOR.SILVER}`;
      default:
        return `${COLOR.MANDARIN}`;
    }
  }};
  text-align: ${(props) => props.textAlign || "center"};
  font-family: Prompt, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => {
    switch (props.type) {
      case "custom":
        return `${props.color}`;
      case "outline":
        return `${COLOR.MANDARIN}`;
      case "disabled":
        return `${COLOR.WHITE}`;
      default:
        return `${COLOR.WHITE}`;
    }
  }};
  border: ${(props) => {
    switch (props.type) {
      case "custom":
        return `${props.border}`;
      case "outline":
        return `1px solid ${COLOR.MANDARIN}`;
      case "disabled":
        return `none`;
      default:
        return `none`;
    }
  }};
  border-radius: 10px;
  outline: none;
  &:hover {
    transform: ${(props) => props.type === "disabled" ? null : "scale(1.1)"};
  }
`;