import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import RunningNum from "./components/runningNum";

const MOCK_SCORE = 8;

const QuizResultPage = ({ history }) => {
  const [exp, setEXP] = useState(0);
  const [coin, setCoin] = useState(0);
  const [score, setScore] = useState(0);

  const location = useLocation();

  const handleOnPlayAgain = () => {
    history.push({
      pathname:
        location.state.selected_topic_name +
        "/" +
        location.state.selected_subtopic_name +
        "/" +
        location.state.selected_difficulty +
        "/quiz-game",
      state: {
        topic_name: location.state.selected_topic_name,
        subtopic_name: location.state.selected_subtopic_name,
        difficulty: location.state.selected_difficulty,
      },
    });
  };

  const handleExit = () => {
    // TODO: Return to "Select Mode Page"
  };

  useEffect(() => {
    setScore(MOCK_SCORE);
    // TODO: Uncomment when using real data
    // setScore(location.state.score);
    // setEXP(location.state.exp);
    // setCoin(location.state.coin);
  }, []);

  return (
    <Container>
      <CenterDiv style={{ marginBottom: "32px" }}>
        <Header>สรุปคะแนน</Header>
      </CenterDiv>

      <CenterDiv style={{ marginBottom: "64px" }}>
        <Circle>
          <RunningNum score={score} />
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
        <Button type="outline" onClick={handleExit}>
          ออก
        </Button>
        <Button onClick={handleOnPlayAgain}>เล่นอีกครั้ง</Button>
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
  flex-direction: column;
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
