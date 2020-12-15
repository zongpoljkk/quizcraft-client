import { React, useState } from "react";
import styled from "styled-components";

// Lottie
import { LottieFile } from "../../components/LottieFile";
import rewardData from "../../assets/lottie/reward.json";

// Typography
import { Header, Subheader, Body } from "../../components/Typography";

// Color
import { COLOR } from "../../global/const";

// Components
import { Button } from "../../components/Button";
import Lottie from "react-lottie";

const QuizResultPage = () => {
  const [exp, setEXP] = useState(0);
  const [coin, setCoin] = useState(0);

  return (
    <Container>
      <CenterDiv style={{ marginBottom: "32px" }}>
        <Header>สรุปคะแนน</Header>
      </CenterDiv>

      <CenterDiv style={{ marginBottom: "64px" }}>
        <Circle>
          <Subheader color={COLOR.SILVER}>Out of 10</Subheader>
        </Circle>
      </CenterDiv>

      <CenterDiv style={{ marginBottom: "24px" }}>
        <LottieFile
          animationData={rewardData}
          width={48}
          height={48}
        ></LottieFile>
        <Body color={COLOR.MANDARIN} style={{ alignItems: "flex-end" }}>
          คุณได้รับ + {exp} XP + {coin} coins
        </Body>
      </CenterDiv>

      <ButtonDiv>
        <Button type="outline">ออก</Button>
        <Button>เล่นอีกครั้ง</Button>
      </ButtonDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Circle = styled.span`
  height: 212px;
  width: 212px;
  background-color: ${COLOR.ISLAND_SPICE};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterDiv = styled.div.attrs((props) => ({
  marginBottom: props.marginBottom,
}))`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.marginBottom};
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
`;

export default QuizResultPage;
