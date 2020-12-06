import React from "react";

// Components
import { Layout } from "./components/Layout";
import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";

const Homepage = () => {
  return (
    <Layout>
      <GroupPanel></GroupPanel>
      <SubjectCard></SubjectCard>
    </Layout>
  );
};

export default Homepage;
