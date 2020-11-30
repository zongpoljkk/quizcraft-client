import styled from "styled-components";

// Global
import {
  COLOR,
  BUTTON_RADIUS,
} from "../../../global//const.js";

const NextButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
  font-family: Prompt;
  font-weight: 400;
  font-size: 16px;
  color: ${COLOR.WHITE};
  margin-top: 20px;
  border-radius: ${BUTTON_RADIUS};
  border: 0px;
`;


export default NextButton;