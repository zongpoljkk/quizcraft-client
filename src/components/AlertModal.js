import React from "react";
import styled from "styled-components";

import { Header, Body } from "./Typography";
import { LottieFile } from "./LottieFile";
import { Modal } from "./Modal";
import { COLOR } from "../global/const";
import info_alert from "../assets/lottie/info_alert.json";

export const AlertModal = ({
  isShowing,
  toggle,
  text,
}) => {

  return (
    <div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      >
        <Container>
        <div style = {{marginBottom:"4px" }}>
          <LottieFile 
            animationData={info_alert} 
            width="60px" 
            height="60px" 
            loop={false}
          />
        </div>
        <TextContainer>
          <Header>ขออภัย</Header>
          <div style={{marginTop:"4px"}}/>
          <Body props color={COLOR.SILVER}> {text} </Body>
        </TextContainer>
        </Container>
      </Modal>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;