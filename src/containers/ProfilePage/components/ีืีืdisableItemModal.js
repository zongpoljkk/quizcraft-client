import React from "react";
import styled from "styled-components";

import { Header, Body } from "../../../components/Typography";
import { LottieFile } from "../../../components/LottieFile";
import info_alert from "../../../assets/lottie/info_alert.json";
import { Modal } from "../../../components/Modal";
import { COLOR } from "../../../global/const";

export const DisableItemModal = ({
  isShowing,
  toggle,
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
          <Body props color={COLOR.SILVER}> ไม่สามารถใช้ไอเทมนี้ในหน้านี้ได้ </Body>
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