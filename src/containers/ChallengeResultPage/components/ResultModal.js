import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Subheader } from "../../../components/Typography";
import { Modal } from "../../../components/Modal";
import { LottieFile } from "../../../components/LottieFile";
import levelUp from "../../../assets/lottie/levelUp.json";

export const ResultModal = ({
  isShowing,
  toggle,
  win,
  gain_coin,
  gain_xp
}) => {

  const list = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <Modal
      isShowing={isShowing}
      hide={toggle}
    >
      <Container
        initial="hidden"
        animate="visible"
        variants={list}
      >
        <motion.div variants={item}>
          <Header>{win ? "คุณชนะ!" : "คุณแพ้!"}</Header>
        </motion.div>
        <motion.div
          variants={item} 
          style = {{marginTop: "4px", marginBottom:"4px" }}
        >
          <LottieFile 
            animationData={levelUp} 
            width="118px" 
            height="121px" 
            loop={false}
          />
        </motion.div>
        <motion.div variants={list}>
          <Subheader>+{gain_coin} coins +{gain_xp} XP</Subheader>
        </motion.div>
      </Container>
    </Modal>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

