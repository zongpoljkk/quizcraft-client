import styled from "styled-components";

// Components
import { Subheader, Overline } from "../../../components/Typography";
import { COLOR } from "../../../global/const";
import { convertHexToRGBA } from "../../../global/utils";

// Media
import BronzeImg from "../../../assets/icon/bronze.png";

const AllAchievements = ({ achievements }) => {
  console.log(achievements);
  const all_achievements = achievements.map((achievement) => {
    return (
      <AchievementContainer key={achievement.name}>
        <AchievementImageContainer>
          <AchievementImageDiv>
            <img
              src={"data:image/png;base64," + achievement.image_info.data}
              alt="test"
              width={60}
              height={60}
            />
          </AchievementImageDiv>
        </AchievementImageContainer>
        <AchievementTextContainer>
          <Subheader color={COLOR.CHARCOAL}>{achievement.name}</Subheader>
          <Overline color={COLOR.CHARCOAL}>{achievement.description}</Overline>
        </AchievementTextContainer>
      </AchievementContainer>
    );
  });
  console.log(all_achievements);

  return <div>{all_achievements};</div>;
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
