import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

// Global
import { COLOR, DEVICE_SIZE, TYPOGRAPHY } from "../global/const"
import { useWindowDimensions } from "../global/utils"

import single_click from "../assets/sounds/single_click.mp3";
import double_click from "../assets/sounds/double_click.mp3";

export const Button = ({
  id,
  type,
  size,
  height,
  width,
  backgroundColor,
  border,
  color,
  onClick = () => {},
  style,
  disabled,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  whenHover,
  children
}) => {

  const { height: screen_height, width: screen_width } = useWindowDimensions();

  const [playSingle] = useSound(single_click, { volume: 0.25 });
  const [playDouble] = useSound(double_click, { volume: 0.25 });

  return ( 
    <ButtonStyled
      id={id}
      type={type}
      size={size}
      height={height}
      width={width}
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
      device_size={
        screen_width <= DEVICE_SIZE.S
        ? screen_width <= DEVICE_SIZE.XXS
          ? screen_width <= DEVICE_SIZE.XXXS ? "tiny" : "very_small"
          : "small"
        : "normal"
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whenHover={whenHover}
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
  color: props.color,
  device_size: props.device_size,
  isHover: props.isHover
}))`
  min-width: ${(props) => {
    switch (props.size) {
      case "custom":
        return `${props.width}px`;
      case "small":
        if(props.device_size === "tiny") return "40px";
        else if(props.device_size === "very_small") return "60px";
        else if (props.device_size === "small") return "80px";
        else return "100px";
      default:
        if(props.device_size === "tiny") return "100px";
        else if(props.device_size === "very_small") return "120px";
        else if (props.device_size === "small") return "140px";
        else return "160px";
    }
  }};
  min-height: ${(props) => {
    switch (props.size) {
      case "custom":
        return `${props.height}px`;
      case "small":
        return "36px";
      default:
        return "48px";
    }
  }};
  max-height: ${(props) => {
    switch (props.size) {
      case "custom":
        return `${props.height}px`;
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
  font-size: ${TYPOGRAPHY.BODY.font_size}px;
  font-weight: ${TYPOGRAPHY.BODY.font_weight};
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
  cursor: ${(props) => {
    switch (props.type) {
      case "custom":
        return "pointer";
      case "outline":
        return "pointer";
      case "disabled":
        return "default";
      default:
        return "pointer";
    }
  }};
  &:hover {
    transform: ${(props) => props.type === "disabled" ? null : `${props.whenHover} ? ${props.whenHover} : "scale(1.1)"}`};
  }
`;