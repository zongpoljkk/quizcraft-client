import React, { useEffect, useState } from "react";
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
  const [display_lottie, set_display_lottie] = useState(false);
  const item = {
    visible: (index) => ({
      opacity: 1,
      transition: {
        delay: index * 1.25,
      },
    }),
    hidden: { opacity: 0 },
  };

  const animation_success = () => {
      set_display_lottie(true);
  }

  useEffect(() => {
    set_display_lottie(false);
  }, []);

  return (
    <div>
      <Modal isShowing={isShowing} hide={toggle}>
        <Container initial="hidden" animate="visible">
          <ImgWithCaption>
            <motion.div
              variants={item}
              custom={0}
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
            <motion.div
              variants={item}
              custom={1}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => animation_success()}
            >
              <Body>
                <CropText>{my_username}</CropText>
              </Body>
            </motion.div>
          </ImgWithCaption>
          <motion.div
            variants={item}
            custom={0}
            style={{ marginTop: "8px", marginBottom: "8px" }}
            onAnimationComplete={() => animation_success()}
          >
            <LottieFile
              animationData={challenge}
              width="150px"
              height="75px"
              loop={false}
              autoplay={true}
              isPaused={!display_lottie}
              isStopped={!display_lottie}
            />
          </motion.div>
          <ImgWithCaption alignSelf={"flex-end"}>
            <motion.div
              variants={item}
              custom={4}
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
            <motion.div variants={item} custom={5}>
              <Body>
                <CropText>{opponent_username}</CropText>
              </Body>
            </motion.div>
          </ImgWithCaption>
          <motion.div
            variants={item}
            custom={6}
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