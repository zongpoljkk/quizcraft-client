import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, withRouter } from "react-router-dom";

import { Header, Subheader } from "../../components/Typography";
import useModal from "../../components/useModal";
import { LottieFile } from "../../components/LottieFile";
import { LevelUpModal } from "../../components/LevelUpModal";
import LoadingPage from "../LoadingPage/LoadingPage";
import { ChallengeBox } from "./components/ChallengeBox";

import no_data from "../../assets/lottie/no_data.json";

import {
  useGetALlMyChallenges,
  useReadChallenge
} from "./AllChallengesPageHelper";

import { CHALLENGE_BOX_TYPE, CONTAINER_PADDING, MODE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const LAST_PATH = {
  ALL_CHALLENGES: "ALL_CHALLENGES",
  SUBTOPIC: "SUBTOPIC"
};

const AllChallengesPage = ({ history, user_info }) => {
  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const container_width = screen_width-CONTAINER_PADDING;

  const [isShowingLevelUpModal, toggleLevelUpModal] = useModal();

  const user_id = localStorage.getItem("userId");

  const {
    getALlMyChallenges,
    loading,
    my_turns,
    challenger_turns,
    results,
  } = useGetALlMyChallenges(user_id);

  const { readChallenge } = useReadChallenge();

  const onChallengeBoxClick = (
    challenge_id,
    subject_name,
    topic_name,
    subtopic_name,
    difficulty,
    result
  ) => {
    readChallenge(user_id, challenge_id);
    history.push({
      pathname: "/" + subject_name + "/" + topic_name + "/" + subtopic_name + "/" + difficulty + 
        (result ? "/challenge-result" : "/challenge-game"),
      state: {
        subject_name: subject_name,
        topic_name: topic_name,
        subtopic_name: subtopic_name,
        mode: MODE.CHALLENGE.type,
        difficulty: difficulty,
        challenge_id: challenge_id,
        last_path: LAST_PATH.ALL_CHALLENGES
      },
    });
  };

  const readTheirTurnChallenge = (isRead, challenge_id) => {
    if(!isRead) {
      readChallenge(user_id, challenge_id);
    };
  };

  useEffect(() => {
    getALlMyChallenges();
    if(location.state?.is_level_up || location.state?.is_rank_up) {
      toggleLevelUpModal();
    };
  }, []);

  return (
    <Container>
      {loading
        ? <LoadingPage/>
        : <React.Fragment>
            <Header>การท้าทายทั้งหมด</Header>
            <Box marginBottom={my_turns.length !== 0 ? 8 : 16}>
              <Subheader>รอบของคุณ</Subheader>
              {my_turns.length !== 0 ? 
                <ChallengeBoxContainer maxWidth={container_width}>
                  {my_turns?.map((challenge, index) => 
                    <div key={index}>
                      <ChallengeBox
                        image={challenge.photo}
                        username={challenge.username}
                        my_scores={challenge.myScore}
                        challenger_score={challenge.theirScore}
                        subtopic={challenge.subtopicName}
                        difficulty={challenge.difficulty}
                        is_read={challenge.isRead}
                        type={CHALLENGE_BOX_TYPE.MY_TURN}
                        onSubmitClick={() => 
                          onChallengeBoxClick(
                            challenge.challengeId,
                            challenge.subjectName,
                            challenge.topicName,
                            challenge.subtopicName,
                            challenge.difficulty
                          )
                        }
                      />
                    </div>
                  )}
                </ChallengeBoxContainer>
                : 
                <NoDataContainer>
                  <LottieFile animationData={no_data} loop={false} height="240px"/>
                </NoDataContainer>
              }
            </Box>
            <Box marginBottom={challenger_turns.length !== 0 ? 8 : 16}>
              <Subheader>รอบของคู่แข่ง</Subheader>
              {challenger_turns.length !== 0 ? 
                <ChallengeBoxContainer maxWidth={container_width}>
                  {challenger_turns?.map((challenge, index) => 
                    <div key={index} onChange={readTheirTurnChallenge(challenge.isRead, challenge.challengeId)}>
                      <ChallengeBox
                        image={challenge.photo}
                        username={challenge.username}
                        my_scores={challenge.myScore}
                        challenger_score={challenge.theirScore}
                        subtopic={challenge.subtopicName}
                        difficulty={challenge.difficulty}
                        is_read={challenge.isRead}
                        type={CHALLENGE_BOX_TYPE.CHALLENGER_TURN}
                      />
                    </div>
                  )}
                </ChallengeBoxContainer>
                : 
                <NoDataContainer>
                  <LottieFile animationData={no_data} loop={false} height="240px"/>
                </NoDataContainer>
              }
            </Box>
            <Box marginBottom={16}>
              <Subheader>ผลลัพธ์</Subheader>
              {results.length !== 0 ? 
                <ChallengeBoxContainer maxWidth={container_width}>
                  {results?.map((challenge, index) => 
                    <div key={index}>
                      <ChallengeBox
                        image={challenge.photo}
                        username={challenge.username}
                        my_scores={challenge.myScore}
                        challenger_score={challenge.theirScore}
                        subtopic={challenge.subtopicName}
                        difficulty={challenge.difficulty}
                        is_read={challenge.isRead}
                        type={CHALLENGE_BOX_TYPE.RESULT}
                        onSubmitClick={() => 
                          onChallengeBoxClick(
                            challenge.challengeId,
                            challenge.subjectName,
                            challenge.topicName,
                            challenge.subtopicName,
                            challenge.difficulty,
                            'result'
                          )
                        }
                      />
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
        rank={location.state?.is_rank_up ? user_info?.rank : null}
        level={user_info?.level}
        exp={user_info?.exp}
        max_exp={user_info?.maxExp}
        coin={location.state?.earned_coins}
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

const Box = styled.div.attrs(props => ({
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  margin-top: 8px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const ChallengeBoxContainer = styled.div.attrs(props => ({
  maxWidth: props.maxWidth
}))`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-self: flex-start;
  width: ${props => props.maxWidth}px;
  margin-top: 8px;
`;

const NoDataContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  height: 120px;
`;

export default withRouter(AllChallengesPage);
