import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";
import { Tabs } from "../../components/Leaderboard/Tabs";
import { ItemBox } from "../../components/ItemBox";
import { Header } from "../../components/Typography";

// MOCK DATA
const LEADER_BOARD = {
  byAll: [
    {
      _id: "123",
      username: "A1",
      levels: 22
    },
    {
      _id: "123",
      username: "A2",
      levels: 16
    },    {
      _id: "123",
      username: "A3",
      levels: 7
    },    {
      _id: "123",
      username: "A4",
      levels: 5
    },    {
      _id: "123",
      username: "A5",
      levels: 1
    }
  ],
  bySchool : [
    {
      _id: "123",
      username: "B1",
      levels: 22
    },
    {
      _id: "123",
      username: "B2",
      levels: 16
    },    {
      _id: "123",
      username: "B3",
      levels: 7
    },    {
      _id: "123",
      username: "B4",
      levels: 5
    },    {
      _id: "123",
      username: "B5",
      levels: 1
    }
  ],
  byClass : [
    {
      _id: "123",
      username: "C1",
      levels: 22
    },
    {
      _id: "123",
      username: "C2",
      levels: 16
    },    {
      _id: "123",
      username: "C3",
      levels: 7
    },    {
      _id: "123",
      username: "C4",
      levels: 5
    },    {
      _id: "123",
      username: "C5",
      levels: 1
    }
  ],
  indexGlobal: 5,
  indexSchool: 3,
  indexClass: 1
}

const Homepage = () => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  return (
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
          <Tabs data={LEADER_BOARD} />
        </ItemBox>
      </div>
    </Container>
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
