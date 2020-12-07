import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Components
import SubjectCard from "./components/SubjectCard";
import GroupPanel from "./components/GroupPanel";

// Axios
import { getSubjects } from "./HomepageHelper";

const Homepage = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects().then((subjects) => {
      setSubjects(subjects);
      console.log(subjects);
    });
  }, []);
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
