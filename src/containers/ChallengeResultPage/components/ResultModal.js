import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Subheader, Body, Overline } from "../../../components/Typography";
import { Modal } from "../../../components/Modal";
import { LottieFile } from "../../../components/LottieFile";
import levelUp from "../../../assets/lottie/levelUp.json";
import { ProgressBar } from "../../../components/ProgressBar";

import { COLOR } from "../../../global/const";

export const ResultModal = ({
  isShowing,
  toggle,
  win,
  level,
  xp,
  max_xp,
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
        <ProgressBarContainer variants={list}>
            <LevelTitleContainer>
              <LevelTitle marginBottom={6}>
                <Body>เลเวล</Body>
                <div style={{ marginRight: 8 }}/>
                <Body color={COLOR.MANDARIN}>{level}</Body>
              </LevelTitle>
              <LevelTitle marginBottom={2}>
                <Overline color={COLOR.MANDARIN}>{xp}</Overline>
                <Overline color={COLOR.SILVER}>/{max_xp}</Overline>
              </LevelTitle>
            </LevelTitleContainer>
            <ProgressBar percent={(xp/max_xp)*100}/>
          </ProgressBarContainer>
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

