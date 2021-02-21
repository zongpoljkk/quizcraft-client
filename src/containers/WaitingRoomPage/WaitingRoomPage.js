import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, withRouter } from "react-router-dom";
import PlayButton from "react-play-button";

import { Header, Body } from "../../components/Typography";
import { Button } from "../../components/Button";
import { LottieFile } from "../../components/LottieFile";
import LoadingPage from "../LoadingPage/LoadingPage";

import loading_circle from "../../assets/lottie/loading_circle.json";

import { COLOR, DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import {
  useGetGroupMembers,
  useDeleteGroup,
  useLeaveGroup,
  useGetGenerateProblem,
  useServerSentEvent,
  BGMSound
} from "./WaitingRoomPageHelper";

const WaitingRoomPage = ({ history }) => {
  const location = useLocation();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const COLUMNS = Math.floor((screen_width-96)/110);
  const GAP = Math.floor((screen_width-(110*COLUMNS)-96)/COLUMNS);
  const [get_all_members_loading, set_get_all_members_loading] = useState(true);
  const user_id = localStorage.getItem("userId");

  const {
    getGroupMembers,
    loading,
    members,
    number_of_members,
    is_creator,
    group_failed
  } = useGetGroupMembers(location.state.group_id, user_id);

  const {
    getGenerateProblem,
    start_loading,
    problems
  } = useGetGenerateProblem();

  const { deleteGroup } = useDeleteGroup(location.state.group_id, user_id);
  const { leaveGroup } = useLeaveGroup(location.state.group_id, user_id);
  
  const {
    listening,
    subscribe,
    update_member,
    start_game,
    delete_group
  } = useServerSentEvent();

  const { playBGM, stopBGM, isPlayingBGM } = BGMSound();

  const handleDeleteGroup = () => {
    deleteGroup(location.state.group_id, user_id);
    subscribe(location.state.group_id);
    stopBGM();
    history.push("/homepage");
  };

  const handleLeaveGroup = () => {
    leaveGroup(location.state.group_id, user_id);
    subscribe(location.state.group_id);
    stopBGM();
    history.push("/homepage");
  };

  const handleStartGroupGame = async () => {
    await subscribe(location.state.group_id);
    history.push({
      pathname: "/" + location.state.subject_name + "/" + location.state.topic_name + "/" + location.state.subtopic_name + "/" + location.state.difficulty + "/" + "group-game", 
      state: {
        group_id : location.state.group_id,
        subject_name : location.state.subject_name,
        topic_name : location.state.topic_name,
        subtopic_name : location.state.subtopic_name,
        difficulty : location.state.difficulty,
        pin : location.state.pin
      }
    });
  };

  useEffect(() => {
    if(!listening) {
      subscribe(location.state.group_id);
    };
    set_get_all_members_loading(loading);
    getGroupMembers();
  }, []);

  useEffect(() => {
    if(get_all_members_loading) {
      set_get_all_members_loading(loading);
    };
  }, [loading]);

  useEffect(() => {
    if (update_member) {
      getGroupMembers();
    };
    if (start_game && !is_creator) {
      handleStartGroupGame();
    };
    if (delete_group) {
      subscribe(location.state.group_id);
      stopBGM();
      history.push("*");
    };
  }, [update_member, start_game, delete_group]);

  useEffect(() => {
    if(problems && is_creator) {
      handleStartGroupGame();
    };
  }, [start_loading]);

  return (
    <Container isCreator = {is_creator}>
      <PlayButtonContainer>
        <PlayButton
          active={isPlayingBGM}
          size={60}
          idleBackgroundColor={COLOR.ISLAND_SPICE}
          activeBackgroundColor={COLOR.MANDARIN}
          play={playBGM}
          stop={stopBGM}
        />
      </PlayButtonContainer>
      {get_all_members_loading || start_loading
        ? <LoadingPage />
        : (
          <React.Fragment>
            <div style={{width: "300px", height: "300px",overflow: "hidden", position: "relative"}}>
              <NumberText>
                {number_of_members}
              </NumberText>
              <LottieContainer>
                <LottieFile 
                  animationData={loading_circle} 
                  width={100}
                />
              </LottieContainer>
            </div>

            {is_creator ?
              <div style={{ width: "100%" }}>
                {location.state.pin &&
                  <Pin>
                    <Header color={COLOR.MANDARIN}>PIN: {location.state.pin}</Header>
                  </Pin>
                }
                <GroupMemberBox>
                  <DisplayGroupMember columns={COLUMNS} gap={GAP}>
                    {members?.slice(0).reverse().map((list, index) => (
                      <div 
                        key={index} 
                        style={{width: "110px", marginBottom: "4px", paddingBottom: screen_width >= DEVICE_SIZE.LARGE ? null : index === members.length-1 ? "16px" : null}}
                      >
                        <Body> {list.username} </Body>
                      </div>
                    ))}
                  </DisplayGroupMember>
                </GroupMemberBox>
                <ButtonContainer justifyContent={screen_width >= DEVICE_SIZE.LARGE ? 'space-evenly' : 'space-between'}>
                  <Button 
                    type="outline"
                    onClick={() => handleDeleteGroup()}
                  >
                    ยกเลิก
                  </Button>
                  <Button onClick={() => getGenerateProblem(location.state.group_id)}>เริ่ม</Button>
                </ButtonContainer>
              </div>
            :
              <div style={{alignSelf: "center", marginTop: "64px"}}>
                <Button
                  type="outline"
                  onClick={() => handleLeaveGroup()}
                >
                  ออก
                </Button>
              </div>
            }
          </React.Fragment>
      )}
    </Container>
  );
};

const Container = styled.div.attrs((props) => ({
  isCreator: props.isCreator,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${(props) => props.isCreator
    ? null 
    : `
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 10;
      transform: translate(-50%, -50%);
      height: 100%;
  `}
`;

const PlayButtonContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  right: 8px;
  top: 62px;
  transform: scale(0.6);
`;

const GroupMemberBox = styled.div`
  display: flex;
  width: 100%;
  max-height: 170px;
  overflow: scroll;
  border-radius: 10px;
  background: ${COLOR.ISLAND_SPICE};
`;

const DisplayGroupMember  = styled.div.attrs(props => ({
  columns: props.columns,
  gap: props.gap
}))`
  display: grid;
  padding: 16px;
  width: 100%;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-column-gap: ${props => props.gap}px;
`;

const NumberText = styled.div`
  display: flex;
  font-family: Prompt, sans-serif;
  font-weight: 600;
  font-size: 72px;
  color: ${COLOR.WHITE};
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  width: 100%;
  margin-top: 32px;
`;

const Pin = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const LottieContainer = styled.div`
  position: relative;
  z-index: 1;
  zoom: 400%;
  width: 300px;
  margin-left: -112px;
`;

export default withRouter(WaitingRoomPage);