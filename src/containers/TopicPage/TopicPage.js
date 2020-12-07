import React, { useEffect } from "react";
import styled from "styled-components";
import TopicBox from "./components/TopicBox";

import { useGetTopicName } from "./TopicPageHelper";

// TODO: Remove mock after integrate subject
const MOCK_SUBJECT = "คณิตศาสตร์";

const TopicPage = ({ subject_name = MOCK_SUBJECT }) => {
  const { getTopicName, loading, topics } = useGetTopicName(subject_name);

  useEffect(() => {
    getTopicName();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div>loading</div>
      ) : (
        <Container>
          {topics.map((topic, index) => (
            <TopicBox key={index} title={topic} />
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

export default TopicPage;
