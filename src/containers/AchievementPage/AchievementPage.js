import React, { useEffect } from "react";
import styled from "styled-components";

// Pages
import LoadingPage from "../LoadingPage/LoadingPage";

// Components
import { Header } from "../../components/Typography";
import AllAchievements from "./components/AllAchievements";
import AchievementModal from "../../components/Achievement/AchievementModal";
import { Subheader, Body } from "../../components/Typography";
import { LottieFile } from "../../components/LottieFile";

// Helper
import { useGetAllAchievements } from "./AchievementPageHelper";

// Hook
import useModal from "../../components/useModal";

// Global
import { useWindowDimensions } from "../../global/utils";
import { COLOR, CONTAINER_PADDING, QUOTE } from "../../global/const";

// Lottie
import no_achievement from "../../assets/lottie/no_achievement.json";

const AchievementPage = ({ user_id }) => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const [isShowing, toggle] = useModal();

  const {
    getAllAchievements,
    achievements_loading,
    all_achievements,
    my_achievements,
  } = useGetAllAchievements(user_id);

  useEffect(() => {
    getAllAchievements();
    toggle();
  }, []);

  return (
    <React.Fragment>
      {achievements_loading ? (
        <LoadingPage />
      ) : (
        <Container>
          <AchievementModal
            isShowing={isShowing}
            toggle={toggle}
            content="Hello A"
          />
          <div style={{ marginBottom: "32px" }}>
            <Header>เหรียญรางวัล</Header>
          </div>
          {my_achievements.length > 0 ? (
            <AllAchievements achievements={my_achievements} />
          ) : (
            <NoAchievement>
              <LottieFile
                animationData={no_achievement}
                width={screen_width - CONTAINER_PADDING}
              />
              <Subheader color={COLOR.MANDARIN}>
                คุณยังไม่มีเหรียญรางวัล
              </Subheader>
              <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                <Body color={COLOR.MANDARIN}>
                  `{QUOTE[Math.floor(Math.random() * QUOTE.length)]}`
                </Body>
              </div>
            </NoAchievement>
          )}
        </Container>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const NoAchievement = styled.div`
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

export default AchievementPage;
