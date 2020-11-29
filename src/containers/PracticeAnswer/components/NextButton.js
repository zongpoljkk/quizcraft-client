import styled from "styled-components";

// Global
import {
  CELERY,
  TRINIDAD,
  WHITE,
  BUTTON_RADIUS,
} from "../../../global//const.js";

const NextButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
  font-family: Prompt;
  font-weight: 400;
  font-size: 16px;
  color: ${WHITE};
  margin-top: 20px;
  border-radius: ${BUTTON_RADIUS};
  border: 0px;
`;


export default NextButton;