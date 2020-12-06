import styled from "styled-components";

// Global
import { COLOR } from "../../../global/const";
import { SEMI_BOLD } from "../../../components/Typography";

const Title = styled.p`
  font-family: Prompt;
  font-size: 24px;
  font-weight: ${SEMI_BOLD};
  color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
`;

// ! Can't use Header because color got overwritten by Header color props
// const Title = styled(Header)`
//   color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
// `;

export default Title;
