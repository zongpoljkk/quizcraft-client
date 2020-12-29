import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { Header,Subheader, Body } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import correct_icon from "../../assets/icon/success.png";
import incorrect_icon from "../../assets/icon/fail.png";
import { motion } from "framer-motion";

import { COLOR } from "../../global/const"

//MOCK DATA
const PROFILE_IMG = "";
const USERNAME = "pimkunut_tee"
const SCORE = "3";
const RESULT = [1, 1, 0, 1, 0];
const OPPONENT_PROFILE_IMG = "";
const OPPONENT_USERNAME = "jinjin";
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
        staggerChildren: 0.5
      }
    }
  };

  const variants = {
    visible: index => ({
      opacity: 1,
      transition: {
        delay: index * 0.75,
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
        custom={0} 
        variants={variants} 
        style={{display: "flex", alignItems: "center"}}
      >
        <ExitModal />
        <div style={{display: "flex", justifyContent: "center", width: container_width-16}}>
          <Header>สรุปผลคะแนน</Header>
        </div>
      </motion.div>
      <UserInfoContainer>
        <UserInfo>
          <UserImg
            custom={1} 
            variants={variants}  
            backgroundColor={PROFILE_IMG ? null : COLOR.ISLAND_SPICE}
          >
              {PROFILE_IMG ? <img src={PROFILE_IMG}/> : null}
          </UserImg>
          <motion.div
            custom={2} 
            variants={variants} 
          >
            <Body> {USERNAME} </Body>
          </motion.div>
        </UserInfo>
        <motion.div
          custom={1} 
          variants={variants} 
        >
          <Subheader props color={COLOR.MANDARIN}>VS</Subheader>
        </ motion.div>
        <UserInfo>
          <UserImg
            custom={1} 
            variants={variants}   
            backgroundColor={OPPONENT_PROFILE_IMG ? null : COLOR.ISLAND_SPICE}
          >
              {OPPONENT_PROFILE_IMG ? <img src={OPPONENT_PROFILE_IMG}/> : null}
          </UserImg>
          <motion.div
            custom={2} 
            variants={variants} 
          >
            <Body> {OPPONENT_USERNAME} </Body>
          </motion.div>
        </UserInfo>
      </UserInfoContainer>
      <ScoreBoxContainer 
        custom={3} 
        variants={variants}
      >
        <ScoreBox>
          {RESULT.map((result, index)=> (
            <Icon
              key={index}
              custom={index+4} 
              variants={variants}
              src={result ? correct_icon: incorrect_icon}
            />
          ))}
          <motion.div 
            custom={9} 
            variants={variants} 
          >
            <Header props color = {COLOR.MANDARIN}>{SCORE}</Header> 
          </motion.div>
        </ScoreBox>
        <ScoreBox>
          {OPPONENT_RESULT.map((result, index)=> (
            <Icon
              key={index}
              custom={index+4} 
              variants={variants} 
              src={result ? correct_icon: incorrect_icon}
            />
          ))}
          <motion.div 
            custom={9} 
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

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110px;
`;

const UserImg = styled(motion.div).attrs(props => ({
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

const ScoreBox = styled.div`
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