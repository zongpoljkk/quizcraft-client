import React from "react";
import styled from "styled-components";

import { Body } from "../Typography";

import { COLOR, DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

export const TabContent = ({
  data,
  index,
  toggleFriend,
  getFriendProfile,
  set_friend_name,
  set_friend_image
}) => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <Container>
      {Object.entries(data).map((user, i) => (
        <InfoBox
          key={i}
          backgroundColor={index - 1 === i ? COLOR.MANDARIN : null}
          onClick={() => {
            getFriendProfile(data[i].username);
            set_friend_name(data[i].username);
            set_friend_image(data[i].profileImage?.data);
            toggleFriend();
          }}
        >
          <OrderText>{i + 1}</OrderText>
          <UserImg backgroundColor={user[1].profileImage ? null : COLOR.ISLAND_SPICE}>
            {user[1].profileImage ? (
              <img
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                src={"data:image/png;base64," + user[1].profileImage.data}
              />
            ) : null}
          </UserImg>
          <Body>
            <CropText width={screen_width <= DEVICE_SIZE.XXS ? "80px" : screen_width <= DEVICE_SIZE.XS ? "96px" : "fit-content"}>{user[1].username}</CropText>
          </Body>
          <LevelText color={index - 1 === i ? COLOR.ISLAND_SPICE : COLOR.GOLDEN_TAINOI}>
            Lv.{user[1].level}
          </LevelText>
        </InfoBox>
      ))}
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 16px;
  height: 168px;
  overflow: scroll;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 16px;
  min-height: 40px;
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
`;

const OrderText = styled(Body)`
  min-width: 24px;
`;

const CropText = styled.div.attrs(props => ({
  width: props.width
}))`
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
  width: ${props => props.width};
`;

const LevelText = styled(Body)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  color: ${props => props.color};
`;

const UserImg = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  alt: "User profile Image";
  display: flex;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  min-height: 40px;
  min-width: 40px;
  border-radius: 50%;
  text-align: center;
  margin-left: 12px;
  margin-right: 12px;
`;