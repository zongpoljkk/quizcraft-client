import React from "react";
import styled from "styled-components";

// Color
import { MANDARIN } from "../../global/const";

const Button = () => {
  const Button = styled.button`
    background-color: ${(props) => props.background_color};
    text-align: center;
    font-family: Prompt;
    font-size: 3vw;
    color: ${(props) => props.text_color};
    /* border: 1px solid ${MANDARIN}; */
    border-radius: 10px;
    width: 35vw;
    height: 5vh;
    padding: 10px;
    margin-left: 10vw;
    margin-right: 10vw;

    &:hover {
      background-color: ${(props) => props.hover_background_color};
      color: ${(props) => props.text_color};
    }
  `;

  return <Button />;
};

export default Button;
