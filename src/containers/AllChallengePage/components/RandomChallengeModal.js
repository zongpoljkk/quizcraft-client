import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Body } from "../../../components/Typography";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { LottieFile } from "../../../components/LottieFile";
import challenge from "../../../assets/lottie/challenge.json";

import { COLOR } from "../../../global/const";

export const RandomChallengeModal = ({ 
  isShowing, 
  toggle, 
  my_username, 
  opponent_username, 
  my_profile_img, 
  opponent_profile_img,
  onSubmit = () => {},
}) => {
  
  const list = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.85,
      },
    },
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div>
      <Modal isShowing={isShowing} hide={toggle}>
        <Container initial="hidden" animate="visible" variants={list}>
          <ImgWithCaption>
            <motion.div
              variants={variants}
              style={{ alignSelf: "center" }}
            >
              <UserImg backgroundColor={my_profile_img ? null : COLOR.ISLAND_SPICE}>
                {my_profile_img ? (
                  <img
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                    src={"data:image/png;base64," + my_profile_img.data}
                  />
                ) : null}
              </UserImg>
            </motion.div>
            <motion.div variants={variants}>
              <Body>
                <CropText>{my_username}</CropText>
              </Body>
            </motion.div>
          </ImgWithCaption>
          <motion.div
            variants={variants}
            style={{ marginTop: "8px", marginBottom: "8px" }}
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
              variants={variants}
              style={{ alignSelf: "center" }}
            >
              <UserImg
                backgroundColor={
                  opponent_profile_img ? null : COLOR.ISLAND_SPICE
                }
              >
                {opponent_profile_img ? (
                  <img
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                    src={"data:image/png;base64," + opponent_profile_img.data}
                  />
                ) : null}
              </UserImg>
            </motion.div>
            <motion.div variants={variants}>
              <Body>
                <CropText>{opponent_username}</CropText>
              </Body>
            </motion.div>
          </ImgWithCaption>
          <motion.div
            variants={variants}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            <Button onClick={onSubmit}> ยืนยัน </Button>
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
  text-align: center; 
  width: 105px; 
`;