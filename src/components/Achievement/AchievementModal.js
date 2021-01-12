import styled from "styled-components";
import { motion } from "framer-motion";

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

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const AchievementModal = ({
  isShowing,
  toggle,
  content,
  onSubmit = () => {},
}) => {
  console.log(content);
  return (
    <div>
      <Modal isShowing={isShowing} hide={toggle}>
        <Container>
          <HeaderContainer>
            <Header color={COLOR.CHARCOAL}>ยินดีด้วย!</Header>
            <Body color={COLOR.SILVER}>{`คุณทำ${content.description}`}</Body>
          </HeaderContainer>
          <AchievementLottieDiv>
            <LottieFile
              animationData={CoinData}
              loop={false}
              height={100}
              resizeMode="cover"
            />
          </AchievementLottieDiv>
          <div style={{ marginBottom: "4px" }}>
            <Body color={COLOR.CHARCOAL}>{content.name}</Body>
          </div>
          <RewardDiv
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 2 }}
          >
            <Overline color={COLOR.MANDARIN}>
              +{content.rewardCoin} XP +{content.rewardEXP} coins
            </Overline>
          </RewardDiv>
          <ButtonContainer
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 3 }}
          >
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

const AchievementLottieDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
`;

const RewardDiv = styled(motion.div)`
  margin-bottom: 16px;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
`;

export default AchievementModal;
