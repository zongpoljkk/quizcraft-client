import React from "react";
import styled from "styled-components";

// Components
import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";

const Homepage = () => {
  return (
    <Layout>
      <GroupPanel />
      <SubjectCard />
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

export default Homepage;
