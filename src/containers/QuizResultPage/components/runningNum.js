import styled from "styled-components";
import { motion } from "framer-motion";

const RunningNum = ({ isVisible, score }) => {
  return (
    <RunningNumCss
      initial={{ scale: 0 }}
      animate={{
        x: 0,
        backgroundColor: "#000",
        boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
        position: "fixed",
        transitionEnd: {
          display: "none",
        },
      }}
      transition={{ duration: 0.3 }}
    />
  );
};

const RunningNumCss = styled(motion.div)``;

export default RunningNum;
