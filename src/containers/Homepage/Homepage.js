import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";
import { Tabs } from "../../components/Leaderboard/Tabs";
import { ItemBox } from "../../components/ItemBox";
import { Header } from "../../components/Typography";
import LoadingPage from "../LoadingPage/LoadingPage";

import { useGetLeaderBoard } from "./HomepageHelper";

const Homepage = ({ user_id }) => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const { getLeaderBoard, loading, leader_board } = useGetLeaderBoard(user_id);

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  useEffect(() => {
    getLeaderBoard()
  }, [leader_board]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage/>
      ) : (
        <Container ref={ref}>
          <GroupPanel />
          <ScrollView>
            <SubjectCard />
          </ScrollView>
          <div style = {{marginTop: 28, width: "100%"}}>
            <ItemBox type="frame" shadow="frame" width={container_width-32}>
              <div style = {{marginBottom: "12px"}}>
                <Header>กระดานผู้นำ</Header>
              </div>
              {/* <Tabs data={LEADER_BOARD} /> */}
              <Tabs data={leader_board} />
            </ItemBox>
          </div>
        </Container>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  width: 100%;
  max-height: 240px;
  overflow: scroll;
  margin-top: 32px;
`;

export default Homepage;