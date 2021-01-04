import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Subheader, Body } from "../../components/Typography";
import { Button } from "../../components/Button";
import { LottieFile } from "../../components/LottieFile";

import page_not_found from "../../assets/lottie/404.json";

import { COLOR, CONTAINER_PADDING } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const ErrorPage = ({ history }) => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <Container>
      <LottieFile 
        animationData={page_not_found} 
        width={screen_width-CONTAINER_PADDING}
      />
      <Subheader color={COLOR.MANDARIN}>ขออภัย ไม่พบหน้าที่คุณต้องการ</Subheader>
      <Body color={COLOR.MANDARIN}>กรุณาตรวจสอบใหม่อีกครั้ง หรือกลับสู่หน้าแรก</Body>
      <div style={{ marginBottom: 32 }}/>
      <Button onClick={() => { history.push("homepage"); }}>
        กลับหน้าแรก
      </Button>
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

export default withRouter(ErrorPage);
