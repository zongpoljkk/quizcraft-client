import React from "react";
import styled from "styled-components";
import { LottieFile } from "../../components/LottieFile";
import loadingData from "../../assets/lottie/loading.json";
import { Body } from "../../components/Typography";

import { COLOR } from "../../global/const";

const LoadingPage = () => {

  return (
    <Container>
      <LottieFile animationData={loadingData} width="270px" height="270px" />
      <Body color={COLOR.SILVER}>รอสักครู่</Body>
    </Container>
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
  transform: translate(-50%, -50%);
`;

export default LoadingPage;
