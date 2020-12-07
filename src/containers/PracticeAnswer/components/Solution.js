import styled from "styled-components";

// Global
import { COLOR } from "../../../global/const";
import { MEDIUM } from "../../../components/Typography";

export const Solution = styled.p`
  font-family: Prompt;
  font-weight: ${MEDIUM};
  font-size: 20px;
  color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
`;
