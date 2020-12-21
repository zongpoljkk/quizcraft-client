import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Header, Subheader, Body, Overline } from "../../components/Typography";
import { ProgressBar } from "../../components/ProgressBar";
import { Button } from "../../components/Button";
import { Item } from "./component/Item";

import edit_username_icon from "../../assets/icon/edit_username.png";
import bronze from "../../assets/icon/bronze.png";
import silver from "../../assets/icon/silver.png";
import gold from "../../assets/icon/gold.png";
import skip_icon from "../../assets/icon/skip.png";
import hint_icon from "../../assets/icon/hint.png";
import photo from "../../assets/icon/photo.png";

import { COLOR, RANK } from "../../global/const"
import { useWindowDimensions } from "../../global/util"

// MOCK DATA
const IMAGE = null;
const USERNAME = "ชื่อผู้ใช้";
const NAME = "ชื่อ";
const SURNAME = "นามสกุล";
const SCHOOL = "โรงเรียน";
const CLASS = "ห้องเรียน";
const USER_RANK = "BRONZE";
const LEVEL = 12;
const XP = 876;
const MAX_XP = 2000;
const ITEMS = [
  {
    icon: hint_icon,
    amount: 1
  },
  {
    icon: skip_icon,
    amount: 3
  },
  {
    icon: hint_icon,
    amount: 6
  },
  {
    icon: hint_icon,
    amount: 1
  },
  {
    icon: skip_icon,
    amount: 2
  },
]

const CONTAINER_PADDING = 64;
const NAVBAR_HEIGHT = 54;

const ProfilePage = ({ history }) => {

  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [hover, set_hover] = useState(false);
  const inputFile = useRef(null);
  const [selected_image, set_selected_image] = useState(null);
  
  const handleMouseEnter = () => {
    set_hover(true);
  };

  const handleMouseLeave = () => {
    set_hover(false);
  };

  const handleUpload = () => {
    inputFile.current.click();
  }

  useEffect(() => {
    // TODO: integrate API when selected_image have data
    console.log(selected_image);
  }, [selected_image]);

  return (
    <Container height={screen_height-NAVBAR_HEIGHT-CONTAINER_PADDING}>
      <ContentContainer>
        <ProfileImage backgroundColor={IMAGE ? null : COLOR.ISLAND_SPICE}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {hover 
            ? <div
                style={{ marginTop: 8 }}
                onClick={handleUpload}
              >
                <input 
                  type="file"
                  ref={inputFile}
                  onChange={e => set_selected_image(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <img src={photo} height={100} width={100}/>
              </div>
            : IMAGE ? <Image src={IMAGE}/> : null
          }
        </ProfileImage>
        <UsernameContainer>
          <Header>{USERNAME}</Header>
          <div 
            style={{ marginLeft: 16 }}
            onClick={() => history.push("/edit-username")}
          >
            <img src={edit_username_icon} height={20}/>
          </div>
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
          <ContentContainer>
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
          </ContentContainer>
        </LevelContainer>
        <ItemContainer maxWidth={screen_width-64}>
          {ITEMS?.map((item, index) => (
            <div key={index} style={{ marginRight: 16 }}>
              <Item icon={item.icon} amount={item.amount}/>
            </div>
          ))}
        </ItemContainer>
      </ContentContainer>
      <Button type="outline">ออกจากระบบ</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: ${props => props.height}px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  height: 210px;
  width: 210px;
  border-radius: 50%;
`;

const Image = styled.img.attrs(props => ({
  height: props.height || 210,
  width: props.width || 210
}))`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
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
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 32px;
`;

const LevelTitleContainer = styled.div`
  display: flex;
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

const ItemContainer = styled.div.attrs(props => ({
  maxWidth: props.maxWidth
}))`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  justify-content: flex-start;
  max-width: ${props => props.maxWidth}px;
  margin-bottom: 32px;
`;

export default withRouter(ProfilePage);