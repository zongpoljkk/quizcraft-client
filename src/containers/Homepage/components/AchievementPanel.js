import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import { ItemBox } from "../../../components/ItemBox";
import { Header } from "../../../components/Typography";
import { LottieFile } from "../../../components/LottieFile";

// Image
import MoreData from "../../../assets/icon/more.png";

// Lottie

// global
import { COLOR } from "../../../global/const";

const HOMEPAGE_ACHIEVEMENTS_NUMBER = 8;

const AchievementPanel = ({ container_width, achievements }) => {
  const [panel_achievements, set_panel_achievements] = useState([]);
  const [achievement_display, set_achievement_display] = useState({});

  const history = useHistory();
  let limited_achievements = panel_achievements;

  // Limit number of achievements shown on the homepage
  if (panel_achievements.length >= HOMEPAGE_ACHIEVEMENTS_NUMBER) {
    limited_achievements = achievements.slice(0, HOMEPAGE_ACHIEVEMENTS_NUMBER);
  }
  // Add entry to achievements page
  limited_achievements = [...limited_achievements, { name: "ENTRY" }];

  const handleOnclick = (history) => {
    history.push({
      pathname: "/achievement",
    });
  };

  const handleOnMouseEnter = (achievement) => {
    set_achievement_display((achievement_display) => {
      return {
        ...achievement_display,
        [achievement.name]: true,
      };
    });
  };

  const handleOnMouseLeave = (achievement) => {
    set_achievement_display((achievement_display) => {
      return {
        ...achievement_display,
        [achievement.name]: false,
      };
    });
  };

  const testResp = limited_achievements.map((achievement) => {
    return (
      <Achievement key={achievement.name}>
        <AchievementImg
          onClick={
            achievement.name === "ENTRY"
              ? () => handleOnclick(history)
              : () => {}
          }
          onMouseEnter={() =>
            achievement.name !== "ENTRY"
              ? handleOnMouseEnter(achievement)
              : () => {
                  console.log("...");
                }
          }
          onMouseLeave={() =>
            achievement.name !== "ENTRY"
              ? handleOnMouseLeave(achievement)
              : () => {
                  console.log("...");
                }
          }
        >
          {achievement_display[achievement.name] ? (
            <LottieFile
              animationData={
                achievement.name !== "ENTRY"
                  ? JSON.parse(atob(achievement.lottie_info.data))
                  : null
              }
              loop={false}
              height={100}
            />
          ) : (
            <img
              src={
                achievement.name !== "ENTRY"
                  ? "data:image/png;base64," + achievement.image_info.data
                  : MoreData
              }
              height={40}
              alt={`img-${achievement}`}
            />
          )}
        </AchievementImg>
      </Achievement>
    );
  });

  useEffect(() => {
    if (achievements) {
      set_panel_achievements(achievements)
    }
  }, [achievements])

  return (
    <ItemBox type="frame" shadow="frame" width={container_width - 32}>
      <Header>ความสำเร็จ</Header>
      <AchievementsBox>{testResp}</AchievementsBox>
    </ItemBox>
  );
};

const AchievementsBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
  overflow-x: scroll;
`;

const Achievement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: ${COLOR.GOLDEN_TAINOI};
  margin-right: 16px;
`;

const AchievementImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
`;

export default AchievementPanel;
