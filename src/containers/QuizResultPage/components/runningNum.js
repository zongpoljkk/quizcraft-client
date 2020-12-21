import { React } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import { COLOR } from "../../../global/const";

const RunningNum = ({ score }) => {
  return (
    <RunningNumCss>
      <CountUp start={0} end={score} duration={4} delay={1} />
    </RunningNumCss>
  );
};

const RunningNumCss = styled(motion.div)`
  font-size: 92px;
  font-weight: 400;
  font-family: Prompt, sans-serif;
  line-height: 96px;
  color: ${COLOR.MANDARIN};
`;

export default RunningNum;
