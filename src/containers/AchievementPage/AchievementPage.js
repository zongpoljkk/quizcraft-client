import React, { useEffect } from "react";
import styled from "styled-components";

// Pages
import LoadingPage from "../LoadingPage/LoadingPage";

// Components
import { Header } from "../../components/Typography";
import AllAchievements from "./components/AllAchievements";

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

  return (
    <React.Fragment>
      {achievements_loading ? (
        <LoadingPage />
      ) : (
        <Container>
          <Header>ความสำเร็จ</Header>
          <AllAchievements achievements={all_achievements} />
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

export default AchievementPage;
