import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Body, Overline } from "../../../components/Typography";
import correct_icon from "../../../assets/icon/success.png";
import incorrect_icon from "../../../assets/icon/fail.png";
import { secondToHour } from "../ChallengeResultPageHelper";

import { COLOR } from "../../../global/const"

//CONSTANT
const NUMBER_OF_PROBLEM = 5;

export const UserInfoBox = ({
  profile_image,
  username,
  challenge_result,
  total_score,
  time
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

  const variants = {
    visible: index => ({
      opacity: 1,
      transition: {
        delay: index * 0.75,
      },
    }),
    hidden: { opacity: 0 },
  }

  return (
       <UserInfoContainer
        initial="hidden"
        animate="visible"
        variants={list} 
      >
        <UserInfo>
          <UserImg
            custom={1} 
            variants={variants}  
            backgroundColor={profile_image ? null : COLOR.ISLAND_SPICE}
          >
              {profile_image ? <img src={profile_image}/> : null}
          </UserImg>
          <motion.div
            custom={2} 
            variants={variants}
          >
            <Body> {username} </Body>
          </motion.div>
        </UserInfo>
        <ScoreBox
          custom={3} 
          variants={variants} 
        >
          {challenge_result.map((result, index)=> (
            <Icon
              key={index}
              custom={index+4} 
              variants={variants}
              src={result ? correct_icon: incorrect_icon}
            />
          ))}
          <motion.div 
            custom={NUMBER_OF_PROBLEM+4} 
            variants={variants} 
          >
            <Header props color = {COLOR.MANDARIN}>{total_score}</Header> 
          </motion.div>
        </ScoreBox>
        <motion.div
            custom={NUMBER_OF_PROBLEM+5} 
            variants={variants}
            style={{marginTop: "8px"}}
          >
            <Overline props color={COLOR.MANDARIN}> เวลาที่ใช้: {secondToHour(time)} </Overline>
          </motion.div>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
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