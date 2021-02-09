import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Body, Overline } from "./Typography";
import { Modal } from "./Modal";
import { LottieFile } from "./LottieFile";
import levelUp from "../assets/lottie/levelUp.json";
import silver from "../assets/lottie/rank_silver.json";
import gold from "../assets/lottie/rank_gold.json";
import { ProgressBar } from "./ProgressBar";
import { COLOR } from "../global/const";

export const LevelUpModal = ({
  isShowing,
  toggle,
  rank,
  level,
  exp,
  max_exp,
  coin
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
          <Header> { rank ? "คุณได้เลื่อนระดับ!" : "เลเวลอัพ!"} </Header>
        </motion.div>
        <motion.div 
          variants={item} 
          style = {{marginTop: "4px", marginBottom:"4px" }}
        >
          <LottieFile 
            animationData={!rank ? levelUp : (rank === "SILVER" ? silver : gold)} 
            width="118px"
            height="121px" 
            loop={rank ? true : false}
          />
        </motion.div>
        <motion.div variants={item}>
          <Header> + {coin} coins </Header>
        </motion.div>
        <ProgressBarContainer variants={item}>
          <LevelTitleContainer>
            <LevelTitle marginBottom={6}>
              <Body>เลเวล</Body>
              <div style={{ marginRight: 8 }}/>
              <Body color={COLOR.MANDARIN}>{level}</Body>
            </LevelTitle>
            <LevelTitle marginBottom={2}>
              <Overline color={COLOR.MANDARIN}>{exp}</Overline>
              <Overline color={COLOR.SILVER}>/{max_exp}</Overline>
            </LevelTitle>
          </LevelTitleContainer>
          <ProgressBar percent={(exp/max_exp)*100}/>
        </ProgressBarContainer>
      </Container>
    </Modal>
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
