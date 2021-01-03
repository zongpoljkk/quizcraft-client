import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, withRouter } from "react-router-dom";

import { Button } from "../../components/Button";
import { Header } from "../../components/Typography";
import useModal from "../../components/useModal";
import { ChallengeBox } from "./components/ChallengeBox";
import { SpecificChallengeModal } from "./components/SpecificChallengeModal";
import { RandomChallengeModal } from "./components/RandomChallengeModal";

import { 
  getMarginRightOfChallengeBox
} from "./AllChallengePageHelper";

import { CONTAINER_PADDING, LARGE_DEVICE_SIZE } from "../../global/const"
import { useWindowDimensions } from "../../global/utils";

const CHALLENGE_BOX_TYPE = {
  MY_TURN: "MY_TURN",
  CHALLENGER_TURN: "CHALLENGER_TURN",
  RESULT: "RESULT"
};

// MOCK DATA
const MOCK_DATA = [
  {
    IMAGE: null,
    USERNAME: "สมชาย<3สมปอง",
    MY_SCORE: 0,
    CHALLENGER_SCORE: 4,
  },
  {
    IMAGE: null,
    USERNAME: "อิอิ",
    MY_SCORE: 0,
    CHALLENGER_SCORE: 4,
  },
  {
    IMAGE: null,
    USERNAME: "mister_heart",
    MY_SCORE: 0,
    CHALLENGER_SCORE: 4,
  },
  {
    IMAGE: null,
    USERNAME: "สมหญิงเองจ้า",
    MY_SCORE: 0,
    CHALLENGER_SCORE: 4,
  },
  {
    IMAGE: null,
    USERNAME: "สมศรีเป็นผู้หญิง",
    MY_SCORE: 0,
    CHALLENGER_SCORE: 4,
  },
  {
    IMAGE: null,
    USERNAME: "เกียงศักดิ์เรียนดี",
    MY_SCORE: 0,
    CHALLENGER_SCORE: 4,
  }
];
const CHALLENGE_ID = "5feb03791ba082482c783089";

const AllChallengePage = ({ history }) => {

  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [isShowingModal1, toggleModal1] = useModal();
  const [isShowingModal2, toggleModal2] = useModal();
  const [username, set_username] = useState();
  const container_width = screen_width-CONTAINER_PADDING;
  const [margin_right, set_margin_right] = useState();

  const onChallengeBoxClick = () => {
    console.log(location)
    history.push({
      pathname: "./challenge-game",
      state: {
        subject_name: location.state.subject_name,
        topic_name: location.state.topic_name,
        subtopic_id: location.state.subtopic_id,
        subtopic_name: location.state.subtopic_name,
        mode: location.state.mode,
        difficulty: location.state.difficulty,
        challenge_id: CHALLENGE_ID
      }
    })
  }

  return (
    <Container>
      <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
        <Button type="outline" onClick={toggleModal1}>สุ่มคู่แข่ง</Button>
        <RandomChallengeModal 
          isShowing={isShowingModal1}
          toggle={toggleModal1}
        />
        <Button onClick={toggleModal2}>เจาะจงคู่แข่ง</Button>
        <SpecificChallengeModal 
          username={username}
          set_username={set_username}
          isShowing={isShowingModal2}
          toggle={toggleModal2}
        />
      </ButtonContainer>
      <Box>
        <Header>รอบของคุณ</Header>
        <ChallengeBoxContainer maxWidth={container_width}>
          {MOCK_DATA?.map((challenge, index) => 
            <div key={index}>
              <ChallengeBox
                image={challenge.IMAGE}
                username={challenge.USERNAME}
                my_scores={challenge.MY_SCORE}
                challenger_score={challenge.CHALLENGER_SCORE}
                type={CHALLENGE_BOX_TYPE.MY_TURN}
                margin_right={margin_right && margin_right[index]}
                getMarginRightOfChallengeBox={() => 
                  getMarginRightOfChallengeBox(container_width, set_margin_right, MOCK_DATA.length)
                }
                onClick={() => onChallengeBoxClick()}
              />
            </div>
          )}
        </ChallengeBoxContainer>
      </Box>
      <Box>
        <Header>รอบของคู่แข่ง</Header>
        <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
          {MOCK_DATA?.map((challenge, index) => 
            <div key={index}>
              <ChallengeBox
                image={challenge.IMAGE}
                username={challenge.USERNAME}
                my_scores={challenge.MY_SCORE}
                challenger_score={challenge.CHALLENGER_SCORE}
                type={CHALLENGE_BOX_TYPE.CHALLENGER_TURN}
                margin_right={margin_right && margin_right[index]}
                getMarginRightOfChallengeBox={() => 
                  getMarginRightOfChallengeBox(container_width, set_margin_right, MOCK_DATA.length)
                }
                onClick={() => onChallengeBoxClick()}
              />
            </div>
          )}
        </ChallengeBoxContainer>
      </Box>
      <Box>
        <Header>ผลลัพธ์</Header>
        <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
          {MOCK_DATA?.map((challenge, index) => 
            <div key={index}>
              <ChallengeBox
                image={challenge.IMAGE}
                username={challenge.USERNAME}
                my_scores={challenge.MY_SCORE}
                challenger_score={challenge.CHALLENGER_SCORE}
                type={CHALLENGE_BOX_TYPE.RESULT}
                margin_right={margin_right && margin_right[index]}
                getMarginRightOfChallengeBox={() => 
                  getMarginRightOfChallengeBox(container_width, set_margin_right, MOCK_DATA.length)
                }
                onClick={() => onChallengeBoxClick()}
              />
            </div>
          )}
        </ChallengeBoxContainer>
      </Box>
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
