import React from "react";
import styled from "styled-components";

import { Body } from "../Typography";
import { COLOR } from "../../global/const";

export const TabContent = ({
  data,
  index
}) => {
  return(  
    <Container>
      {Object.entries(data).map((user, i) => (
        <InfoBox backgroundColor={index === i ? COLOR.MANDARIN : null}>
          <Body>{i+1}</Body>
          <UserImg backgroundColor={user[1].profile_image ? null : COLOR.ISLAND_SPICE}>
            {user[1].profile_image ? <img src={user[1].profile_image}/> : null}
          </UserImg>
          <Body>{user[1].username}</Body>
          <LevelText color={index === i ? COLOR.ISLAND_SPICE : COLOR.GOLDEN_TAINOI}> Lv.{user[1].levels}</LevelText>
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
  flex: 1;
  align-items: center;
  padding: 4px 16px 4px 16px;
  background-color: ${props => props.backgroundColor};
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
  margin-left: 12px;
  margin-right: 12px;
  background-color: ${props => props.backgroundColor};
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;