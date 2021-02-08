import { useState } from "react";
import styled from "styled-components";

// Components
import { Subheader, Overline } from "../../../components/Typography";
import { LottieFile } from "../../../components/LottieFile";

// Global
import { COLOR } from "../../../global/const";
import { convertHexToRGBA } from "../../../global/utils";

const AllAchievements = ({ achievements }) => {
  const [achievement_display, set_achievement_display] = useState({});

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

  const all_achievements = achievements.map((achievement) => {
    return (
      <AchievementContainer key={achievement.name}>
        <AchievementImageContainer
          onMouseEnter={() => handleOnMouseEnter(achievement)}
          onMouseLeave={() => handleOnMouseLeave(achievement)}
        >
          <AchievementImageDiv>
            {achievement_display[achievement.name] ? (
              <LottieFile
                animationData={JSON.parse(atob(achievement.lottie_info.data))}
                loop={false}
                height={100}
              />
            ) : (
              <img
                src={"data:image/png;base64," + achievement.image_info.data}
                height={60}
                alt={`img-${achievement}`}
              />
            )}
          </AchievementImageDiv>
        </AchievementImageContainer>
        <AchievementTextContainer>
          <Subheader color={COLOR.CHARCOAL}>{achievement.name}</Subheader>
          <Overline color={COLOR.CHARCOAL}>{achievement.description}</Overline>
        </AchievementTextContainer>
      </AchievementContainer>
    );
  });

  return <div>{all_achievements}</div>;
};

const AchievementContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 8px;
  margin-bottom: 24px;
  background-color: ${convertHexToRGBA(COLOR.ISLAND_SPICE, 20)};
`;

const AchievementImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${convertHexToRGBA(COLOR.SILVER, 20)};
  border-radius: 50%;
`;

const AchievementImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
`;

const AchievementTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 10px 16px;
`;

export default AllAchievements;
