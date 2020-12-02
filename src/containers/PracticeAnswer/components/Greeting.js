import styled from "styled-components";

// Components
import CenterDiv from "../../../components/CenterDiv/CenterDiv";
import { Body } from "../../../components/Typography";

// Global
import { COLOR, LINE_HEIGHT } from "../../../global/const";

export const GreetingDiv = styled(CenterDiv)`
  margin-top: 104px;
  display: flex;
  justify-content: center;
`;

export const Greeting = styled.p`
  font-family: Prompt;
  font-size: 16px;
  color: ${COLOR.CHARCOAL};
  line-height: ${LINE_HEIGHT};
  display: inline-block;
  text-align: center;
`;

// ! If used this then style visibility got overwritten
// export const Greeting = styled(Body)`
//   line-height: ${LINE_HEIGHT};
//   display: inline-block;
//   text-align: center;
// `