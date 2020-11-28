import React from "react";
import styled from "styled-components";

// Color
import { MANDARIN, ISLAND_SPICE, WHITE, CHARCOAL } from "../../global/const";

// Media
import math_logo from "../../assets/math_logo.png";
import eng_logo from "../../assets/english_logo.png";

const Homepage = () => {
  const Layout = styled.div``;

  const CreateGroupButton = styled.button`
    background-color: ${WHITE};
    text-align: center;
    font-family: Prompt;
    font-size: 3vw;
    color: ${MANDARIN};
    border: 1px solid ${MANDARIN};
    border-radius: 10px;
    width: 35vw;
    height: 5vh;
    padding: 10px;
    margin-left: 10vw;
    margin-right: 10vw;

    &:hover {
      background-color: ${MANDARIN};
      color: ${WHITE};
    }
  `;

  const JoinGroupButton = styled.button`
    background-color: ${WHITE};
    text-align: center;
    font-family: Prompt;
    font-size: 3vw;
    color: ${MANDARIN};
    border: 1px solid ${MANDARIN};
    border-radius: 10px;
    width: 35vw;
    height: 5vh;
    padding: 10px;
    margin-right: 10vw;

    &:hover {
      background-color: ${MANDARIN};
      color: ${WHITE};
    }
  `;

  const GroupDiv = styled.div`
    margin-top: 3vh;
    display: flex;
    justify-content: center;
    width: 100%;
  `;

  const SubjectDiv = styled.div`
    margin-top: 3vh;
    display: block;
    justify-content: center;
  `;

  const SubjectBox = styled.div`
    background-color: ${ISLAND_SPICE};
    width: 80%;
    height: 10vh;
    border-radius: 10px;
    padding: 10px;
    margin: 5vw auto;
    display: flex;
    justify-content: left;
  `;

  const MathSubjectImg = styled.img`
    alt: "Math Subject Image";
    height: 8vh;
    padding: 10px;
    margin-left: 5vw;
  `;

  const SubjectTitle = styled.p`
    font-family: Prompt;
    font-weight: 600;
    font-size: 6vw;
    color: ${CHARCOAL};
    margin-left: 3vw;
  `;

  const EngSubjectImg = styled.img`
    alt: "English Subject Image";
    height: 8vh;
    padding: 10px;
    margin-left: 5vw;
  `;

  return (
    <Layout>
      <GroupDiv>
        <CreateGroupButton>สร้างกลุ่ม</CreateGroupButton>
        <JoinGroupButton>เข้าร่วมกลุ่ม</JoinGroupButton>
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
