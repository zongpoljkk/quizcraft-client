import React from "react";
import styled from "styled-components";

import { LottieFile } from "../../components/LottieFile";
import loadingData from "../../assets/lottie/loading.json";
import { Body } from "../../components/Typography";

import { COLOR } from "../../global/const";

export const LoadingPage = ({ overlay }) => {

  return (
    <React.Fragment>
      {overlay && <Overlay/>}
      <Container>
        <LottieFile animationData={loadingData} width="270px" height="270px" />
        <Body color={overlay? COLOR.ISLAND_SPICE : COLOR.SILVER}>รอสักครู่</Body>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 1060;
  transform: translate(-50%, -50%);
`;

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.CHARCOAL};
  opacity: 0.6;
`;

export default LoadingPage;
