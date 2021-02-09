import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { COLOR } from "../global/const";

import select from "../assets/sounds/select.mp3";

export const TextField = ({
  id,
  type,
  height,
  onClick = () => {},
  value,
  onChange = () => {},
  placeholder,
  style,
  children
}) => {

  const [play] = useSound(select, { volume: 0.25 });

  return ( 
    <TextFieldStyled
      id={id}
      type={type}
      height={height}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onClick={() => {
        onClick();
        play();
      }}
      style={style}
    >
      {children}
    </TextFieldStyled>
  );
};

const TextFieldStyled = styled.input.attrs(props => ({
  type: "text",
  height: props.height || 46,
}))`
  border: 1px solid ${COLOR.SILVER};
  border-radius: 10px;
  outline: none;
  height: ${props => props.height}px;
  padding: 0px 16px 0px 16px;
  font-family: Prompt, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${COLOR.MANDARIN};
  &:focus {
    border-color: ${COLOR.MANDARIN};
  }
`;