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

const AchievementPanel = (props) => {
  const test = foo.map((n) => {
    return (
      <Achievement>
        <AchievementImg>
          <img src={MOCK_ACHIEVEMENTS[1].image} height={40} />
        </AchievementImg>
      </Achievement>
    );
  });

  return (
    <ItemBox type="frame" shadow="frame" width={props.container_width - 32}>
      <Header>ความสำเร็จ</Header>
      <AchievementsBox>{test}</AchievementsBox>
    </ItemBox>
  );
};

const AchievementsBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin: 12px auto;
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
