import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";
import AchievementPanel from "./components/AchievementPanel";
import FriendProfile from "./components/FriendProfile";
import { Tabs } from "../../components/Leaderboard/Tabs";
import { ItemBox } from "../../components/ItemBox";
import { Header } from "../../components/Typography";
import AchievementModal from "../../components/Achievement/AchievementModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import {
  useGetLeaderBoard,
  useGetSubjects,
  useGetAchievements,
  useGetFriendProfile
} from "./HomepageHelper";
import { checkAchievement } from "../../global/achievement";

// Hook
import useModal from "../../components/useModal";

import { useWindowDimensions } from "../../global/utils";

const Homepage = ({ user_id, user_info }) => {
  const history = useHistory();
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const { width: screen_width } = useWindowDimensions();
  
  const [isShowing, toggle] = useModal();
  const [modal_data, set_modal_data] = useState();
  const [on_hover, set_on_hover] = useState(false);

  const { subjects } = useGetSubjects();
  const { leader_board } = useGetLeaderBoard(user_id);

  const [isShowingFriend, toggleFriend] = useModal();
  const [friend_name, set_friend_name] = useState();
  const [friend_image, set_friend_image] = useState();
  
  const {
    getAchievements,
    achievements_loading,
    achievements,
  } = useGetAchievements(user_id);

  const { getFriendProfile, friend, friend_loading } = useGetFriendProfile();

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  useEffect(() => {
    getAchievements();
    if (isShowing) {
      toggle();
    }
  }, []);

  useEffect(() => {
    // This get called twice (why?)
    if (user_info && !modal_data) {
      // Show achievement modal if the condition met
      checkAchievement(user_id, "streak", user_info.streak).then((data) => {
        if (!modal_data && data[0]) {
          set_modal_data(data[0]);
        }
      });
      checkAchievement(user_id, "report", user_info.streak).then((data) => {
        if (!modal_data && data[0]) {
          set_modal_data(data[0]);
        }
      });
    }
  }, [user_info]);

  useEffect(() => {
    if (modal_data && !isShowing) {
      toggle();
    }
  }, [modal_data]);

  return (
    <React.Fragment>
      {!subjects || !leader_board ? (
        <LoadingPage />
      ) : (
        <Container ref={ref}>
          <AchievementModal
            isShowing={isShowing}
            toggle={toggle}
            content={modal_data ? modal_data : {}}
          />
          <GroupPanel
            onCreateGroupClick={() => {
              history.push("create-group");
            }}
            onJoinGroupClick={() => {
              history.push("join-group");
            }}
          />
          <ScrollView>
            <SubjectCard subjects_data={subjects?.data} />
          </ScrollView>
          <ItemBoxContainer marginTop={24}>
            <ItemBox type="frame" shadow="frame" width={container_width - 32}>
              <div style={{ marginBottom: "12px" }}>
                <Header>กระดานผู้นำ</Header>
              </div>
              <Tabs
                data={leader_board?.data}
                toggleFriend={toggleFriend}
                getFriendProfile={getFriendProfile}
                set_friend_name={set_friend_name}
                set_friend_image={set_friend_image}
              />
              <FriendProfile
                isShowing={isShowingFriend}
                toggle={toggleFriend}
                friend={friend}
                friend_loading={friend_loading}
                friend_name={friend_name}
                friend_image={friend_image}
              />
            </ItemBox>
          </ItemBoxContainer>
          <ItemBoxContainer marginTop={32}>
            <AchievementPanel
              container_width={container_width}
              achievements={achievements}
            ></AchievementPanel>
          </ItemBoxContainer>
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

export default withRouter(Homepage);
