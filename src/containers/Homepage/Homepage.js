import React from "react";
import styled from "styled-components";

// Color
import { MANDARIN, ISLAND_SPICE } from "../../global/const";

// Media
import math_logo from "../../resources/Homepage/math_logo.png";
import eng_logo from "../../resources/Homepage/english_logo.png";

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
    height: 60px;
    border-radius: 10px;
    padding: 10px;
    margin: 10px auto;
    display: flex;
    justify-content: left;
  `;

  const MathSubjectImg = styled.img`
    alt: "Math Subject Image";
    height: 50px;
    padding: 10px;
    margin-left: 30px;
  `;

  const SubjectTitle = styled.p`
    font-family: Prompt;
    font-weight: 600;
    font-size: 6vw;
    color: #4a4a4a;
    margin-left: 30px;

  `;

  const EngSubjectImg = styled.img`
    alt: "English Subject Image";
    height: 50px;
    padding: 10px;
    margin-left: 30px;
  `;

  return (
    <Layout>
      <GroupDiv>
        <GroupButton>สร้างกลุ่ม</GroupButton>
        <GroupButton>เข้าร่วมกลุ่ม</GroupButton>
      </GroupDiv>
      <SubjectDiv>
        <SubjectBox>
          <MathSubjectImg src={math_logo} />
          <SubjectTitle>คณิตศาสตร์</SubjectTitle>
        </SubjectBox>
        <SubjectBox>
          <EngSubjectImg src={eng_logo} />
          <SubjectTitle>ภาษาอังกฤษ</SubjectTitle>
        </SubjectBox>
      </SubjectDiv>
    </Layout>
  );
};

export default Homepage;
