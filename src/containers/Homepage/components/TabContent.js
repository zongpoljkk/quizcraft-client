import React from "react";
import styled from "styled-components";

import { Body } from "../../../components/Typography";

import { COLOR } from "../../../global/const";

export const TabContent = ({
  data,
  index
}) => {
  return(  
    <Container>
      {Object.entries(data).map((user, i) => (
        <InfoBox backgroundColor={index === i ? COLOR.ISLAND_SPICE : null}>
          <Body>{i+1}</Body>
          <UserImg src={user[1].profile_image ? user[1].profile_image : null}/>
          <Body>{user[1].username}</Body>
          <LevelText color={index === i ? COLOR.MANDARIN : COLOR.GOLDEN_TAINOI}> Lv.{user[1].levels}</LevelText>
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

const UserImg = styled.img`
  alt: "User profile Image";
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 12px;
  margin-right: 12px;
  background-color: ${COLOR.ISLAND_SPICE};
`;
