import React, { useEffect } from "react";
import styled from "styled-components";

// Pages
import LoadingPage from "../LoadingPage/LoadingPage";

// Components
import { Header, Subheader, Overline } from "../../components/Typography";
import { COLOR } from "../../global/const";
import { convertHexToRGBA } from "../../global/utils";
import AllAchievements from "./components/AllAchievements";

// Media
import BronzeImg from "../../assets/icon/bronze.png";
import ChevronImg from "../../assets/icon/chevron.png";
import CloseImg from "../../assets/icon/close.png";

// Helper
import { useGetAllAchievements } from "./AchievementPageHelper";

const AchievementPage = ({ user_id }) => {
  const {
    getAllAchievements,
    achievements_loading,
    all_achievements,
  } = useGetAllAchievements(user_id);

  useEffect(() => {
    getAllAchievements();
  }, []);

  // useEffect(() => {
  //   const all_achievements_component = all_achievements.map((achievement) => {
  //     return (
  //       <AchievementContainer>
  //         <AchievementImageContainer>
  //           <AchievementImageDiv>
  //             <img src={BronzeImg} alt="test" width={60} height={60} />
  //           </AchievementImageDiv>
  //         </AchievementImageContainer>
  //         <AchievementTextContainer>
  //           <Subheader color={COLOR.CHARCOAL}>THE FLASH</Subheader>
  //           <Overline color={COLOR.CHARCOAL}>
  //             Hey sup, yo yo yo, 148 to the three to the six to the nine,
  //             representing from ABQ, what up, Biatch, leave it at the tone!
  //           </Overline>
  //         </AchievementTextContainer>
  //       </AchievementContainer>
  //     );
  //   });
  //   console.log(all_achievements_component);
  // }, [all_achievements]);

  return (
    <React.Fragment>
      {achievements_loading ? (
        <LoadingPage />
      ) : (
        <Container>
          <Header>ความสำเร็จ</Header>
          <AllAchievements achievements={all_achievements} />
          {/* {all_achievements_component} */}
          {/* <AchievementContainer>
          <AchievementImageContainer>
            <AchievementImageDiv>
              <img src={BronzeImg} alt="test" width={60} height={60} />
            </AchievementImageDiv>
          </AchievementImageContainer>
          <AchievementTextContainer>
            <Subheader color={COLOR.CHARCOAL}>THE FLASH</Subheader>
            <Overline color={COLOR.CHARCOAL}>
              Hey sup, yo yo yo, 148 to the three to the six to the nine,
              representing from ABQ, what up, Biatch, leave it at the tone!
            </Overline>
          </AchievementTextContainer>
        </AchievementContainer> */}
        </Container>
      )}
    </React.Fragment>
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

export default AchievementPage;
