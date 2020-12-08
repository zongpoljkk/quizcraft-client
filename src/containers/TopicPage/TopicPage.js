import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import TopicBox from "./components/TopicBox";

import { useGetTopicName } from "./TopicPageHelper";

// TODO: Remove mock after integrate subject
// const MOCK_SUBJECT = "คณิตศาสตร์";

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
    console.log(location);
    getTopicName();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div>loading</div>
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
