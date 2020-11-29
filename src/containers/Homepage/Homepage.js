import React from "react";
import styled from "styled-components";

// Color
import {
  MANDARIN,
  ISLAND_SPICE,
  WHITE,
  CHARCOAL,
  BLACK,
} from "../../global/const";

// Media
import math_logo from "../../assets/math_logo.png";
import eng_logo from "../../assets/english_logo.png";

// Components
import { Button } from "../../components/Button/Button";

// Helper
import { convertHexToRGBA } from "../../global/utils";

const Homepage = () => {
  const Layout = styled.div``;

  const GroupDiv = styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: center;
    width: 100%;
  `;

  const CreateGroupButton = styled(Button)`
    background-color: ${WHITE};
    color: ${MANDARIN};
    border: 1px solid ${MANDARIN};
    margin-right: 30px;

    &:hover {
      background-color: ${MANDARIN};
      color: ${WHITE};
      width: 40vw;
      height: 6vh;
    }
  `;

  const JoinGroupButton = styled(Button)`
    background-color: ${WHITE};
    color: ${MANDARIN};
    border: 1px solid ${MANDARIN};

    &:hover {
      background-color: ${MANDARIN};
      color: ${WHITE};
      width: 40vw;
      height: 6vh;
    }
  `;

  const SubjectDiv = styled.div`
    margin-top: 32px;
    display: block;
    justify-content: center;
    text-align: center;
  `;

  const subject_box_shadow = convertHexToRGBA(`${BLACK}`, 25);

  const SubjectBox = styled.div`
    background-color: ${ISLAND_SPICE};
    width: 350px;
    height: 108px;
    border-radius: 10px;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: left;
    box-shadow: 0px 1px 3px ${subject_box_shadow};
  `;

  const MathSubjectImg = styled.img`
    alt: "Math Subject Image";
    width: 60px;
    height: 60px;
    margin: 24px 32px 24px 32px;
  `;

  const SubjectTitle = styled.p`
    font-family: Prompt;
    font-weight: 600;
    font-size: 24px;
    line-height: 1.2em;
    color: ${CHARCOAL};
    margin: 40px 95px 40px 0px;
  `;

  const EngSubjectImg = styled.img`
    alt: "English Subject Image";
    width: 60px;
    height: 60px;
    margin: 24px 32px 24px 32px;
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
