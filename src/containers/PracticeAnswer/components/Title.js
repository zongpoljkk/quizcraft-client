import styled from "styled-components";

// Global
import { COLOR , SEMI_BOLD} from "../../../global/const";
import { Header } from "../../../components/Typography";

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
