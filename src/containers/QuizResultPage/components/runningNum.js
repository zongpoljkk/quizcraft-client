import styled from "styled-components";
import { motion } from "framer-motion";

const RunningNum = ({ isVisible, score }) => {
  return (
    <div>
      {/* <motion.div
        animate={{
          x: 10,
          backgroundColor: "#000",
          boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
          position: "fixed",
          transitionEnd: {
            display: "none",
          },
        }}
      /> */}
      <motion.circle
        cx={500}
        animate={{ cx: [null, 100, 200] }}
        transition={{ duration: 3, times: [0, 0.2, 1] }}
      />
    </div>
  );
};

export default RunningNum;
