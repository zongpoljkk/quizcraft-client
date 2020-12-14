import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header } from "./Typography";
import { Modal } from "./Modal";
import useModal from "./useModal";
import { LottieFile } from "./LottieFile";
import levelUp from "../assets/lottie/levelUp.json";

import close_icon from "../assets/icon/close.png";

export const LevelUpModal = () => {

  const {isShowing, toggle} = useModal();
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
    <div>
      <div onClick={toggle}>
        <img src={close_icon} height={16} width={16}/>
      </div>
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
            <Header> เลเวลอัพ! </Header>
          </motion.div>
          <motion.div 
            variants={item} 
            style = {{marginTop: "4px", marginBottom:"4px" }}
          >
            <LottieFile animationData={levelUp} width="118px" height="121px" loop={false}/>
          </motion.div>
          <motion.div variants={item}>
            <Header> + 100 coins </Header>
          </motion.div>
          <ProgressBarContainer variants={item}>
            Progress bar
          </ProgressBarContainer>
        </Container>
      </Modal>
    </div>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressBarContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;