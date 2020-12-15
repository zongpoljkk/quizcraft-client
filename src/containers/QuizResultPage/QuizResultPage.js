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
          <motion.div
            animate={{
              x: 0,
              backgroundColor: "#000",
              boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
              position: "fixed",
              transitionEnd: {
                display: "none",
              },
            }}
          />
          <Subheader color={COLOR.SILVER}>Out of 10</Subheader>
        </Circle>
      </CenterDiv>

      <RewardDiv>
        <div style={{ margin: "0px" }}>
          <LottieFile
            animationData={rewardData}
            width={48}
            height={48}
          ></LottieFile>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "4px",
          }}
        >
          <Body color={COLOR.MANDARIN}>
            คุณได้รับ + {exp} XP + {coin} coins
          </Body>
        </div>
      </RewardDiv>

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
  align-items: center;
`;

const RewardDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 24px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
`;

export default QuizResultPage;
