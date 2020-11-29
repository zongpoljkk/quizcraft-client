import styled from "styled-components";

// Components
import { Button } from "../../../components/Button/Button";

// Colors
import { WHITE, MANDARIN } from "../../../global/const";

export const JoinGroupButton = styled(Button)`
  background-color: ${WHITE};
  color: ${MANDARIN};
  border: 1px solid ${MANDARIN};

  &:hover {
    background-color: ${MANDARIN};
    color: ${WHITE};
    width: 40vw;
    height: 6vh;
  }
`;
