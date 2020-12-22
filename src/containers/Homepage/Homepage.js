import React from "react";
import styled from "styled-components";

// Components
import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";

const Homepage = () => {
  return (
    <Layout>
      <GroupPanel />
      <ScrollView>
        <SubjectCard />
      </ScrollView>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex: 1;
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
