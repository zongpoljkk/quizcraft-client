import React from "react";
import styled from "styled-components";

import { Header, Subheader, Body } from "./Typography";
import { ItemCard } from "./ItemCard";
import { LottieFile } from "./LottieFile";
import { FooterModal } from "./Modal";
import useModal from "./useModal";

import hint_icon from "../assets/icon/hint.png";
import hintData from "../assets/lottie/hint.json";
import close_gloden_tainoi_icon from "../assets/icon/close_gloden_tainoi.png";

import { COLOR } from "../global/const";

export const HintItem = ({
  amount_of_hints,
  onGetHint,
  content
}) => {

  const [isShowing, toggle] = useModal();

  return (
    <div>
      <ItemCard
        onClick={() => {
          if(amount_of_hints !== 0) {
            onGetHint();
            toggle();
          }
        }}
        disable={amount_of_hints === 0 ? true : false}
      >
        <ItemContainer src={hint_icon} marginRight={amount_of_hints >= 0 ? 8 : null}/>
        <Subheader>{amount_of_hints}</Subheader>
      </ItemCard>
      <FooterModal
        isShowing={content ? isShowing : null}
        hide={toggle}
        backgroundColor={COLOR.GOLDEN_TAINOI}
      >
        <Container>
          <IconContainer>
            <LottieFile animationData={hintData}/>
          </IconContainer>
          <ContentContainer>
            <Header color={COLOR.GOLDEN_TAINOI}>คำใบ้:</Header>
            <div style={{ marginBottom: 8 }}/>
            {content?.split('\n').map((item, key) => {
              return (
                <Body key={key} color={COLOR.GOLDEN_TAINOI}>{item}</Body>
              );
            })}
          </ContentContainer>
          <div onClick={toggle}>
            <img src={close_gloden_tainoi_icon} height={16} width={16}/>
          </div>
        </Container>
      </FooterModal>
    </div>
  );
};

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

const ItemContainer = styled.img.attrs(props => ({
  marginRight: props.marginRight
}))`
  height: 22px;
  margin-right: ${props => props.marginRight}px;
`;
