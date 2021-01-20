import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";
import AchievementPanel from "./components/AchievementPanel";
import { Tabs } from "../../components/Leaderboard/Tabs";
import { ItemBox } from "../../components/ItemBox";
import { Header } from "../../components/Typography";
import LoadingPage from "../LoadingPage/LoadingPage";

import {
  useGetSubjects,
  useGetLeaderBoard,
  useGetAchievements,
} from "./HomepageHelper";

const Homepage = ({ history, user_id }) => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
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
      {leader_board_loading || subjects_loading || achievements_loading ? (
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
          <div style={{ marginTop: 28, width: "100%" }}>
            <ItemBox type="frame" shadow="frame" width={container_width - 32}>
              <div style={{ marginBottom: "12px" }}>
                <Header>กระดานผู้นำ</Header>
              </div>
              <Tabs data={leader_board} />
            </ItemBox>
          </div>
          <div style={{ marginTop: 32, width: "100%" }}>
            <AchievementPanel
              container_width={container_width}
              achievements={achievements}
            ></AchievementPanel>
          </div>
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

export default withRouter(Homepage);
