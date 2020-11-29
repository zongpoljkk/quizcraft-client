import styled from "styled-components";

// Global
import { CELERY, TRINIDAD, SEMI_BOLD } from "../../../global/const";

const Title = styled.p`
  font-family: Prompt;
  font-size: 24px;
  font-weight: ${SEMI_BOLD};
  color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
`;

export default Title;
