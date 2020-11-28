import React from "react";
import styled from "styled-components";

// Color
import { MANDARIN, ISLAND_SPICE } from "../../global/const";

const Homepage = () => {
  const Layout = styled.div``;

  const GroupButton = styled.button`
    background-color: white;
    text-align: center;
    font-size: 3vw;
    color: ${MANDARIN};
    border: 1px solid ${MANDARIN};
    border-radius: 10px;
    width: 40%;
    height: 50px;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;

    &:hover {
      background-color: ${MANDARIN};
      color: white;
    }
  `;

  const GroupDiv = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
  `;

  const SubjectDiv = styled.div`
    margin-top: 30px;
    display: block;
    justify-content: center;
  `;

  const SubjectBox = styled.div`
    background-color: ${ISLAND_SPICE};
    width: 80%;

    padding: 10px;
    margin: 10px auto;
    `;

  return (
    <Layout>
      <GroupDiv>
        <GroupButton>สร้างกลุ่ม</GroupButton>
        <GroupButton>เข้าร่วมกลุ่ม</GroupButton>
      </GroupDiv>
      <SubjectDiv>
        <SubjectBox />
        <SubjectBox />
      </SubjectDiv>
    </Layout>
  );
};

export default Homepage;
