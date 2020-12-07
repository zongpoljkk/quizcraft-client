import React, { useState } from "react";
import styled from "styled-components";
import TopicBox from "./components/TopicBox";

const TopicPage = () => {
  const [topicList, setTopicList] = useState({ list: [] });
  return (
    <Container>
      <TopicBox></TopicBox>
      <TopicBox></TopicBox>
      <TopicBox></TopicBox>

      {/* TODO: loop all topic from selected subject from Homepage
      {topicList.list.map((allTopic, index) =>(
        <Topic key = {index} data = {allTopic} />
      ))} */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  flex: 1;
  @media screen and (min-width: 411px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 410px) {
    justify-content: space-around;
  }
`;

export default TopicPage;
