import React from "react";
import styled from "styled-components";

import { Header } from "./Typography";

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
const USER_STREAK = 4;
const USER_COIN = 20;

const Navbar = ({
  user_profile_image,
  user_rank = USER_RANK,
  user_streak = USER_STREAK,
  user_coin = USER_COIN
}) => {
  return (
    <Container>
      <Logo src={white_logo} />
      <InfoContainer>
        {user_rank === RANK.BRONZE &&
          <Icon src={bronze} marginRight={12}/>
        }
        {user_rank === RANK.SILVER &&
          <Icon src={silver} marginRight={12}/>
        }
        {user_rank === RANK.GOLD &&
          <Icon src={gold} marginRight={12}/>
        }
        <Icon src={streak} marginRight={4}/>
        <Header color={COLOR.WHITE}>{user_streak}</Header>
        <div style={{ marginRight: 12 }}/>
        <Icon src={coin} marginRight={4}/>
        <Header color={COLOR.WHITE}>{user_coin}</Header>
        <div style={{ marginRight: 12 }}/>
        <Icon src={shop} marginRight={12}/>
        <ProfileImage backgroundColor={user_profile_image ? null : COLOR.ISLAND_SPICE}>
          {user_profile_image ? <Image src={user_profile_image}/> : null}
        </ProfileImage>
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
  width: 100%;
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
  spacing: 6px
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

export default Navbar;
