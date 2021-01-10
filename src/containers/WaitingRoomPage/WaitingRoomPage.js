import React from "react";
import styled from "styled-components";

import { Body } from "../../components/Typography";
import { Button } from "../../components/Button";
import { LottieFile } from "../../components/LottieFile";

import loading_circle from "../../assets/lottie/loading_circle.json";

import { COLOR, LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const MOCK_DATA = {
  all_member: ["ajinn", "pimkunut_tee", "สมหญิงอิอิ", "สมชายรักพ่อ", "mingmimg", "zongpol", "อยากนอนแล้ว", "สมปองรักแม่", "จินจินจิน", "ณัชเองจ้า", "ขี้เกียจจัง", "ง่วงนอนมั่ก", "testtest"],
  number_of_member: 13,
  is_created: true
}

const WaitingRoomPage = () => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <Container>
      <div style={{width: "300px", position: "relative"}}>
        <NumberText>
          {MOCK_DATA.number_of_member}
        </NumberText>
        <div style={{ position: 'relative', zIndex: '1' }}>
          <LottieFile 
            animationData={loading_circle} 
            width={300}
            height={300}
          />
        </div>
      </div>
      {MOCK_DATA.is_created && (
        <GroupMemberBox>
          <div style={{display: "flex", flexFlow: "wrap", justifyContent: "space-between", padding: "16px"}}>
            {MOCK_DATA.all_member.slice(0).reverse().map((list, index) => (
              <div style={{width: "110px", marginBottom: "4px"}}>
                <Body key={index}> {list} </Body>
              </div>
            ))}
          </div>
        </GroupMemberBox>
      )}
      {MOCK_DATA.is_created ?
        <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
          <Button type="outline">ยกเลิก</Button>
          <Button>เริ่ม</Button>
        </ButtonContainer>
      :
        <div style={{alignSelf: "center", marginTop: "64px"}}>
          <Button type="outline">ออก</Button>
        </div>
      }
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const GroupMemberBox = styled.div`
  display: flex;
  width: 100%;
  max-height: 170px;
  overflow: scroll;
  border-radius: 10px;
  background: ${COLOR.ISLAND_SPICE};
`;

const NumberText = styled.div`
  display: flex;
  font-family: Prompt, sans-serif;
  font-weight: 600;
  font-size: 72px;
  color: ${COLOR.MANDARIN};
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  width: 100%;
  margin-top: 32px;
`;

export default WaitingRoomPage;