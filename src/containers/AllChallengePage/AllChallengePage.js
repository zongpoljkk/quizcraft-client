import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, withRouter } from "react-router-dom";

import { Button } from "../../components/Button";
import { Header } from "../../components/Typography";
import useModal from "../../components/useModal";
import { ChallengeBox } from "./components/ChallengeBox";
import { SpecificChallengeModal } from "./components/SpecificChallengeModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import { 
  getMarginRightOfChallengeBox,
  useGetALlMyChallenges,
  useReadChallenge
} from "./AllChallengePageHelper";

import { CONTAINER_PADDING, LARGE_DEVICE_SIZE } from "../../global/const"
import { useWindowDimensions } from "../../global/utils";

const CHALLENGE_BOX_TYPE = {
  MY_TURN: "MY_TURN",
  CHALLENGER_TURN: "CHALLENGER_TURN",
  RESULT: "RESULT"
};

const AllChallengePage = ({ history }) => {

  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const {isShowing, toggle} = useModal();
  const [username, set_username] = useState();
  const container_width = screen_width-CONTAINER_PADDING;
  const [margin_right, set_margin_right] = useState();
  const user_id = localStorage.getItem("userId");
  
  const { 
    getALlMyChallenges,
    loading,
    my_turns,
    challenger_turns,
    results
  } = useGetALlMyChallenges(
    user_id, 
    location.state.subtopic_name, 
    location.state.difficulty,
  );

  const { readChallenge } = useReadChallenge();

  const onChallengeBoxClick = (challenge_id, result) => {
    readChallenge(user_id, challenge_id);
    history.push({
      pathname: result ? "./challenge-result" : "./challenge-game",
      state: {
        subject_name: location.state.subject_name,
        topic_name: location.state.topic_name,
        subtopic_id: location.state.subtopic_id,
        subtopic_name: location.state.subtopic_name,
        mode: location.state.mode,
        difficulty: location.state.difficulty,
        challenge_id: challenge_id
      }
    });
  };

  useEffect(() => {
    getALlMyChallenges();
  }, []);
  
  return (
    <Container>
      <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
        <Button type="outline">สุ่มคู่แข่ง</Button>
        <Button onClick={toggle}>เจาะจงคู่แข่ง</Button>
        <SpecificChallengeModal 
          username={username}
          set_username={set_username}
          isShowing={isShowing}
          toggle={toggle}
        />
      </ButtonContainer>
      {loading
        ? <LoadingPage/>
        : <React.Fragment>
            <Box>
              <Header>รอบของคุณ</Header>
              <ChallengeBoxContainer maxWidth={container_width}>
                {my_turns?.map((challenge, index) => 
                  <div key={index}>
                    <ChallengeBox
                      image={challenge.photo}
                      username={challenge.username}
                      my_scores={challenge.myScore}
                      challenger_score={challenge.theirScore}
                      is_read={challenge.isRead}
                      type={CHALLENGE_BOX_TYPE.MY_TURN}
                      margin_right={margin_right && margin_right[index]}
                      getMarginRightOfChallengeBox={() => 
                        getMarginRightOfChallengeBox(container_width, set_margin_right, my_turns.length)
                      }
                      onClick={() => onChallengeBoxClick(challenge.challengeId)}
                    />
                  </div>
                )}
              </ChallengeBoxContainer>
            </Box>
            <Box>
              <Header>รอบของคู่แข่ง</Header>
              <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
                {challenger_turns?.map((challenge, index) => 
                  <div key={index}>
                    <ChallengeBox
                      image={challenge.photo}
                      username={challenge.username}
                      my_scores={challenge.myScore}
                      challenger_score={challenge.theirScore}
                      is_read={challenge.isRead}
                      type={CHALLENGE_BOX_TYPE.CHALLENGER_TURN}
                      margin_right={margin_right && margin_right[index]}
                      getMarginRightOfChallengeBox={() => 
                        getMarginRightOfChallengeBox(container_width, set_margin_right, challenger_turns.length)
                      }
                      onClick={() => onChallengeBoxClick(challenge.challengeId)}
                    />
                  </div>
                )}
              </ChallengeBoxContainer>
            </Box>
            <Box>
              <Header>ผลลัพธ์</Header>
              <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
                {results?.map((challenge, index) => 
                  <div key={index}>
                    <ChallengeBox
                      image={challenge.photo}
                      username={challenge.username}
                      my_scores={challenge.myScore}
                      challenger_score={challenge.theirScore}
                      is_read={challenge.isRead}
                      type={CHALLENGE_BOX_TYPE.RESULT}
                      margin_right={margin_right && margin_right[index]}
                      getMarginRightOfChallengeBox={() => 
                        getMarginRightOfChallengeBox(container_width, set_margin_right, results.length)
                      }
                      onClick={() => onChallengeBoxClick(challenge.challengeId, 'result')}
                    />
                  </div>
                )}
              </ChallengeBoxContainer>
            </Box>
          </React.Fragment>
      }
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

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start;
  margin-top: 24px;
`;

const ChallengeBoxContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
  max-width: ${props => props.maxWidth}px;
`;

export default withRouter(AllChallengePage);
