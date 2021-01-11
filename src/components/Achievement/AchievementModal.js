import styled from "styled-components";

// Components
import { Modal } from "../Modal";
import { Header, Body, Overline } from "../Typography";
import { Button } from "../Button";

// Media
import CoinImg from "../../assets/icon/coin.png";
import CoinData from "../../assets/lottie/coin.json";

// Global
import { COLOR } from "../../global/const";
import { LottieFile } from "../LottieFile";

const AchievementModal = ({
  isShowing,
  toggle,
  content,
  onSubmit = () => {},
}) => {
  return (
    <div>
      <Modal isShowing={isShowing} hide={toggle}>
        <Container>
          <HeaderContainer>
            <Header color={COLOR.CHARCOAL}>ยินดีด้วย!</Header>
            <Body color={COLOR.SILVER}>{`คุณทำบลาบลาบลา`}</Body>
          </HeaderContainer>
          <AchievementImageDiv>
            {/* <img src={CoinImg} width={60} /> */}
            <LottieFile animationData={CoinData} loop={false} height={100} />
          </AchievementImageDiv>
          <div style={{ marginBottom: "4px" }}>
            <Body color={COLOR.CHARCOAL}>นักแก้โจทย์ดึงตัวร่วมปรมาจารย์</Body>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <Overline color={COLOR.MANDARIN}>+20 XP +20 coins</Overline>
          </div>
          <ButtonContainer>
            <Button onClick={toggle}>ยืนยัน</Button>
          </ButtonContainer>
        </Container>
      </Modal>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

const AchievementImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AchievementModal;
