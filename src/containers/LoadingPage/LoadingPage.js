import React from "react";
import styled from "styled-components";
import { LottieFile } from "../../components/LottieFile";
import loadingData from "../../assets/lottie/loading.json";
import { Body } from "../../components/Typography";
import { useWindowDimensions } from "../../global/util"

import { COLOR } from "../../global/const";

const CONTAINER_PADDING = 64+48+48;

const LoadingPage = () => {

  const { height:screen_height , width: screen_width } = useWindowDimensions();

  return (
    <Container height={screen_height-CONTAINER_PADDING}>
      <LottieFile animationData={loadingData} width="270px" height="270px" />
      <Body color={COLOR.SILVER}>รอสักครู่</Body>
    </Container>
  );
};

const Container = styled.div.attrs(props => ({
  height: props.height,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${props => props.height}px
`;

export default LoadingPage;
