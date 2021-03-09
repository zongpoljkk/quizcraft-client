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
import { Button } from "../../components/Button";
import LoadingPage from "../LoadingPage/LoadingPage";

import { useGetLeaderBoard, useGetSubjects, useGetAchievements } from "./HomepageHelper";
import { checkAchievement } from "../../global/achievement";

// Hook
import useModal from "../../components/useModal";
import challenge_icon from "../../assets/thumbnail/challenge.png";
import challenge_mandarin_icon from "../../assets/thumbnail/challenge_mandarin.png";

import { CONTAINER_PADDING } from "../../global/const";
import { useWindowDimensions } from "../../global/utils"; 

const Homepage = ({ user_id, user_info }) => {
  const history = useHistory();
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const [isShowing, toggle] = useModal();
  const [modal_data, set_modal_data] = useState();
  const { width: screen_width } = useWindowDimensions();

  const [on_hover, set_on_hover] = useState(false);

  const { subjects } = useGetSubjects();
  const { leader_board } = useGetLeaderBoard(user_id);

  const {
    getAchievements,
    achievements_loading,
    achievements,
  } = useGetAchievements(user_id);

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
            <SubjectCard subjects_data={subjects.data} />
          </ScrollView>
          <ItemBoxContainer marginTop={24}>
            <ItemBox type="frame" shadow="frame" width={container_width - 32}>
              <div style={{ marginBottom: "12px" }}>
                <Header>กระดานผู้นำ</Header>
              </div>
              <Tabs data={leader_board.data} />
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
