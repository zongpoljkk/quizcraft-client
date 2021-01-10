import styled from "styled-components";
import { useHistory } from "react-router";

import { ItemBox } from "../../../components/ItemBox";
import { Header } from "../../../components/Typography";

// Image
import MoreData from "../../../assets/icon/more.png";

// global
import { COLOR } from "../../../global/const";

const HOMEPAGE_ACHIEVEMENTS_NUMBER = 8;

const AchievementPanel = ({ container_width, achievements }) => {
  const history = useHistory();
  let limited_achievements = achievements;

  if (achievements.length >= HOMEPAGE_ACHIEVEMENTS_NUMBER) {
    limited_achievements = achievements.slice(0, HOMEPAGE_ACHIEVEMENTS_NUMBER);
  }
  limited_achievements = [...limited_achievements, { name: "ENTRY" }];
  console.log(limited_achievements);

  const handleOnclick = (history) => {
    history.push({
      pathname: "/achievement",
    });
  };

  const testResp = limited_achievements.map((achievement) => {
    return (
      <Achievement key={achievement.name}>
        <AchievementImg>
          <img
            src={
              achievement.name !== "ENTRY"
                ? "data:image/png;base64," + achievement.image_info.data
                : MoreData
            }
            height={40}
            alt={`img-${achievement}`}
            onClick={
              achievement.name === "ENTRY"
                ? () => handleOnclick(history)
                : () => {}
            }
          />
        </AchievementImg>
      </Achievement>
    );
  });

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
  margin: 16px auto;
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
