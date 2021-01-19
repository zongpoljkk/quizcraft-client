import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";

import { Header, Subheader, Body, Overline } from "../../components/Typography";
import { Button } from "../../components/Button"
import { LottieFile } from "../../components/LottieFile";
import LoadingPage from "../LoadingPage/LoadingPage";

import gold from "../../assets/lottie/gold_trophy.json";
import silver from "../../assets/lottie/silver_trophy.json";
import bronze from "../../assets/lottie/bronze_trophy.json";
import export_icon from "../../assets/icon/export.png";

import { COLOR, LARGE_DEVICE_SIZE } from "../../global/const"
import { useWindowDimensions } from "../../global/utils";

import {
  useGetGroupScoreBoard,
  useDeleteGroup,
  useLeaveGroup,
} from "./GroupResultPageHelper";

const GROUP_ID = "5ffd4b96d8dcb02748bac714";
const USER_ID = "60002df26860a84c2f87a6ed"

const GroupResultPage = ({ history }) => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [display_first_lottie, set_display_first_lottie] = useState(false);
  const [display_second_lottie, set_display_second_lottie] = useState(false);
  const [display_third_lottie, set_display_third_lottie] = useState(false);
  const user_id = localStorage.getItem("userId");

  const {
    getGroupScoreBoard,
    loading,
    scoreboard,
    numboer_of_problem,
    user_index,
    is_creator,
  } = useGetGroupScoreBoard(GROUP_ID, user_id);

  const { deleteGroup } = useDeleteGroup(GROUP_ID, user_id);
  const { leaveGroup, leave_failed } = useLeaveGroup(GROUP_ID, user_id);

  const headers = [
    {label: "username", key: "username"},
    {label: "point", key: "point"},
    {label: "score", key: "score"},
  ];

  const csvReport = {
    data: scoreboard,
    headers: headers,
    filename: 'group_scoreboard.csv'
  };

  const list = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 1.25,
      },
    },
  };

  const item = {
    visible: (index) => ({
      opacity: 1,
      transition: {
        delay: index * 1.15,
      },
    }),
    hidden: { opacity: 0 },
  };

  const first_animation_success = () => {
    set_display_first_lottie(true);
  };

  const second_animation_success = () => {
    set_display_second_lottie(true);
  };

  const third_animation_success = () => {
    set_display_third_lottie(true);
  };

  const handleDeleteGroup = () => {
    deleteGroup(GROUP_ID, user_id);
    history.push("/homepage");
  }

  const handleLeaveGroup = () => {
    leaveGroup(GROUP_ID, user_id);
    history.push("/homepage");
  }

  useEffect(() => {
    getGroupScoreBoard();
  }, []);

  useEffect(() => {
    if (leave_failed) {
      history.push("/homepage");
    }
  }, [leave_failed]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage />
      ) : (
        <Container initial="hidden" animate="visible" variants={list}>
          <motion.div 
            custom={0} 
            variants={item} 
            style={{ alignSelf: "center" }}
          >
              <Header> สรุปผลคะแนน </Header>
          </motion.div>
          <Top3Container custom={1} variants={item}>
            {is_creator && (
              <div style={{display: "flex", position: "absolute", zIndex: 1, marginRight: "24px", right: 0}}>
                <CSVLink {...csvReport}>
                  <img 
                    style={{ width: "24px", marginTop: "24px" }} 
                    src={export_icon} 
                  />
                </CSVLink>
              </div>
            )}
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
                  <Subheader> {scoreboard[0].username} </Subheader>
                </motion.div>
                <motion.div custom={4} variants={item}>
                  <Subheader props color={COLOR.MANDARIN}>
                    {scoreboard[0].point}
                  </Subheader>
                </motion.div>
                <motion.div custom={5} variants={item}>
                  <Overline props color={COLOR.SILVER}>
                    {scoreboard[0].score} เต็ม {numboer_of_problem}
                  </Overline>
                </motion.div>
              </TrophyWithInfo>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <TrophyWithInfo position="relative" zIndex={2}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  custom={6}
                  variants={item}
                  onAnimationComplete={() => second_animation_success()}
                >
                  <LottieFile
                    animationData={silver}
                    width="80px"
                    height="80px"
                    loop={false}
                    isPaused={!display_second_lottie}
                    isStopped={!display_second_lottie}
                  />
                </motion.div>
                <motion.div custom={7} variants={item}>
                  <Body>{scoreboard[1].username}</Body>
                </motion.div>
                <motion.div custom={8} variants={item}>
                  <Body props color={COLOR.MANDARIN}>
                    {scoreboard[1].point}
                  </Body>
                </motion.div>
                <motion.div custom={9} variants={item}>
                  <Overline props color={COLOR.SILVER}>
                    {scoreboard[1].score} เต็ม {numboer_of_problem}
                  </Overline>
                </motion.div>
              </TrophyWithInfo>
              <TrophyWithInfo>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  custom={10}
                  variants={item}
                  onAnimationComplete={() => third_animation_success()}
                >
                  <LottieFile
                    animationData={bronze}
                    width="80px"
                    height="80px"
                    loop={false}
                    isPaused={!display_third_lottie}
                    isStopped={!display_third_lottie}
                  />
                </motion.div>
                <motion.div custom={11} variants={item}>
                  <Body>{scoreboard[2].username}</Body>
                </motion.div>
                <motion.div custom={12} variants={item}>
                  <Body props color={COLOR.MANDARIN}>
                    {scoreboard[2].point}
                  </Body>
                </motion.div>
                <motion.div custom={13} variants={item}>
                  <Overline props color={COLOR.SILVER}>
                    {scoreboard[2].score} เต็ม {numboer_of_problem}
                  </Overline>
                </motion.div>
              </TrophyWithInfo>
            </div>
          </Top3Container>
          <ResultContainer custom={14} variants={item}>
            {scoreboard.map((list, index) => index > 2 && (
              <InfoBox
                key={index}
                backgroundColor={index + 1 === user_index ? COLOR.ISLAND_SPICE : null}
              >
                <div style={{ marginRight: "12px" }}>
                  <Body> {index + 1} </Body>
                </div>
                <Body> {list.username} </Body>
                <PointText>
                  {(is_creator || index + 1 === user_index) && (
                    <div style={{ marginRight: "16px" }}>
                      <Body props color={COLOR.SILVER}>
                        {list.score} เต็ม {numboer_of_problem}
                      </Body>
                    </div>
                  )}
                  <Body props color={COLOR.MANDARIN}>
                    {list.point}
                  </Body>
                </PointText>
              </InfoBox>
            ))}
          </ResultContainer>
          {is_creator ? (
            <ButtonContainer
              justifyContent={
                screen_width >= LARGE_DEVICE_SIZE
                  ? "space-evenly"
                  : "space-between"
              }
              custom={15}
              variants={item}
            >
              <Button 
                type="outline"
                onClick ={() => handleDeleteGroup()}
              >
                ลบกลุ่ม
              </Button>
              <Button>เล่นใหม่อีกครั้ง</Button>
            </ButtonContainer>
          ) : (
            <motion.div
              custom={15}
              variants={item}
              style={{ alignSelf: "center" }}
            >
              <Button onClick ={() => handleLeaveGroup()}>ออก</Button>
            </motion.div>
          )}
        </Container>
      )}
    </React.Fragment>
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
  position: relative;
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
  max-height: 260px;
  overflow: scroll;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 16px;
  background-color: ${props => props.backgroundColor};
`;

const PointText = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export default withRouter(GroupResultPage);