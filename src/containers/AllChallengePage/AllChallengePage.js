import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../../components/Button";
import { Header } from "../../components/Typography";
import useModal from "../../components/useModal";
import { ChallengeBox } from "./components/ChallengeBox";
import { SpecificChallengeModal } from "./components/SpecificChallengeModal";

import { useWindowDimensions } from "../../global/utils"

const CHALLENGE_BOX_TYPE = {
  MY_TURN: "MY_TURN",
  CHALLENGER_TURN: "CHALLENGER_TURN",
  RESULT: "RESULT"
};
const CONTAINER_PADDING = 64;

// MOCK DATA
const IMAGE = null;
const USERNAME = "สมชาย<3สมปอง";
const MY_SCORE = 0;
const CHALLENGER_SCORE = 4;

const AllChallengePage = () => {

  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const {isShowing, toggle} = useModal();
  const [username, set_username] = useState();

  return (
    <Container>
      <ButtonContainer>
        <Button type="outline">สุ่มคู่แข่ง</Button>
        <Button onClick={toggle}>เจาะจงคู่แข่ง</Button>
        <SpecificChallengeModal 
          username={username}
          set_username={set_username}
          isShowing={isShowing}
          toggle={toggle}
        />
      </ButtonContainer>
      <Box>
        <Header>รอบของคุณ</Header>
        <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
          <ChallengeBox
            image={IMAGE}
            username={USERNAME}
            my_scores={MY_SCORE}
            challenger_score={CHALLENGER_SCORE}
            type={CHALLENGE_BOX_TYPE.MY_TURN}
          />
          <div style={{ marginRight: 12 }}/>
          <ChallengeBox
            image={IMAGE}
            username={USERNAME}
            my_scores={MY_SCORE}
            challenger_score={CHALLENGER_SCORE}
            type={CHALLENGE_BOX_TYPE.MY_TURN}
          />
          <div style={{ marginRight: 12 }}/>
          <ChallengeBox
            image={IMAGE}
            username={USERNAME}
            my_scores={MY_SCORE}
            challenger_score={CHALLENGER_SCORE}
            type={CHALLENGE_BOX_TYPE.MY_TURN}
          />
          <ChallengeBox
            image={IMAGE}
            username={USERNAME}
            my_scores={MY_SCORE}
            challenger_score={CHALLENGER_SCORE}
            type={CHALLENGE_BOX_TYPE.MY_TURN}
          />
        </ChallengeBoxContainer>
      </Box>
      <Box>
        <Header>รอบของคู่แข่ง</Header>
        <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
          <ChallengeBox
            image={IMAGE}
            username={USERNAME}
            my_scores={MY_SCORE}
            challenger_score={CHALLENGER_SCORE}
            type={CHALLENGE_BOX_TYPE.CHALLENGER_TURN}
          />
          <div style={{ marginRight: 12 }}/>
          <ChallengeBox
            image={IMAGE}
            username={USERNAME}
            my_scores={MY_SCORE}
            challenger_score={CHALLENGER_SCORE}
            type={CHALLENGE_BOX_TYPE.MY_TURN}
          />
        </ChallengeBoxContainer>
      </Box>
      <Box>
        <Header>ผลลัพธ์</Header>
        <ChallengeBoxContainer maxWidth={screen_width-CONTAINER_PADDING}>
          <ChallengeBox
            image={IMAGE}
            username={USERNAME}
            my_scores={MY_SCORE}
            challenger_score={CHALLENGER_SCORE}
            type={CHALLENGE_BOX_TYPE.RESULT}
          />
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

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
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

export default AllChallengePage;
