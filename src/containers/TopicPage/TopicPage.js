import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import TopicBox from "./components/TopicBox";
import LoadingPage from "../LoadingPage/LoadingPage";

import { useGetTopicName } from "./TopicPageHelper";

// TODO: Remove mock after integrate subject
const MOCK_SUBJECT = "คณิตศาสตร์";

const TopicPage = ({ history, token }) => {

  const location = useLocation();
  // const { getTopicName, loading, topics } = useGetTopicName(location.state.subject_name);
  const { getTopicName, loading, topics } = useGetTopicName(MOCK_SUBJECT, token);

  const handleClick = (topic_name) => {
    history.push({
      pathname: "/" + MOCK_SUBJECT + "/" + topic_name, 
      state: {
        subject_name: MOCK_SUBJECT,
        topic_name: topic_name
      }
    });
  };

  useEffect(() => {
    getTopicName();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage/>
      ) : (
        <Container>
          {topics?.map((topic, index) => (
            <TopicBox 
              key={index}  
              title={topic.topic_name} 
              image={topic.topic_image} 
              onClick={() => handleClick(topic.topic_name)}
            />
          ))}
        </Container>
      )}
    </React.Fragment>
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

export default withRouter(TopicPage);
