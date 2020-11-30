import React, { useState } from "react";
import styled from "styled-components";

import { Subheader } from "./Typography";

import { isFunction } from 'lodash';

import { COLOR } from "../global/const"

export const AnswerInputBox = ({
  correct_answer = '',
  set_answer_input = '',
  ...props
}) => {

  const default_border = COLOR.SILVER;
  const focused_border = COLOR.MANDARIN;

  const [border_style, set_border_style] = useState(default_border);

  const onInputFocus = () => {
    // if (isFunction(onFocus)) {
    //   setBorderStyle(focusedBorder)
    // }
  };

  const InputAnswer = styled.input`
    display: flex;
    justify-content: center;
    border-color: ${border_style};
    border-radius: 10px;
    border-width: 1px;
    font-family: Prompt, sans-serif;
    font-weight: 500;
    font-size: 20px;
    color: ${COLOR.MANDARIN};
  `;

  return ( 
    <InputAnswer onFocus={onInputFocus}/>
  );
};
