import styled from "styled-components";
import { MANDARIN, WHITE } from "../../global/const";

// Color
// import { MANDARIN } from "../../global/const";

export const Button = styled.button`
    background-color: ${WHITE};
    text-align: center;
    font-family: Prompt;
    font-size: 3vw;
    color: ${MANDARIN};
    border: 1px solid ${MANDARIN};
    border-radius: 10px;
    width: 35vw;
    height: 5vh;
    padding: 10px;

    &:hover {
      background-color: ${MANDARIN};
      color: ${WHITE};
    }
  `;

