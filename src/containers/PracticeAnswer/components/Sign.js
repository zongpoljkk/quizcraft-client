import styled from "styled-components";
import { motion } from "framer-motion";

import Correct from "../../../assets/icon/correct.png";
import Incorrect from "../../../assets/icon/incorrect.png";

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
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

const SignCss = styled(motion.img)`
  alt: "Sign";
  height: 72px;
`;

export default Sign;
