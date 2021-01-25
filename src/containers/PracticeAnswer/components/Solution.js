import styled from "styled-components";

// Global
import { COLOR } from "../../../global/const";

export const Solution = styled.p`
  font-family: Prompt;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
`;
