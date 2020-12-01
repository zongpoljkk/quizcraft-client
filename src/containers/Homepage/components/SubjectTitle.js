import styled from "styled-components";

// Global
import { COLOR } from "../../../global/const";
import { Header } from "../../../components/Typography";

// export const SubjectTitle = styled.p`
//   font-family: Prompt;
//   font-weight: 600;
//   font-size: 24px;
//   line-height: 1.2em;
//   color: ${COLOR.CHARCOAL};
//   margin: 40px 95px 40px 0px;
// `;

// TODO: Use this instead if possible, currently it does not apply margin.
export const SubjectTitle = styled(Header)`
  line-height: 1.2em;
  margin: 35px 95px 40px 0px;
`;
