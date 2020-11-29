import styled from "styled-components";
import { MANDARIN, WHITE } from "../../global/const";

// Color
// import { MANDARIN } from "../../global/const";

export const Button = styled.button`
    width: 160px;
    height: 48px;
    background-color: ${WHITE};
    text-align: center;
    font-family: Prompt;
    font-size: 16px;
    font-weight: 400;
    color: ${MANDARIN};
    border: 1px solid ${MANDARIN};
    border-radius: 10px;

    &:hover {
      background-color: ${MANDARIN};
      color: ${WHITE};
      width: 180px;
      height: 50px;
    }
  `;

