import styled from "styled-components";

// Components
import CenterDiv from "../../../components/CenterDiv/CenterDiv";

// Global
import { CHARCOAL, LINE_HEIGHT } from "../../../global/const";

export const GreetingDiv = styled(CenterDiv)`
  margin-top: 104px;
`;

export const Greeting = styled.p`
  font-family: Prompt;
  color: ${CHARCOAL};
  line-height: ${LINE_HEIGHT};
`;
