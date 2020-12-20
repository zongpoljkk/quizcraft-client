import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { Header, Body } from "./Typography";
import { Button } from "./Button";

import white_logo from "../assets/thumbnail/logo_white.png";
import bronze from "../assets/icon/bronze.png";
import silver from "../assets/icon/silver.png";
import gold from "../assets/icon/gold.png";
import coin from "../assets/icon/coin.png";
import streak from "../assets/icon/streak.png";
import shop from "../assets/icon/shop.png";

import { COLOR, RANK } from "../global/const"

// MOCK DATA
const USER_RANK = "BRONZE";
const USER_LEVEL = 25;
const USER_STREAK = 4;
const USER_COIN = 20;
const USERNAME = "qc 1006";

const Navbar = ({
  history,
  username = USERNAME,
  user_profile_image,
  user_rank = USER_RANK,
  user_level = USER_LEVEL,
  user_streak = USER_STREAK,
  user_coin = USER_COIN
}) => {

  const handleClickLogo = () => {
    history.push("/homepage")
  };

  const handleClickShop = () => {
    history.push("/shop")
  };

  return (
    <Container>
      <div onClick={handleClickLogo} style={{ display: 'flex' }}>
        <Logo src={white_logo} />
      </div>
      <InfoContainer>
        <div style={{ display: 'flex' }} data-tip data-for="levelTip">
          {user_rank === RANK.BRONZE &&
            <Icon src={bronze}/>
          }
          {user_rank === RANK.SILVER &&
            <Icon src={silver}/>
          }
          {user_rank === RANK.GOLD &&
            <Icon src={gold}/>
          }
        </div>
        <ReactTooltip
          id="levelTip"
          place="bottom"
          effect="solid"
          type="light"
          border
          borderColor={COLOR.ISLAND_SPICE}
        >
          <Body color={COLOR.MANDARIN}>Level {user_level}</Body>
        </ReactTooltip>
        <div style={{ marginRight: 12 }}/>
        <Icon src={streak} marginRight={4}/>
        <Header color={COLOR.WHITE}>{user_streak}</Header>
        <div style={{ marginRight: 12 }}/>
        <Icon src={coin} marginRight={4}/>
        <Header color={COLOR.WHITE}>{user_coin}</Header>
        <div style={{ marginRight: 12 }}/>
        <div onClick={handleClickShop} style={{ display: 'flex' }}>
          <Icon src={shop} marginRight={12}/>
        </div>
        <ProfileImage 
          backgroundColor={user_profile_image ? null : COLOR.ISLAND_SPICE} 
          data-tip
          data-for="userTip"
          data-event="click focus"
        >
          {user_profile_image ? <Image src={user_profile_image}/> : null}
        </ProfileImage>
        <ReactTooltipStyled
          id="userTip"
          place="bottom"
          effect="solid"
          type="light"
          border
          borderColor={COLOR.ISLAND_SPICE}
          offset={{left: 10}}
        >
          <UserTip>
            <Body color={COLOR.MANDARIN}>{username}</Body>
            <div style={{ marginBottom: 8 }}/>
            <Button size="custom" width="120px" height="36px">ออกจากระบบ</Button>
          </UserTip>
        </ReactTooltipStyled>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.MANDARIN};
  height: 54px;
  padding: 0px 16px 0px 16px;
`;

const Logo = styled.img`
  height: 36px;
  filter: drop-shadow(0px 1px 0.2px ${COLOR.CHARCOAL});
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImage = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Icon = styled.img`
  height: 28px;
  margin-right: ${props => props.marginRight}px;
`;

const UserTip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReactTooltipStyled = styled(ReactTooltip)`
  max-width: 20vh;
  white-space: normal;
`;

export default withRouter(Navbar);
