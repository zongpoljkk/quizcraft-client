import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";

import TopicBox from "./components/TopicBox";
import LoadingPage from "../LoadingPage/LoadingPage";

import { useGetTopicName } from "./TopicPageHelper";

const TopicPage = ({ history }) => {
  const location = useLocation();
  const { getTopicName, loading, topics } = useGetTopicName(
    location.state.subject_name
  );

  const handleClick = (topic_name) => {
    history.push({
      pathname: "/" + location.state.subject_name + "/" + topic_name,
      state: {
        subject_name: location.state.subject_name,
        topic_name: topic_name,
      },
    });
  };

  useEffect(() => {
    getTopicName();
  }, []);

  useEffect(() => {
    console.log(`useEffect subtopics`);
    console.log(topics);
  }, [topics]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage />
      ) : (
        <Container>
          {topics?.map((topic, index) => (
            <TopicBox
              key={index}
              title={topic._id}
              image= {"data:image/png;base64,"+topic.topic_image_info.data}
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
