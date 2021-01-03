import React, { useEffect, useState, useRef } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Subheader } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import { UserInfoBox } from "./components/UserInfoBox";
import { ResultModal } from "./components/ResultModal";
import useModal from "../../components/useModal";

import { 
  useGetChallengeInfo
} from "./ChallengeResultPageHelper";

import { COLOR } from "../../global/const";

//MOCK DATA
const PROFILE_IMG = "";
const USERNAME = "pimkunut_tee";
const SCORE = "3";
const RESULT = [1, 1, 0, 1, 0];
const TIME = 1432; //unit s => if other unit change in helper
const OPPONENT_PROFILE_IMG = "";
const OPPONENT_USERNAME = "jinjin";
const OPPONENT_SCORE = "2";
const OPPONENT_RESULT = [1, 0, 1, 0, 0];
const OPPONENT_TIME = 5500;

//MOCK DATA FOR MODAL
const LEVEL = 12;
const XP = 876;
const MAX_XP = 2000;
const GAIN_COIN = 200;
const GAIN_XP = 150;

const ChallengeResultPage = ( { history }) => {
  const ref = useRef(null);
  const location = useLocation();
  const [isShowing, toggle] = useModal();
  const [container_width, set_container_width] = useState();
  const [win, set_win] = useState();
  const [showModal, setShowModal] = useState();
  const user_id = localStorage.getItem("userId");

  const { 
    getChallengeInfo,
    my_info,
    challenger_info
  } = useGetChallengeInfo(
    user_id,
    location.state.challenge_id
  );

  const onExit = () => {
    history.push({
      pathname: "./all-challenges",
      state: {
        subject_name: location.state.subject_name,
        topic_name: location.state.topic_name,
        subtopic_id: location.state.subtopic_id,
        subtopic_name: location.state.subtopic_name,
        mode: location.state.mode,
        difficulty: location.state.difficulty
      }
    });
  };

  const isWin = () => {
    //TODO: INTEGRATE TO CHECK SCORE
    if(SCORE > OPPONENT_SCORE) set_win(true);
    if(SCORE === OPPONENT_SCORE){
      if(TIME < OPPONENT_TIME) set_win(true);
    }
    else set_win(false);
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
    getChallengeInfo();
    setTimeout(() => {
      setShowModal(toggle)
    }, 8750);
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
        <ExitModal onExit={() => onExit()} />
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
          time={TIME}
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
          time={OPPONENT_TIME}
        />
      </DetailContainer>
      <ResultModal
        isShowing={isShowing}
        toggle={toggle}
        win={isWin}
        level={LEVEL}
        xp={XP}
        max_xp={MAX_XP}
        gain_coin={GAIN_COIN}
        gain_xp={GAIN_XP}
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

export default withRouter(ChallengeResultPage);