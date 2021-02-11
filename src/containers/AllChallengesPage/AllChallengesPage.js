import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, withRouter } from "react-router-dom";

import { Header, Subheader } from "../../components/Typography";
import useModal from "../../components/useModal";
import { LottieFile } from "../../components/LottieFile";
import { LevelUpModal } from "../../components/LevelUpModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import no_data from "../../assets/lottie/no_data.json";

import {
  useGetALlMyChallenges,
  useReadChallenge
} from "./AllChallengesPageHelper";

import { CONTAINER_PADDING, DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const CHALLENGE_BOX_TYPE = {
  MY_TURN: "MY_TURN",
  CHALLENGER_TURN: "CHALLENGER_TURN",
  RESULT: "RESULT",
};

const AllChallengesPage = ({ history, user_info }) => {
  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const container_width = screen_width-CONTAINER_PADDING;

  const [isShowingLevelUpModal, toggleLevelUpModal] = useModal();

  const [my_turns_margin_right, set_my_turns_margin_right] = useState();
  const [challenger_turns_margin_right, set_challenger_turns_margin_right] = useState();
  const [results_margin_right, set_results_margin_right] = useState();
  const user_id = localStorage.getItem("userId");

  const {
    getALlMyChallenges,
    loading,
    my_turns,
    challenger_turns,
    results,
  } = useGetALlMyChallenges(
    user_id
  );

  const { readChallenge } = useReadChallenge();

  const onChallengeBoxClick = (challenge_id, result) => {
    readChallenge(user_id, challenge_id);
    history.push({
      pathname: result ? "./challenge-result" : "./challenge-game",
      // state: {
      //   subject_name: location.state.subject_name,
      //   topic_name: location.state.topic_name,
      //   subtopic_name: location.state.subtopic_name,
      //   mode: location.state.mode,
      //   difficulty: location.state.difficulty,
      //   challenge_id: challenge_id,
      // },
    });
  };

  const readTheirTurnChallenge = (isRead, challenge_id) => {
    if(!isRead) {
      readChallenge(user_id, challenge_id);
    };
  };

  useEffect(() => {
    getALlMyChallenges();
    // if(location.state.is_level_up || location.state.is_rank_up) {
    //   toggleLevelUpModal();
    // };
  }, []);

  return (
    <Container>
      {loading
        ? <LoadingPage/>
        : <React.Fragment>
            <Header>การท้าทายทั้งหมด</Header>
            <Box>
              <Subheader>รอบของคุณ</Subheader>
              {my_turns.length !== 0 ? 
                <ChallengeBoxContainer maxWidth={container_width}>
                  {my_turns?.map((challenge, index) => 
                    <div key={index}>
                      {/* <ChallengeBox
                        image={challenge.photo}
                        username={challenge.username}
                        my_scores={challenge.myScore}
                        challenger_score={challenge.theirScore}
                        is_read={challenge.isRead}
                        type={CHALLENGE_BOX_TYPE.MY_TURN}
                        margin_right={my_turns_margin_right && my_turns_margin_right[index]}
                        getMarginRightOfChallengeBox={() =>
                          getMarginRightOfChallengeBox(
                            container_width,
                            set_my_turns_margin_right,
                            my_turns.length
                          )
                        }
                        onClick={() => onChallengeBoxClick(challenge.challengeId)}
                      /> */}
                    </div>
                  )}
                </ChallengeBoxContainer>
                : 
                <NoDataContainer>
                  <LottieFile animationData={no_data} loop={false} height="240px"/>
                </NoDataContainer>
              }
            </Box>
            <Box>
              <Subheader>รอบของคู่แข่ง</Subheader>
              {challenger_turns.length !== 0 ? 
                <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
                  {challenger_turns?.map((challenge, index) => 
                    <div key={index} onChange={readTheirTurnChallenge(challenge.isRead, challenge.challengeId)}>
                      {/* <ChallengeBox
                        image={challenge.photo}
                        username={challenge.username}
                        my_scores={challenge.myScore}
                        challenger_score={challenge.theirScore}
                        is_read={challenge.isRead}
                        type={CHALLENGE_BOX_TYPE.CHALLENGER_TURN}
                        margin_right={challenger_turns_margin_right && challenger_turns_margin_right[index]}
                        getMarginRightOfChallengeBox={() =>
                          getMarginRightOfChallengeBox(
                            container_width,
                            set_challenger_turns_margin_right,
                            challenger_turns.length
                          )
                        }
                      /> */}
                    </div>
                  )}
                </ChallengeBoxContainer>
                : 
                <NoDataContainer>
                  <LottieFile animationData={no_data} loop={false} height="240px"/>
                </NoDataContainer>
              }
            </Box>
            <Box>
              <Subheader>ผลลัพธ์</Subheader>
              {results.length !== 0 ? 
                <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
                  {results?.map((challenge, index) => 
                    <div key={index}>
                      {/* <ChallengeBox
                        image={challenge.photo}
                        username={challenge.username}
                        my_scores={challenge.myScore}
                        challenger_score={challenge.theirScore}
                        is_read={challenge.isRead}
                        type={CHALLENGE_BOX_TYPE.RESULT}
                        margin_right={results_margin_right && results_margin_right[index]}
                        getMarginRightOfChallengeBox={() =>
                          getMarginRightOfChallengeBox(
                            container_width,
                            set_results_margin_right,
                            results.length
                          )
                        }
                        onClick={() => onChallengeBoxClick(challenge.challengeId, 'result')}
                      /> */}
                    </div>
                  )}
                </ChallengeBoxContainer>
              : 
                <NoDataContainer>
                  <LottieFile animationData={no_data} loop={false} height="240px"/>
                </NoDataContainer>
              }
            </Box>
          </React.Fragment>
      }
      <LevelUpModal
        isShowing={isShowingLevelUpModal}
        toggle={toggleLevelUpModal}
        // rank={location.state.is_rank_up ? user_info?.rank : null}
        level={user_info?.level}
        exp={user_info?.exp}
        max_exp={user_info?.maxExp}
        // coin={location.state.earned_coins}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const ChallengeBoxContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
  max-width: ${(props) => props.maxWidth}px;
`;

const NoDataContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  height: 120px;
`;

export default withRouter(AllChallengesPage);
