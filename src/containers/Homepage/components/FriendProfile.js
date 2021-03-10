import React from "react";
import styled from "styled-components";

import { Header, Body } from "../../../components/Typography";
import { Modal } from "../../../components/Modal";
import LoadingPage from "../../LoadingPage/LoadingPage";

import { COLOR, CONTAINER_PADDING } from "../../../global/const";
import { useWindowDimensions } from "../../../global/utils";

const FriendProfile = ({
  isShowing,
  toggle,
  friend,
  friend_loading,
  friend_name,
  friend_image,
}) => {
  const { width: screen_width } = useWindowDimensions();

  return (
    <React.Fragment>
      {friend_loading
        ? <LoadingPage overlay={true}/>
        : (
          <Modal
            isShowing={isShowing}
            hide={toggle}
          >
            {friend &&
              <Container>
                {console.log(friend)}
                <RowContainer marginBottom={12}>
                  <ProfileImage backgroundColor={friend_image ? null : COLOR.ISLAND_SPICE}>
                    {friend_image ? <Image src={"data:image/png;base64," + friend_image}/> : null}
                  </ProfileImage>
                  <Container>
                    <Header>{friend_name}</Header>
                    <RowContainer marginTop={-4}>
                      {friend.school && <Body color={COLOR.SILVER} style={{ marginRight: "8px" }}>โรงเรียน{friend.school}</Body>}
                      {friend.class && <Body color={COLOR.SILVER}>ห้อง{friend.class}</Body>}
                    </RowContainer>
                  </Container>
                </RowContainer>
                <RowContainer marginBottom={4}>
                  <RowContainer marginRight={36}>
                    <Body>ระดับ: </Body>
                    <Body color={COLOR.MANDARIN} >{friend.rank}</Body>
                  </RowContainer>
                  <RowContainer>
                    <Body>เลเวล: </Body>
                    <Body color={COLOR.MANDARIN} >{friend.level}</Body>
                  </RowContainer>
                </RowContainer>
                <RowContainer marginBottom={4}>
                  <Body>จำนวนข้อทั้งหมดที่เคยเล่น: </Body>
                  <Body color={COLOR.MANDARIN} >{friend.totalQuestions}</Body>
                </RowContainer>
                <Body>ความสำเร็จ: {!friend.achievements[0] && <Body color={COLOR.SILVER}>ยังไม่มี</Body>}</Body>
                {friend.achievements && (
                  <RowContainer marginTop={4} marginBottom={-6} maxWidth={screen_width-(2*CONTAINER_PADDING)}>
                    {friend.achievements.map((achievement, index) => (
                      <AchievementImage key={index}>
                        <Icon src={"data:image/png;base64," + achievement.data}/>
                      </AchievementImage>
                    ))}
                  </RowContainer>
                )}
              </Container>
            }
          </Modal>
        )
      }
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RowContainer = styled.div.attrs((props) => ({
  marginRight: props.marginRight,
  marginTop: props.marginTop,
  marginBottom: props.marginBottom,
  maxWidth: props.maxWidth
}))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: ${props => props.marginRight}px;
  margin-top: ${props => props.marginTop}px;
  margin-bottom: ${props => props.marginBottom}px;
  width: ${props => props.maxWidth}px;
`;

const ProfileImage = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  background-color: ${props => props.backgroundColor};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 12px;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 12px;
`;

const AchievementImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.GOLDEN_TAINOI};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  margin-bottom: 6px;
`;

const Icon = styled.img`
  max-width: 26px;
  max-height: 26px;
`;

export default FriendProfile;