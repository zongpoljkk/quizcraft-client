import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";
import AchievementPanel from "./components/AchievementPanel";
import { Tabs } from "../../components/Leaderboard/Tabs";
import { ItemBox } from "../../components/ItemBox";
import { Header } from "../../components/Typography";
import { Button } from "../../components/Button";
import LoadingPage from "../LoadingPage/LoadingPage";

import {
  useGetSubjects,
  useGetLeaderBoard,
  useGetAchievements,
} from "./HomepageHelper";

import challenge_icon from "../../assets/thumbnail/challenge.png";
import challenge_mandarin_icon from "../../assets/thumbnail/challenge_mandarin.png";

import { COLOR, CONTAINER_PADDING } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const Homepage = ({ history, user_id }) => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const { width: screen_width } = useWindowDimensions();

  const [on_hover, set_on_hover] = useState(false);

  const { getSubjects, subjects_loading, subjects } = useGetSubjects();
  const {
    getLeaderBoard,
    leader_board_loading,
    leader_board,
  } = useGetLeaderBoard(user_id);
  const {
    getAchievements,
    achievements_loading,
    achievements,
  } = useGetAchievements(user_id);

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  useEffect(() => {
    getSubjects();
    getLeaderBoard();
    getAchievements();
  }, []);

  return (
    <React.Fragment>
      {leader_board_loading || subjects_loading ? (
        <LoadingPage />
      ) : (
        <Container ref={ref}>
          <GroupPanel
            onCreateGroupClick={() => {
              history.push("create-group");
            }}
            onJoinGroupClick={() => {
              history.push("join-group");
            }}
          />
          <ScrollView>
            <SubjectCard subjects_data={subjects} />
          </ScrollView>
          <ItemBoxContainer marginTop={24}>
            <ItemBox type="frame" shadow="frame" width={container_width - 32}>
              <div style={{ marginBottom: "12px" }}>
                <Header>กระดานผู้นำ</Header>
              </div>
              <Tabs data={leader_board} />
            </ItemBox>
          </ItemBoxContainer>
          <ItemBoxContainer marginTop={32}>
            <AchievementPanel
              container_width={container_width}
              achievements={achievements}
            ></AchievementPanel>
          </ItemBoxContainer>
          
          <ChallengeButtonContainer
            onMouseEnter={() => set_on_hover(true)}
            onMouseLeave={() => set_on_hover(false)}
          >
            <Button
              type={on_hover ? "default" : "outline"}
              size="custom"
              height={48}
              width={screen_width-CONTAINER_PADDING}
              whenHover={null}
              onClick={() => history.push("/all-challenges")}
            >
              <ChallengeContainer>
                <ChallengeIcon 
                  src={on_hover ? challenge_icon : challenge_mandarin_icon}
                  width={on_hover ? 42 : 32}
                  height={on_hover ? 42 : 32}
                  marginRight={on_hover ? 4 : 8}
                />
                การท้าทายทั้งหมด
              </ChallengeContainer>
            </Button>
          </ChallengeButtonContainer>
        </Container>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  width: 100%;
  max-height: 240px;
  overflow: scroll;
  margin-top: 32px;
`;

const ItemBoxContainer = styled.div.attrs((props) => ({
  marginTop: props.marginTop
}))`
  width: 100%;
  margin-top: ${props => props.marginTop}px;
`;

const ChallengeButtonContainer = styled.div`
  align-self: flex-end;
  margin-top: 28px;
  margin-bottom: 32px;
`;

const ChallengeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ChallengeIcon = styled.img.attrs((props) => ({
  marginRight: props.marginRight
}))`
  margin-right: ${props => props.marginRight}px;
`;

export default withRouter(Homepage);
