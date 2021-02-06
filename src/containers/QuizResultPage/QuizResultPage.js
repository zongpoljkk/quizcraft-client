import { React, useState, useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

// Lottie
import { LottieFile } from "../../components/LottieFile";
import rewardData from "../../assets/lottie/reward.json";

// Typography
import { Header, Subheader, Body } from "../../components/Typography";

// Color
import { COLOR, LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

// Components
import { Button } from "../../components/Button";
import RunningNum from "./components/runningNum";
import { LevelUpModal } from "../../components/LevelUpModal";
import useModal from "../../components/useModal";

import { NUMBER_OF_QUIZ } from "../QuizGamePage/QuizGamePage";

// const MOCK_SCORE = 8;

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const QuizResultPage = ({ history, user_info }) => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [exp, setEXP] = useState(0);
  const [coin, setCoin] = useState(0);
  const [score, setScore] = useState(0);
  const [isShowing, toggle] = useModal();

  const location = useLocation();

  const handleOnPlayAgain = (history) => {
    history.push({
      pathname:
        "/" +
        location.state.subject +
        "/" +
        location.state.topic +
        "/" +
        location.state.subtopic +
        "/" +
        location.state.difficulty +
        "/quiz-game",
      state: {
        subject_name: location.state.subject,
        topic_name: location.state.topic,
        subtopic_name: location.state.subtopic,
        difficulty: location.state.difficulty,
      },
    });
  };

  const handleExit = (history) => {
    history.push({
      pathname: "/" + location.state.subject + "/" + location.state.topic,
      state: {
        subject_name: location.state.subject,
        topic_name: location.state.topic,
      },
    });
  };

  useEffect(() => {
    setScore(location.state.score);
    setEXP(location.state.earned_exp);
    setCoin(location.state.earned_coins);
    if(location.state.is_level_up || location.state.is_rank_up) {
      toggle();
    };
  }, []);

  return (
    <Container>
      <CenterDiv style={{ marginBottom: "32px" }}>
        <Header>สรุปคะแนน</Header>
      </CenterDiv>

      <CenterDiv style={{ marginBottom: "64px" }}>
        <Circle initial="hidden" animate="visible" variants={variants}>
          <RunningNum score={score} />
          <Subheader color={COLOR.SILVER}>เต็ม {NUMBER_OF_QUIZ}</Subheader>
        </Circle>
      </CenterDiv>

      <RewardDiv
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ delay: 2 }}
      >
        <div style={{ margin: "0px" }}>
          <LottieFile
            animationData={rewardData}
            width={48}
            height={48}
            loop={false}
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

      <ButtonDiv
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ delay: 3 }}
        justifyContent={
          screen_width >= LARGE_DEVICE_SIZE ? "space-evenly" : "space-between"
        }
      >
        <Button type="outline" onClick={() => handleExit(history)}>
          ออก
        </Button>
        <Button onClick={() => handleOnPlayAgain(history)}>เล่นอีกครั้ง</Button>
      </ButtonDiv>

      <LevelUpModal
        isShowing={isShowing}
        toggle={toggle}
        rank={location.state.is_rank_up ? user_info?.rank : null}
        level={user_info?.level}
        exp={user_info?.exp}
        max_exp={user_info?.maxExp}
        coin={location.state.earned_coins}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Circle = styled(motion.span)`
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

const RewardDiv = styled(motion.div)`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 24px;
`;

const ButtonDiv = styled(motion.div).attrs((props) => ({
  justifyContent: props.justifyContent,
}))`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  flex: 1;
  width: 100%;
`;

export default withRouter(QuizResultPage);
