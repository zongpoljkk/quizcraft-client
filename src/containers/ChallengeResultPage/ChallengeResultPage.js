import React, { useEffect, useState, useRef } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Subheader } from "../../components/Typography";
import { ExitModal } from "../../components/ExitModal";
import { UserInfoBox } from "./components/UserInfoBox";
import { ResultModal } from "./components/ResultModal";
import useModal from "../../components/useModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import {
  useGetFinalChallengeResult,
  useDeleteChallenge
} from "./ChallengeResultPageHelper";

import { COLOR } from "../../global/const";
import { CONTAINER_PADDING } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

//MOCK DATA FOR MODAL
const GAIN_COIN = 200;
const GAIN_XP = 150;

const ChallengeResultPage = ( { history }) => {
  const ref = useRef(null);
  const location = useLocation();
  const [isShowing, toggle] = useModal();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [win, set_win] = useState();
  const user_id = localStorage.getItem("userId");

  const { 
    getFinalChallengeResult,
    loading,
    my_result,
    challenger_result
  } = useGetFinalChallengeResult(
    user_id,
    location.state.challenge_id
  );

  const { 
    deleteChallenge
  } = useDeleteChallenge(
    user_id,
    location.state.challenge_id
  );

  const onExit = () => {
    deleteChallenge(user_id, location.state.challenge_id);
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
    if(my_result.score > challenger_result.score) set_win(true);
    if(my_result.score === challenger_result.score){
      if(my_result.time < challenger_result.time) set_win(true);
    }
    else set_win(false);
  };

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
    getFinalChallengeResult();
    setTimeout(() => {
      toggle()
    }, 8850);
  }, []);

  useEffect(() => {
    if(!loading) {
      isWin();
    }
  }, [loading]);

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
            width: screen_width - CONTAINER_PADDING - 16,
          }}
        >
          <Header>สรุปผลคะแนน</Header>
        </div>
      </motion.div>
      {loading 
      ? <LoadingPage/>
      : <React.Fragment>
          <DetailContainer>
            <UserInfoBox
              profile_image={my_result.photo}
              username={my_result.username}
              challenge_result={my_result.result}
              total_score={my_result.score}
              time={my_result.time}
            />
            <motion.div 
              custom={1} 
              variants={variants} 
              style={{ marginTop: "9px" }}
            >
              <Subheader props color={COLOR.MANDARIN}>VS</Subheader>
            </motion.div>
            <UserInfoBox
              profile_image={challenger_result.photo}
              username={challenger_result.username}
              challenge_result={challenger_result.result}
              total_score={challenger_result.score}
              time={challenger_result.time}
            />
          </DetailContainer>
          <ResultModal
            isShowing={isShowing}
            toggle={toggle}
            win={win}
            gain_coin={my_result.gainCoin}
            gain_xp={my_result.gainExp}
          />
        </React.Fragment>
      }
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