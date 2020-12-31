import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Subheader } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import { UserInfoBox } from "./components/UserInfoBox";
import { ResultModal } from "./components/ResultModal";
import useModal from "../../components/useModal";


import { COLOR } from "../../global/const";

//MOCK DATA
const PROFILE_IMG = "";
const USERNAME = "pimkunut_tee";
const SCORE = "3";
const RESULT = [1, 1, 0, 1, 0];
const OPPONENT_PROFILE_IMG = "";
const OPPONENT_USERNAME = "jinjin";
const OPPONENT_SCORE = "2";
const OPPONENT_RESULT = [1, 0, 1, 0, 0];

const ChallengeResultPage = () => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const {isShowing, toggle} = useModal();
  const [win, set_win] = useState(false);
  const [showModal, setShowModal] = useState()

  const isWin = () => {
    //CHECK SCORE
    if(SCORE > OPPONENT_SCORE){
      set_win(true);
    }
  }

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
        staggerChildren: 0.5,
      },
    },
  };

  const variants = {
    visible: (index) => ({
      opacity: 1,
      transition: {
        delay: index * 0.75,
      },
    }),
    hidden: { opacity: 0 },
  };

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(toggle)
    }, 7750);
  }, []);

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
        style={{ display: "flex", alignItems: "center" }}
      >
        <ExitModal />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: container_width - 16,
          }}
        >
          <Header>สรุปผลคะแนน</Header>
        </div>
      </motion.div>
      <DetailContainer>
        <UserInfoBox
          container_width={container_width}
          profile_image={PROFILE_IMG}
          username={USERNAME}
          challenge_result={RESULT}
          total_score={SCORE}
        />
        <motion.div 
          custom={1} 
          variants={variants} 
          style={{ marginTop: "9px" }}
        >
          <Subheader props color={COLOR.MANDARIN}>VS</Subheader>
        </motion.div>
        <UserInfoBox
          container_width={container_width}
          profile_image={OPPONENT_PROFILE_IMG}
          username={OPPONENT_USERNAME}
          challenge_result={OPPONENT_RESULT}
          total_score={OPPONENT_SCORE}
        />
      </DetailContainer>
      <ResultModal
        isShowing={isShowing}
        toggle={toggle}
        win={isWin}
      />
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-top: 16px;
`;

export default ChallengeResultPage;