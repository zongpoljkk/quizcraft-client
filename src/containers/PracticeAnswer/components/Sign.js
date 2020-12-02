import styled from "styled-components";
import { motion } from "framer-motion";

import Correct from "../../../assets/Correct.png";
import Incorrect from "../../../assets/Incorrect.png";

const Sign = ({ isVisible, answer }) => {
  let source;
  if (answer === true) {
    source = Correct;
  } else {
    source = Incorrect;
  }
  return (
    <SignCss
      src={source}
      initial={{ scale: 0 }}
      // animate={{ rotate: 360, scale: 1 }}
      // transition={{
      //   type: "spring",
      //   stiffness: 260,
      //   damping: 20,
      // }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

const SignCss = styled(motion.img)`
  alt: "Sign";
  height: 72px;
  margin-top: 68px;
`;

const SignCorrect = styled(motion.img)`
  alt: "Correct Sign";
  /* background: white; */
  /* width: 150px; */
  height: 72px;
  margin-top: 68px;
`;

const SignIncorrect = styled(motion.img)`
  alt: "Incorrect Sign";
  height: 72px;
  margin-top: 68px;
`;

export default Sign;
