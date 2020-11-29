import styled from "styled-components";

// Colors
import { CELERY, TRINIDAD } from "../../../global/const";

export const ReportFlag = styled.img`
  alt: "Report Flag";
  height: 24px;
  margin: 32px 8px 0 32px;
  display: inline-block;
`;

export const ReportText = styled.p`
  font-family: Prompt;
  color: ${(props) => (props.answer ? `${CELERY}` : `${TRINIDAD}`)};
  text-decoration: underline;
  display: inline-block;
`;
