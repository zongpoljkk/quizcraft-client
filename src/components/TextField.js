import styled from "styled-components";

import { COLOR } from "../global/const";

export const TextField = styled.input.attrs(props => ({
  type: "text",
}))`
  border: 1px solid ${COLOR.SILVER};
  border-radius: 10px;
  outline: none;
  height: 46px;
  padding: 0px 16px 0px 16px;
  font-family: Prompt, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${COLOR.MANDARIN};
  &:focus {
    border-color: ${COLOR.MANDARIN};
  }
`;