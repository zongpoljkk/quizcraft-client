import React from "react";
import styled from "styled-components";

import { Header, Subheader, Body, Overline } from "../../components/Typography";
import { ProgressBar } from "../../components/ProgressBar";

import edit_username_icon from "../../assets/icon/edit_username.png";
import bronze from "../../assets/icon/bronze.png";
import silver from "../../assets/icon/silver.png";
import gold from "../../assets/icon/gold.png";

import { COLOR, RANK } from "../../global/const"

// MOCK DATA
const USERNAME = "ชื่อผู้ใช้";
const NAME = "ชื่อ";
const SURNAME = "นามสกุล";
const SCHOOL = "โรงเรียน";
const CLASS = "ห้องเรียน";
const USER_RANK = "BRONZE";
const LEVEL = 12;
const XP = 876;
const MAX_XP = 2000;

const ProfilePage = () => {

  return (
    <Container>
      <DefaultProfileImage />
      <UsernameContainer>
        <Header>{USERNAME}</Header>
        <div style={{ marginRight: 16 }}/>
        <img src={edit_username_icon} height={20}/>
      </UsernameContainer>
      <InfoContainer>
        <Subheader>{NAME} {SURNAME}</Subheader>
        <div style={{ marginBottom: 16 }}/>
        <Subheader>{SCHOOL}</Subheader>
        <div style={{ marginBottom: 16 }}/>
        <Subheader>{CLASS}</Subheader>
      </InfoContainer>
      <LevelContainer>
        {USER_RANK === RANK.BRONZE &&
          <img src={bronze} height={44}/>
        }
        {USER_RANK === RANK.SILVER &&
          <img src={silver} height={44}/>
        }
        {USER_RANK === RANK.GOLD &&
          <img src={gold} height={44}/>
        }
        <div style={{ marginRight: 8 }}/>
        <Container>
          <LevelTitleContainer>
            <LevelTitle marginBottom={6}>
              <Body>เลเวล</Body>
              <div style={{ marginRight: 8 }}/>
              <Body color={COLOR.MANDARIN}>{LEVEL}</Body>
            </LevelTitle>
            <LevelTitle marginBottom={2}>
              <Overline color={COLOR.MANDARIN}>{XP}</Overline>
              <Overline color={COLOR.SILVER}>/{MAX_XP}</Overline>
            </LevelTitle>
          </LevelTitleContainer>
          <ProgressBar percent={(XP/MAX_XP)*100}/>
        </Container>
      </LevelContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DefaultProfileImage = styled.div`
  background-color: ${COLOR.ISLAND_SPICE};
  height: 240px;
  width: 240px;
  border-radius: 50%;
`;

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding: 16px;
  margin-bottom: 8px;
`;

const LevelContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const LevelTitleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const LevelTitle = styled.div.attrs(props => ({
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${props => props.marginBottom}px;
`;

export default ProfilePage;
