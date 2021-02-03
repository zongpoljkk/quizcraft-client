import React from "react";
import styled from "styled-components";

import { Subheader, Body } from "../../../components/Typography";

import { COLOR } from "../../../global/const"

export const UserInfo = ({
  my_image,
  challenger_image,
  my_score,
  challenger_score,
  challenger_is_played
}) => {

  return (
    <ProfileImageContainer>
      <UserInfoContainer>
        <ProfileImage backgroundColor={my_image ? null : COLOR.ISLAND_SPICE}>
          {my_image ? <Image src={"data:image/png;base64,"+my_image.data}/> : null}
        </ProfileImage>
        <div style={{ marginBottom: 4 }}/>
        <Body color={COLOR.MANDARIN}>{my_score}</Body>
      </UserInfoContainer>
      <VSContainer>
        <Subheader color={COLOR.MANDARIN}>VS</Subheader>
      </VSContainer>
      <UserInfoContainer>
        <ProfileImage backgroundColor={challenger_image ? null : COLOR.ISLAND_SPICE}>
          {challenger_image ? <Image src={"data:image/png;base64,"+challenger_image.data}/> : null}
        </ProfileImage>
        <div style={{ marginBottom: 4 }}/>
        {challenger_is_played
          ? <Body color={COLOR.MANDARIN}>{challenger_score}</Body>
          : <Body color={COLOR.SILVER}>รอเล่น</Body>
        }
      </UserInfoContainer>
    </ProfileImageContainer>
  );
};

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VSContainer = styled.div`
  margin-top: -28px;
  margin-left: 12px;
  margin-right: 12px;
`;

const ProfileImage = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  height: 48px;
  width: 48px;
  border-radius: 50%;
`;

const Image = styled.img`
  border-radius: 50%;
  height: 48px;
  width: 48px;
`;