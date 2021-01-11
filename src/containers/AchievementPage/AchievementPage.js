import styled from "styled-components";

// Components
import { Header, Subheader, Overline, Body } from "../../components/Typography";
import { COLOR } from "../../global/const";
import { convertHexToRGBA } from "../../global/utils";

// Media
import BronzeImg from "../../assets/icon/bronze.png";
import ChevronImg from "../../assets/icon/chevron.png";
import CloseImg from "../../assets/icon/close.png";

const AchievementPage = () => {
  return (
    <Container>
      <Header>ความสำเร็จ</Header>
      <AchievementContainer>
        <AchievementImageContainer>sadas</AchievementImageContainer>
        sdas
      </AchievementContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

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
  width: 80px;
  height: 80px;
  background-color: ${COLOR.SILVER};
  border-radius: 50%;
`;

export default AchievementPage;
