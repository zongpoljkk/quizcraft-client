import styled from "styled-components";

// Components
import { Button } from "../../../components/Button/Button";

// Colors
import { COLOR } from "../../../global/const";

export const CreateGroupButton = styled(Button)`
  background-color: ${COLOR.WHITE};
  color: ${COLOR.MANDARIN};
  border: 1px solid ${COLOR.MANDARIN};
  /* margin-right: 15px; */

  &:hover {
    background-color: ${COLOR.MANDARIN};
    color: ${COLOR.WHITE};
  }
`;
