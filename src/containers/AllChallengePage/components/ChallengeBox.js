import React, { useEffect } from "react";
import styled from "styled-components";

import { ItemBox } from "../../../components/ItemBox";
import { Body, Overline } from "../../../components/Typography";

import { COLOR } from "../../../global/const";

const CHALLENGE_BOX_TYPE = {
  MY_TURN: "MY_TURN",
  CHALLENGER_TURN: "CHALLENGER_TURN",
  RESULT: "RESULT"
};

export const ChallengeBox = ({
  image,
  username,
  my_scores,
  challenger_score,
  type,
  margin_right,
  getMarginRightOfChallengeBox = () => {},
  read = true
}) => {
  
  useEffect(() => {
    getMarginRightOfChallengeBox();
  }, []);

  return (
    <div style={{ marginTop: 12, marginRight: margin_right }}>
      <ItemBox type = "small" color={read ? COLOR.WHITE : COLOR.ISLAND_SPICE} width={96}>
        <ProfileImage backgroundColor={image ? null : COLOR.ISLAND_SPICE}>
          {image ? <Image src={image}/> : null}
        </ProfileImage>
        <div style={{ marginTop: 4 }}>
          <Overline>{username}</Overline>
        </div>
        {type !== CHALLENGE_BOX_TYPE.RESULT &&
          <ScoreContainer>
            <Body color={type === CHALLENGE_BOX_TYPE.MY_TURN ? COLOR.SILVER : COLOR.MANDARIN}>{my_scores}</Body>
            <div style={{ marginLeft: 4, marginRight: 4 }}>
              <Body color={COLOR.MANDARIN}>vs</Body>
            </div>
            <Body color={type === CHALLENGE_BOX_TYPE.MY_TURN ? COLOR.MANDARIN : COLOR.SILVER}>{challenger_score}</Body>
          </ScoreContainer>
        }
      </ItemBox>
    </div>
  );
};

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

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
`;