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

const MOCK_ACHIEVEMENTS_DATA = [
  {
    image: BronzeImg,
    lottie: CoinData,
  },
  {
    image: ChevronImg,
    lottie: CoinData,
  },
];

const HOMEPAGE_ACHIEVEMENTS_NUMBER = 8;

var foo = Array.from(Array(12).keys());

const AchievementPanel = (props) => {
  const entry = foo.slice(0, HOMEPAGE_ACHIEVEMENTS_NUMBER);
  entry.push("ENTRY");

  const mock_achievements = entry.map((n) => {
    return (
      <Achievement key={n}>
        <AchievementImg>
          <img
            src={
              n === "ENTRY"
                ? MOCK_ACHIEVEMENTS_DATA[0].image
                : MOCK_ACHIEVEMENTS_DATA[1].image
            }
            height={40}
            alt={`img-${n}`}
          />
        </AchievementImg>
      </Achievement>
    );
  });

  return (
    <ItemBox type="frame" shadow="frame" width={props.container_width - 32}>
      <Header>ความสำเร็จ</Header>
      <AchievementsBox>{mock_achievements}</AchievementsBox>
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
