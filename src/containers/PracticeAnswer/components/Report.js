import styled from "styled-components";

// Colors
import { COLOR} from "../../../global/const";

export const ReportFlag = styled.img`
  alt: "Report Flag";
  height: 24px;
  margin: 32px 8px 0 32px;
  display: inline-block;
`;

// This cannot use the Header because color got overwritten by Header's color props
export const ReportText = styled.p`
  font-family: Prompt;
  color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
  text-decoration: underline;
  display: inline-block;
`;
