import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { Header,Subheader, Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import correct_icon from "../../assets/icon/correct.png";
import incorrect_icon from "../../assets/icon/incorrect.png";
import { motion } from "framer-motion";

import { COLOR } from "../../global/const"

//MOCK DATA
const PROFILE_IMG = "";
const USERNAME = "pimkunut_tee"
const SCORE = "3";
const RESULT = [1, 1, 0, 1, 0];
const OPPONENT_PROFILE_IMG = "";
const OPPONENT_USERNAME = "nnut98";
const OPPONENT_SCORE = "2";
const OPPONENT_RESULT = [1, 0, 1, 0, 0];

const ChallengeResultPage = () => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  
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
        staggerChildren: 0.85
      }
    }
  };

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const variants = {
    visible: index => ({
      opacity: 1,
      transition: {
        delay: (index+3.25) * 0.75,
      },
    }),
    hidden: { opacity: 0 },
  }

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={list} 
      ref={ref}
    >
      <motion.div
        variants={item} 
        style={{display: "flex", alignItems: "center"}}
      >
        <ExitModal />
        <div style={{display: "flex", justifyContent: "center", width: container_width-16}}>
          <Header>สรุปผลคะแนน</Header>
        </div>
      </motion.div>
      <UserInfoContainer variants={item}>
        <UserInfo>
          <UserImg backgroundColor={PROFILE_IMG ? null : COLOR.ISLAND_SPICE}>
              {PROFILE_IMG ? <img src={PROFILE_IMG}/> : null}
          </UserImg>
          <Body> {USERNAME} </Body>
        </UserInfo>
        <Subheader props color={COLOR.MANDARIN}>VS</Subheader>
        <UserInfo>
          <UserImg backgroundColor={OPPONENT_PROFILE_IMG ? null : COLOR.ISLAND_SPICE}>
              {OPPONENT_PROFILE_IMG ? <img src={OPPONENT_PROFILE_IMG}/> : null}
          </UserImg>
          <Body> {OPPONENT_USERNAME} </Body>
        </UserInfo>
      </UserInfoContainer>
      <ScoreBoxContainer variants={item}>
        <ScoreBox>
          {RESULT.map((result, index)=> (
            <Icon
              key={index}
              custom={index} 
              variants={variants}
              src={result ? correct_icon: incorrect_icon}
            />
          ))}
          <motion.div 
            custom={5} 
            variants={variants} 
          >
            <Header props color = {COLOR.MANDARIN}>{SCORE}</Header> 
          </motion.div>
        </ScoreBox>
        <ScoreBox>
          {OPPONENT_RESULT.map((result, index)=> (
            <Icon
              key={index}
              custom={index} 
              variants={variants} 
              src={result ? correct_icon: incorrect_icon}
            />
          ))}
          <motion.div 
            custom={5} 
            variants={variants} 
          >
            <Header props color = {COLOR.MANDARIN}>{OPPONENT_SCORE}</Header>  
          </motion.div>
        </ScoreBox>
      </ScoreBoxContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UserInfoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserImg = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  background-color: ${props => props.backgroundColor};
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-bottom: 8px;
`;

const ScoreBoxContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
`;

const ScoreBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding: 32px 40px 32px 40px;
  background-color: ${COLOR.ISLAND_SPICE};
  border-radius: 10px;
`;

const Icon = styled(motion.img)`
  alt: "icon";
  width: 40px;
  height: 40px;
  margin-bottom: 24px;
`;

export default ChallengeResultPage;