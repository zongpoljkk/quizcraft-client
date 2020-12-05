import React from "react";
import styled from "styled-components";

import { Header, Body } from "./Typography";
import { ItemCard } from "./ItemCard";
import { LottieFile } from "./LottieFile"
import { CloseIcon } from "./Icon"
import { FooterModal } from "./Modal";
import useModal from "./useModal";

import hint_icon from "../assets/icon/hint.png";
import hintData from "../assets/lottie/hint.json"

import { COLOR } from "../global/const";

export const HintItem = ({
  content
}) => {

  const {isShowing, toggle} = useModal();

  const Container = styled.div`
    display: flex;
  `;

  const IconContainer = styled.div`
    background: ${COLOR.WHITE};
    height: 48px; 
    width: 48px;
    border-radius: 50%;
    margin-right: 24px;
  `;

  const ContentContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

  `;

  return (
    <div>
      <ItemCard onClick={toggle}>
        <img src={hint_icon}  height={22}/>
      </ItemCard>
      <FooterModal
        isShowing={isShowing}
        hide={toggle}
        backgroundColor={COLOR.GOLDEN_TAINOI}
      >
        <Container>
          <IconContainer>
            <LottieFile animationData={hintData}/>
          </IconContainer>
          <ContentContainer>
            <Header color={COLOR.GOLDEN_TAINOI}>คำใบ้:</Header>
            <Body color={COLOR.GOLDEN_TAINOI}>{content}</Body>
          </ContentContainer>
          <div onClick={toggle}>
            <CloseIcon color={COLOR.GOLDEN_TAINOI}/>
          </div>
        </Container>
      </FooterModal>
    </div>
  );
};