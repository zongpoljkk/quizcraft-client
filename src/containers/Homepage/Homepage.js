import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";
import { Tabs } from "../../components/Leaderboard/Tabs";
import { ItemBox } from "../../components/ItemBox";
import { Header } from "../../components/Typography";
import LoadingPage from "../LoadingPage/LoadingPage";

import { useGetSubjects, useGetLeaderBoard } from "./HomepageHelper";

//--------------------------test-server-sent-event----------------------//
import { useServerSentEvent, useNextProblem, useGetGroupGame } from "./HomepageHelper";
//---------------------------------------------------------------------//

const Homepage = ({ history, user_id }) => {
  const ref = useRef(null);
  const [container_width, set_container_width] = useState();
  const { getSubjects, subjects_loading, subjects } = useGetSubjects();
  const {
    getLeaderBoard,
    leader_board_loading,
    leader_board,
  } = useGetLeaderBoard(user_id);
  
  //--------------------------test-server-sent-event----------------------//
  const token = localStorage.getItem("token");
  const groupId = "600ef0055760e624288d02ec";
  const { 
    listening, 
    subscribe, 
    status_message, 
    next_problem, 
    update_member,
    start_game,
    send_answer, 
  } = useServerSentEvent(groupId,token);
  const { current_problem_index, nextProblem } = useNextProblem(groupId); 
  const {
    getGroupGame,
    loading,
    current_index,
    number_of_problem,
    time_per_problem,
    user,
    problem
  } = useGetGroupGame(user_id, groupId);
//---------------------------------------------------------------------//

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  useEffect(() => {
    getLeaderBoard();
    getSubjects();
  }, []);
  
//--------------------------test-server-sent-event----------------------//
  useEffect(() => {
    //do something may be request backend
    //example
    getGroupGame();
  }, [next_problem]);
//---------------------------------------------------------------------//

  return (
    <React.Fragment>
      {leader_board_loading || subjects_loading ? (
        <LoadingPage />
      ) : (
        <Container ref={ref}>
          <GroupPanel
            onCreateGroupClick={() => { history.push("create-group"); }}
            onJoinGroupClick={() => { history.push("join-group"); }}
          />
          <ScrollView>
            <SubjectCard subjects_data={subjects} />
          </ScrollView>
          <div style={{ marginTop: 28, width: "100%" }}>
            <ItemBox type="frame" shadow="frame" width={container_width - 32}>
              <div style={{ marginBottom: "12px" }}>
                <Header>กระดานผู้นำ</Header>
              </div>
              <Tabs data={leader_board} />
            </ItemBox>
          </div>

          {
            //--------------------------test-server-sent-event----------------------//
          }
        <div>
          <p>{listening ? status_message.subscribed : status_message.unsubscribed}</p>
          <button onClick={subscribe}>
            {listening ? status_message.unsubscribed : status_message.subscribed}
          </button>
          <button onClick={nextProblem}> Next Problem
          </button>
          <p>current_problem_index form nextProblem(): {current_problem_index}</p>
          <p>next_problem_message: {next_problem}</p>
          <p>current_index from getGroupGame(): {current_index}</p>
        </div>
          {
            //---------------------------------------------------------------------//
          }

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

export default withRouter(Homepage);
