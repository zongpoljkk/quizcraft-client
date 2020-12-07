import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { Header } from "../../components/Typography";
import SubtopicBox from "./components/SubtopicBox";
import { useGetsubTopicName } from "./SubtopicPageHelper";

const SubtopicPage = ({ }) => {
  const location = useLocation();
  const { getSubtopicName, loading, subtopics } = useGetsubTopicName(location.state.topic_name);

  useEffect(() => {
    getSubtopicName();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div>loading</div>
      ) : (
        <Container>
          <TopicStyle>
            <Header> {location.state.topic_name} </Header>
          </TopicStyle>
          {subtopics?.map((subtopic, index) => (
            <SubtopicBox 
              key={index}
              id={subtopic.subtopic_id}
              title={subtopic.subtopic_name}
            />
          ))}
        </Container>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TopicStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

export default SubtopicPage;
