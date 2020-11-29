import styled from "styled-components";
import { COLOR } from "../../global/const";

// Color
// import { MANDARIN } from "../../global/const";

export const Button = styled.button`
  width: 160px;
  height: 48px;
  background-color: ${COLOR.WHITE};
  text-align: center;
  font-family: Prompt;
  font-size: 16px;
  font-weight: 400;
  color: ${COLOR.MANDARIN};
  border: 1px solid ${COLOR.MANDARIN};
  border-radius: 10px;

  &:hover {
    background-color: ${COLOR.MANDARIN};
    color: ${COLOR.WHITE};
    width: 180px;
    height: 50px;
  }
`;
