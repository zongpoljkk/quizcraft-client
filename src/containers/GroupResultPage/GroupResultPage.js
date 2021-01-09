import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header, Subheader, Body } from "../../components/Typography";
import { Button } from "../../components/Button"
import { LottieFile } from "../../components/LottieFile";

import gold from "../../assets/lottie/gold_trophy.json";
import silver from "../../assets/lottie/silver_trophy.json";
import bronze from "../../assets/lottie/bronze_trophy.json";

import { COLOR, LARGE_DEVICE_SIZE } from "../../global/const"
import { useWindowDimensions } from "../../global/utils";

const MOCK_DATA = {
  scoreboard: [
    {
      id: 1,
      username: "สมหญิงอิอิ",
      point: 999,
      score: 20
    },
    {
      id: 2,
      username: "จินจินจิน",
      point: 989,
      score: 20
    },
    {
      id: 3,
      username: "mingming",
      point: 799,
      score: 17
    },
    {
      id: 4,
      username: "zongpol",
      point: 765,
      score: 16
    },
    {
      id: 5,
      username: "pimkunut_tee",
      point: 555,
      score: 13
    },
    {
      id: 6,
      username: "ajinn",
      point: 345,
      score: 12
    },
    {
      id: 7,
      username: "qc0028",
      point: 342,
      score: 12
    },
    {
      id: 8,
      username: "สมชายรักแม่",
      point: 300,
      score: 11
    },
    {
      id: 9,
      username: "สมปองง่วงมาก",
      point: 245,
      score: 8
    },
    {
      id: 10,
      username: "เหนื่อยจะคิดชื่อ",
      point: 235,
      score: 8
    },
    {
      id: 11,
      username: "อีกซักชื่อ",
      point: 225,
      score: 8
    },
  ],
  user_index: 5,
  number_of_problem: 20,
  is_created: true
};

const GroupResultPage = () => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [display_first_lottie, set_display_first_lottie] = useState(false);
  const [display_lottie, set_display_lottie] = useState(false);

  const list = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 1.25
      }
    }
  };

  const item = {
    visible: (index) => ({
      opacity: 1,
      transition: {
        delay: index * 1.25,
      },
    }),
    hidden: { opacity: 0 },
  };

  const first_animation_success = () => {
    set_display_first_lottie(true);
  };

  const animation_success = () => {
    set_display_lottie(true);
  };

  return (
    <Container 
      initial="hidden" 
      animate="visible"
      variants={list}
    >
      <motion.div 
        custom={0} 
        variants={item}
        style={{alignSelf: "center"}}
      >
        <Header> สรุปผลคะแนน </Header>
      </motion.div>
      <Top3Container custom={1} variants={item}>
        <TrophyWithInfo>
        <motion.div
          initial="hidden"
          animate="visible"
          custom={2} 
          variants={item}
          onAnimationComplete={() => first_animation_success()}
        >
          <LottieFile
            animationData={gold}
            width="120px"
            height="120px"
            loop={false}
            isPaused={!display_first_lottie}
            isStopped={!display_first_lottie}
          />
        </motion.div>
        <motion.div custom={3} variants={item}>
          <Subheader> {MOCK_DATA.scoreboard[0].username} </Subheader>
        </motion.div>
        <motion.div 
          custom={4} 
          variants={item}
        >
          <Subheader props color={COLOR.MANDARIN}>{MOCK_DATA.scoreboard[0].point}</Subheader>
        </motion.div>
        </TrophyWithInfo>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <TrophyWithInfo>
            <motion.div 
              initial="hidden"
              animate="visible"
              custom={5} 
              variants={item} 
              onAnimationComplete={() => animation_success()}
            >
              <LottieFile
                animationData={silver}
                width="80px"
                height="80px"
                loop={false}
                isPaused={!display_lottie}
                isStopped={!display_lottie}
              />
            </motion.div>
            <motion.div custom={6} variants={item}>
              <Body>{MOCK_DATA.scoreboard[1].username}</Body>
            </motion.div>
            <motion.div custom={7} variants={item}>
              <Body props color={COLOR.MANDARIN}>{MOCK_DATA.scoreboard[1].point}</Body>
            </motion.div>
          </TrophyWithInfo>
          <TrophyWithInfo>
            <motion.div 
              initial="hidden"
              animate="visible"
              custom={5} 
              variants={item} 
              onAnimationComplete={() => animation_success()}
            >
              <LottieFile
                animationData={bronze}
                width="80px"
                height="80px"
                loop={false}
                isPaused={!display_lottie}
                isStopped={!display_lottie}
              />
            </motion.div>
            <motion.div custom={6} variants={item}>
              <Body>{MOCK_DATA.scoreboard[2].username}</Body>
            </motion.div>
            <motion.div custom={7} variants={item}>
              <Body props color={COLOR.MANDARIN}>{MOCK_DATA.scoreboard[2].point}</Body>
            </motion.div>
          </TrophyWithInfo>
        </div>
      </Top3Container>
      <ResultContainer custom={8} variants={item}>
        {MOCK_DATA.scoreboard.map((list, index) => index > 2 && (
          <InfoBox key={index} backgroundColor={index + 1 === MOCK_DATA.user_index ? COLOR.ISLAND_SPICE : null}>
            <div style={{ marginRight: "12px" }}>
              <Body> {index + 1} </Body>
            </div>
            <Body> {list.username} </Body>
            <PointText> {list.point} </PointText>
          </InfoBox>
        ))}
      </ResultContainer>
      {MOCK_DATA.is_created && (
        <ButtonContainer
          justifyContent={screen_width >= LARGE_DEVICE_SIZE ? "space-evenly" : "space-between"}
          custom={9}
          variants={item}
        >
          <Button type="outline">ลบกลุ่ม</Button>
          <Button>เล่นใหม่อีกครั้ง</Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ButtonContainer = styled(motion.div).attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  width: 100%;
`;

const Top3Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: ${COLOR.ISLAND_SPICE};
  padding: 0px 24px 24px 24px;
  margin-top: 16px;
`;

const TrophyWithInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 24px 0px 24px 0px;
  height: 260px;
  overflow: scroll;
`;

const InfoBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 8px 16px 8px 16px;
  background-color: ${props => props.backgroundColor};
`;

const PointText = styled(Body)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  color: ${COLOR.MANDARIN};
`;

export default GroupResultPage;