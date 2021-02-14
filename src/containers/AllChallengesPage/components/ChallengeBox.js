import React, { useRef } from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { Button } from "../../../components/Button";
import { Body } from "../../../components/Typography";

import { CHALLENGE_BOX_TYPE, COLOR } from "../../../global/const";
import { convertHexToRGBA, useDetectOutsideClick } from "../../../global/utils";

import click from "../../../assets/sounds/click.mp3";

export const ChallengeBox = ({
  image,
  username,
  my_scores,
  challenger_score,
  subtopic,
  difficulty,
  is_read = true,
  type,
  onSubmitClick = () => {}
}) => {

  const ref = useRef(null);
  const [expand, set_expand] = useDetectOutsideClick(ref, false);

  const [play] = useSound(click, { volume: 0.25 });

  return (
    <CardContainer
      ref={ref}
      backgroundColor={is_read ? COLOR.WHITE : convertHexToRGBA(COLOR.ISLAND_SPICE, 60)}
      onClick={() => {
        set_expand(!expand);
      }}
    >
      <ProfileContainer style={{ flex: 1 }} onClick={play}>
        <ProfileImage backgroundColor={image ? null : COLOR.ISLAND_SPICE}>
          {image ? <Image src={"data:image/png;base64,"+image.data}/> : null}
        </ProfileImage>
        <SpaceBetweenContainer>
          <Body>{username}</Body>
          {type !== CHALLENGE_BOX_TYPE.RESULT &&
            <ProfileContainer>
              <Body color={type === CHALLENGE_BOX_TYPE.MY_TURN ? COLOR.SILVER : COLOR.MANDARIN}>{my_scores}</Body>
              <div style={{ marginLeft: 4, marginRight: 4 }}>
                <Body color={COLOR.MANDARIN}>vs</Body>
              </div>
              <Body color={type === CHALLENGE_BOX_TYPE.MY_TURN ? COLOR.MANDARIN : COLOR.SILVER}>{challenger_score}</Body>
            </ProfileContainer>
          }
        </SpaceBetweenContainer>
      </ProfileContainer>
      {expand && (
        <React.Fragment>
          <Divider />
          <Body>เรื่อง: {subtopic}</Body>
          <Body color={COLOR.GOLDEN_TAINOI}>{difficulty}</Body>
          {type !== CHALLENGE_BOX_TYPE.CHALLENGER_TURN &&
            <ButtonContainer>
              <Button size="small" onClick={onSubmitClick}>
                {type === CHALLENGE_BOX_TYPE.RESULT ? "ผลลัพธ์" : "เล่น"}
              </Button>
            </ButtonContainer>
          }
        </React.Fragment>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 8px 16px 8px 16px;
  box-shadow: 1px 2px 4px ${COLOR.SHADOW};
  border-radius: 5px;
  background-color: ${props => props.backgroundColor};
  margin-bottom: 8px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SpaceBetweenContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
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
  margin-right: 8px;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 4px;
`;

const Divider = styled.div`
  background-color: ${COLOR.SHADOW};
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
`;
