import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

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
      <ItemBox type="frame" shadow="frame" width={container_width-32}>
        <div style = {{marginBottom: "12px"}}>
          <Header>กระดานผู้นำ</Header>
        </div>
        <Tabs data={LEADER_BOARD} />
      </ItemBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
`;

/* const useStyles = makeStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      padding: 16,
      boxShadow: "0.25px 0.5px 2px #DADADA",
      borderRadius: 5
    },
    user: {
      display: "flex",
      flexDirection: "row",
    },
    img: {
      height: 36,
      width: 36,
      marginRight: 8
    },
    userDetail: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    icon: {
      height: 20,
      width: 20,
      color: "#7F817D",
      marginLeft: 8
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 16
    },
    divider: {
      marginTop: 16,
      marginBottom: 16
    },
    owner:{
      fontWeight: 500
    },
    time: {
      fontSize: 12,
      color: "#ADAFA9"
    },
    comment: {
      marginBottom: 8
    },
    edited: {
      fontSize: 10,
      color: "#ADAFA9",
      fontStyle: "italic",
      marginTop: 2
    }
  }); */

export default Homepage;
