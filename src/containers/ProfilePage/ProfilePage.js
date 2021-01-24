import React, { useRef, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Header, Subheader, Body, Overline } from "../../components/Typography";
import { ProgressBar } from "../../components/ProgressBar";
import { Button } from "../../components/Button";
import { Item } from "./components/Item";
import LoadingPage from "../LoadingPage/LoadingPage";

import edit_username_icon from "../../assets/icon/edit_username.png";
import bronze from "../../assets/icon/bronze.png";
import silver from "../../assets/icon/silver.png";
import gold from "../../assets/icon/gold.png";
import edit_photo from "../../assets/icon/photo.png";

import { COLOR, CONTAINER_PADDING, RANK } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const NAVBAR_HEIGHT = 54;
const ITEM_SIZE = 102;

const ProfilePage = ({ history, handleLogout, user_info }) => {

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
  };

  return (
    (!user_info)
    ? <LoadingPage/>
    : <Container height={screen_height-NAVBAR_HEIGHT-CONTAINER_PADDING}>
        <ContentContainer>
          <ProfileImage backgroundColor={user_info.photo ? null : COLOR.ISLAND_SPICE}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {hover &&
              <div
                style={{ marginTop: 8, position: 'absolute' }}
                onClick={handleUpload}
              >
                <input 
                  type="file"
                  ref={inputFile}
                  onChange={e => set_selected_image(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <img src={edit_photo} height={100} width={100} style={{ opacity: 0.7 }}/>
              </div>
            }
            {user_info.photo ? <Image src={"data:image/png;base64,"+user_info.photo.data}/> : null}
          </ProfileImage>
          <UsernameContainer>
            <Header>{user_info.username}</Header>
            <div 
              style={{ marginLeft: 16 }}
              onClick={() => {
                history.push({
                  pathname: "/edit-username", 
                  state: {
                    username: user_info.username,
                    user_id: user_info._id,
                  }
                });
              }}
            >
              <img src={edit_username_icon} height={20}/>
            </div>
          </UsernameContainer>
          <InfoContainer>
            <Subheader>ชื่อ : {user_info.firstname} {user_info.lastname}</Subheader>
            {user_info.school &&
              <div style={{ marginTop: 16 }}>
                <Subheader>โรงเรียน : {user_info.school}</Subheader>
              </div>
            }
            {user_info.class &&
              <div style={{ marginTop: 16 }}>
                <Subheader>ห้องเรียน : {user_info.class}</Subheader>
              </div>
            }
          </InfoContainer>
          <LevelContainer>
            {user_info.rank === RANK.BRONZE &&
              <img src={bronze} height={44}/>
            }
            {user_info.rank === RANK.SILVER &&
              <img src={silver} height={44}/>
            }
            {user_info.rank === RANK.GOLD &&
              <img src={gold} height={44}/>
            }
            <div style={{ marginRight: 8 }}/>
            <ContentContainer>
              <LevelTitleContainer>
                <LevelTitle marginBottom={6}>
                  <Body>เลเวล</Body>
                  <div style={{ marginRight: 8 }}/>
                  <Body color={COLOR.MANDARIN}>{user_info.level}</Body>
                </LevelTitle>
                <LevelTitle marginBottom={2}>
                  <Overline color={COLOR.MANDARIN}>{user_info.exp}</Overline>
                  <Overline color={COLOR.SILVER}>/{user_info.maxExp}</Overline>
                </LevelTitle>
              </LevelTitleContainer>
              <ProgressBar percent={(user_info.exp/user_info.maxExp)*100}/>
            </ContentContainer>
          </LevelContainer>
          <ItemContainer 
            width={screen_width-CONTAINER_PADDING}
            justifyContent={user_info.itemInfos.length*ITEM_SIZE <= screen_width-CONTAINER_PADDING ? "center" : "flex-start"}
          >
            {user_info.itemInfos?.map((item, index) => (
              <div key={index} style={{ marginRight: index === user_info.itemInfos.length-1 ? null : 16 }}>
                <Item icon={"data:image/png;base64,"+item.data} amount={item.amount}/>
              </div>
            ))}
          </ItemContainer>
        </ContentContainer>
        <Button 
          type="outline" 
          onClick={() => {
            handleLogout()
            history.push("/")
            history.go(0)
          }}
        >
          ออกจากระบบ
        </Button>
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
  width: props.width,
  justifyContent: props.justifyContent
}))`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  overflow: scroll;
  width: ${props => props.width}px;
  margin-bottom: 32px;
`;

export default withRouter(ProfilePage);