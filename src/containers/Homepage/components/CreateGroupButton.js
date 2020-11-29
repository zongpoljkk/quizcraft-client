import styled from "styled-components";

// Components
import { Button } from "../../../components/Button/Button";

// Colors
import { WHITE, MANDARIN } from "../../../global/const";

export const CreateGroupButton = styled(Button)`
  background-color: ${WHITE};
  color: ${MANDARIN};
  border: 1px solid ${MANDARIN};
  margin-right: 30px;

  &:hover {
    background-color: ${MANDARIN};
    color: ${WHITE};
    width: 40vw;
    height: 6vh;
  }
`;
