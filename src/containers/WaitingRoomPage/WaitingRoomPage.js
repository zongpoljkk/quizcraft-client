import React, { useEffect } from "react";
import styled from "styled-components";

import { Body } from "../../components/Typography";
import { Button } from "../../components/Button";
import { LottieFile } from "../../components/LottieFile";
import LoadingPage from "../LoadingPage/LoadingPage";

import loading_circle from "../../assets/lottie/loading_circle.json";

import { COLOR, LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import { useGetGroupMembers } from "./WaitingRoomPageHelper";

// MOCK DATA
const GROUP_ID = "5ffd4b96d8dcb02748bac714";

const WaitingRoomPage = () => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const COLUMNS = Math.floor((screen_width-96)/110);
  const GAP = Math.floor((screen_width-(110*COLUMNS)-96)/COLUMNS);

  const {
    getGroupMembers,
    loading,
    members,
    number_of_members,
    is_creator
  } = useGetGroupMembers(GROUP_ID);

  useEffect(() => {
    getGroupMembers();
  }, []);
  
  return (
    <Container isCreator = {is_creator}>
      {loading
        ? <LoadingPage />
        : (
          <React.Fragment>
            <div style={{width: "300px", position: "relative"}}>
              <NumberText>
                {number_of_members}
              </NumberText>
              <div style={{ position: 'relative', zIndex: '1' }}>
                <LottieFile 
                  animationData={loading_circle} 
                  width={300}
                  height={300}
                />
              </div>
            </div>
            {is_creator ?
              <div>
                <GroupMemberBox>
                    <DisplayGroupMember columns={COLUMNS} gap={GAP}>
                      {members?.slice(0).reverse().map((list, index) => (
                        <div 
                          key={index} 
                          style={{width: "110px", marginBottom: "4px", paddingBottom: screen_width >= LARGE_DEVICE_SIZE ? null : index === members.length-1 ? "16px" : null}}
                        >
                          <Body> {list.username} </Body>
                        </div>
                      ))}
                    </DisplayGroupMember>
                </GroupMemberBox>
                <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
                  <Button type="outline">ยกเลิก</Button>
                  <Button>เริ่ม</Button>
                </ButtonContainer>
              </div>
            :
              <div style={{alignSelf: "center", marginTop: "64px"}}>
                <Button type="outline">ออก</Button>
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

  ${(props) => props.isCreator ? null 
    : `
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 1060;
      transform: translate(-50%, -50%);
  `}
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
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-column-gap: ${props => props.gap}px;
`;

const NumberText = styled.div`
  display: flex;
  font-family: Prompt, sans-serif;
  font-weight: 600;
  font-size: 72px;
  color: ${COLOR.MANDARIN};
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

export default WaitingRoomPage;