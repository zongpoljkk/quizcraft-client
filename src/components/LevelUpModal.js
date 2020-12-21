import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Body, Overline } from "./Typography";
import { Modal } from "./Modal";
import useModal from "./useModal";
import { LottieFile } from "./LottieFile";
import levelUp from "../assets/lottie/levelUp.json";
import { ProgressBar } from "./ProgressBar";
import { COLOR } from "../global/const";


import close_icon from "../assets/icon/close.png";

//MOCK DATA
const LEVEL = 12;
const XP = 876;
const MAX_XP = 2000;
const COIN = 200;
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
            <Header> + {COIN} coins </Header>
          </motion.div>
          <ProgressBarContainer variants={item}>
            <LevelTitleContainer>
              <LevelTitle marginBottom={6}>
                <Body>เลเวล</Body>
                <div style={{ marginRight: 8 }}/>
                <Body color={COLOR.MANDARIN}>{LEVEL}</Body>
              </LevelTitle>
              <LevelTitle marginBottom={2}>
                <Overline color={COLOR.MANDARIN}>{XP}</Overline>
                <Overline color={COLOR.SILVER}>/{MAX_XP}</Overline>
              </LevelTitle>
            </LevelTitleContainer>
            <ProgressBar percent={(XP/MAX_XP)*100}/>
          </ProgressBarContainer>
        </Container>
      </Modal>
    </div>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressBarContainer = styled(motion.div)`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const LevelTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const LevelTitle = styled.div.attrs(props => ({
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${props => props.marginBottom}px;
`;
