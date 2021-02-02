import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { Header, Body } from "./Typography";

import white_logo from "../assets/thumbnail/logo_white.png";
import bronze from "../assets/icon/bronze.png";
import silver from "../assets/icon/silver.png";
import gold from "../assets/icon/gold.png";
import coin from "../assets/icon/coin.png";
import streak from "../assets/icon/streak.png";
import shop from "../assets/icon/shop.png";

import { COLOR, RANK } from "../global/const";

const Navbar = ({
  history,
  user_info,
}) => {

  const handleClickLogo = () => {
    history.push("/homepage");
  };

  const handleClickShop = () => {
    history.push("/shop");
  };

  const handleClickProfileImage = () => {
    history.push("/profile");
  };

  return (
    <Container>
      <div onClick={handleClickLogo} style={{ display: 'flex' }}>
        <Logo src={white_logo} />
      </div>
      <InfoContainer>
        <div style={{ display: 'flex' }} data-tip data-for="levelTip">
          {user_info.rank === RANK.BRONZE &&
            <Icon src={bronze}/>
          }
          {user_info.rank === RANK.SILVER &&
            <Icon src={silver}/>
          }
          {user_info.rank === RANK.GOLD &&
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
          <Body color={COLOR.MANDARIN}>Level {user_info.level}</Body>
        </ReactTooltip>
        <div style={{ marginRight: 12 }}/>
        <Icon src={streak} marginRight={4}/>
        <Header color={COLOR.WHITE}>{user_info.streak}</Header>
        <div style={{ marginRight: 12 }}/>
        <Icon src={coin} marginRight={4}/>
        <Header color={COLOR.WHITE}>{user_info.coin}</Header>
        <div style={{ marginRight: 12 }}/>
        <div onClick={handleClickShop} style={{ display: 'flex' }}>
          <Icon src={shop} marginRight={12}/>
        </div>
        <ProfileImage 
          backgroundColor={user_info.photo ? null : COLOR.ISLAND_SPICE} 
          onClick={handleClickProfileImage}
        >
          {user_info.photo ? <Image src={"data:image/png;base64,"+user_info.photo.data}/> : null}
        </ProfileImage>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.MANDARIN};
  height: 54px;
  padding: 0px 16px 0px 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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

export default withRouter(Navbar);
