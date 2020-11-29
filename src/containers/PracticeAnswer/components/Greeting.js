import styled from "styled-components";

// Components
import CenterDiv from "../../../components/CenterDiv/CenterDiv";

// Global
import { CHARCOAL, LINE_HEIGHT } from "../../../global/const";

export const GreetingDiv = styled(CenterDiv)`
  margin-top: 104px;
  display: flex;
  justify-content: center;
`;

export const Greeting = styled.p`
  font-family: Prompt;
  font-size: 16px;
  color: ${CHARCOAL};
  line-height: ${LINE_HEIGHT};
  display: inline-block;
  text-align: center;
`;
