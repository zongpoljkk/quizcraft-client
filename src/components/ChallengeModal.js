import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Body } from "./Typography";
import { Modal } from "./Modal";
import { Button } from "./Button";
import useModal from "./useModal";
import { LottieFile } from "./LottieFile";
import challenge from "../assets/lottie/challenge.json";
import { COLOR } from "../global/const";

import close_icon from "../assets/icon/close.png";

//MOCK DATA
const USERNAME = "pimkunut_tee";
const OPPONENT_USERNAME = "nnnnnnuttt98";
const PROFILE_IMG = "";
const OPPONENT_PROFILE_IMG = "";

export const ChallengeModal = () => {

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
        staggerChildren: 0.85
      }
    }
  };

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div>
      <IconContainer onClick={toggle}>
        <img src={close_icon} height={16} width={16}/>
      </IconContainer>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      >
        <Container
          initial="hidden"
          animate="visible"
          variants={list}
        >
          <ImgWithCaption>
            <motion.div 
              variants={item} 
              style= {{alignSelf: "center"}}
            >
              <UserImg backgroundColor={PROFILE_IMG ? null : COLOR.ISLAND_SPICE}>
                {PROFILE_IMG ? <img src={PROFILE_IMG}/> : null}
              </UserImg>
            </motion.div>
            <motion.div variants={item}>
              <Body>
                <CropText>{USERNAME}</CropText>
              </Body>
            </motion.div>
          </ImgWithCaption>
          <motion.div 
            variants={item} 
            style = {{marginTop: "8px", marginBottom:"8px" }}
          >
            <LottieFile 
              animationData={challenge} 
              width="150px" 
              height="75px" 
              loop={false}
            />
          </motion.div> 
          <ImgWithCaption alignSelf={"flex-end"}>
            <motion.div 
              variants={item} 
              style= {{alignSelf: "center"}}
            >
              <UserImg backgroundColor={OPPONENT_PROFILE_IMG ? null : COLOR.ISLAND_SPICE}>
                {OPPONENT_PROFILE_IMG ? <img src={OPPONENT_PROFILE_IMG}/> : null}
              </UserImg>
            </motion.div>
            <motion.div variants={item}>
              <Body>
                <CropText>{OPPONENT_USERNAME}</CropText>
              </Body>
            </motion.div>
          </ImgWithCaption>
          <motion.div 
            variants={item}
            style = {{display: "flex", justifyContent: "center" ,marginTop: "24px"}}
          >
            <Button> ยืนยัน </Button>
          </motion.div>
        </Container>
      </Modal>
    </div>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ImgWithCaption = styled.div.attrs(props => ({
  alignSelf: props.alignSelf
}))`
  display: flex;
  flex-direction: column;
  width: 105px;
  align-self: ${props => props.alignSelf};
`;

const UserImg = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor,
}))`
  alt: "User profile Image";
  background-color: ${props => props.backgroundColor};
  margin-bottom: 4px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

const CropText = styled.div`
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
  width: 105px; 
`;

const IconContainer = styled.div`
  display: flex;
  height: 100%;
`;