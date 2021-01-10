import { useEffect } from "react";
import styled from "styled-components";

import { ItemBox } from "../../../components/ItemBox";
import { Header } from "../../../components/Typography";

// Image
import BronzeImg from "../../../assets/icon/bronze.png";
import ChevronImg from "../../../assets/icon/chevron.png";

// Lottie
import CoinData from "../../../assets/lottie/coin.json";

// global
import { COLOR } from "../../../global/const";

const MOCK_ACHIEVEMENTS = [
  {
    image: BronzeImg,
    lottie: CoinData,
  },
  {
    image: ChevronImg,
    lottie: CoinData,
  },
];

var foo = Array.from(Array(10).keys());

const AchievementPanel = ({ container_width, achievements }) => {
  const test = foo.map((n) => {
    return (
      <Achievement key={n}>
        <AchievementImg>
          <img src={MOCK_ACHIEVEMENTS[1].image} height={40} alt={`img-${n}`} />
        </AchievementImg>
      </Achievement>
    );
  });

  const testResp = achievements.map((achievement) => {
    return (
      <Achievement key={achievement.name}>
        <AchievementImg>
          <img
            //  src= {"data:image/png;base64,"+item.src}
            src={"data:image/png;base64," + achievement.image_info.data}
            height={40}
            alt={`img-${achievement}`}
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
