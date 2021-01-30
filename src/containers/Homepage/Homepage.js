import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";
import AchievementPanel from "./components/AchievementPanel";
import { Tabs } from "../../components/Leaderboard/Tabs";
import { ItemBox } from "../../components/ItemBox";
import { Header } from "../../components/Typography";
import AchievementModal from "../../components/Achievement/AchievementModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import { useGetLeaderBoard, useGetSubjects, useGetAchievements } from "./HomepageHelper";
import { checkAchievement } from "../../global/achievement";

// Hook
import useModal from "../../components/useModal";

const Homepage = ({ user_id, user_info }) => {
  const history = useHistory();
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const [isShowing, toggle] = useModal();
  const [modal_data, set_modal_data] = useState();
  const { getSubjects, subjects_loading, subjects } = useGetSubjects();
  const { getLeaderBoard, leader_board_loading , leader_board } = useGetLeaderBoard(user_id);
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
    if (isShowing) {
      toggle();
    }
  }, []);

  useEffect(() => {
    console.log(user_info);
    // This get called twice (why?)
    // So wait 1 sec for the first call to update db then if there is a second call there''ll be no problem
    // setTimeout(() => {
    if (user_info && !modal_data) {
      // TODO: Show achievement modal if the condition met
      checkAchievement(user_id, "streak", user_info.streak).then((data) => {
        console.log(data);
        if (!modal_data) {
          set_modal_data(data[0]);
        }
      });
      checkAchievement(user_id, "report", user_info.streak).then((data) => {
        console.log(data);
        if (!modal_data) {
          set_modal_data(data[0]);
        }
      });
    }
    // }, 1000);
    // if (user_id && !modal2_data) {
    //   checkReportAchievement(user_id, "report").then((data) => {
    //     console.log(data);
    //     set_modal2_data(data[0]);
    //   });
    // }
  }, [user_info]);

  useEffect(() => {
    console.log("useEffect modal");
    if (modal_data && !isShowing) {
      console.log("toggle");
      toggle();
    }
  }, [modal_data]);

  return (
    <React.Fragment>
      {leader_board_loading || subjects_loading ? (
        <LoadingPage />
      ) : (
        <Container ref={ref}>
          <AchievementModal
            isShowing={isShowing}
            toggle={toggle}
            content={modal_data ? modal_data : {}}
          />
          <GroupPanel
            onCreateGroupClick={() => { history.push("create-group"); }}
            onJoinGroupClick={() => { history.push("join-group"); }}
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
