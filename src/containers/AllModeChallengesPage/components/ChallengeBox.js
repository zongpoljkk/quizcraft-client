import React, { useEffect } from "react";
import styled from "styled-components";

import { ItemBox } from "../../../components/ItemBox";
import { Body, Overline } from "../../../components/Typography";

import { CHALLENGE_BOX_TYPE, COLOR } from "../../../global/const";
import { convertHexToRGBA } from "../../../global/utils";

export const ChallengeBox = ({
  image,
  username,
  my_scores,
  challenger_score,
  is_read = true,
  type,
  margin_right,
  getMarginRightOfChallengeBox = () => {},
  onClick = () => {}
}) => {
  
  useEffect(() => {
    getMarginRightOfChallengeBox();
  }, []);

  return (
    <div style={{ marginTop: 12, marginRight: margin_right }} onClick={onClick}>
      <ItemBox type = "small" color={is_read ? COLOR.WHITE : convertHexToRGBA(COLOR.ISLAND_SPICE, 60)} width={96}>
        <ProfileImage backgroundColor={image ? null : COLOR.ISLAND_SPICE}>
          {image ? <Image src={"data:image/png;base64,"+image.data}/> : null}
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