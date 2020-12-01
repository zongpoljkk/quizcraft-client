import styled from "styled-components";
import { motion } from "framer-motion";

const SignCss = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 180, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    />
  );
};

const Sign = styled.img`
  alt: "Correct Sign";
  height: 72px;
  margin-top: 68px;
`;

export default Sign;
