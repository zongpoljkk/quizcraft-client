import React from "react";

// Media
import math_logo from "../../assets/math_logo.png";
import eng_logo from "../../assets/english_logo.png";

// Components
import { Layout } from "./components/Layout";
import { GroupDiv } from "./components/GroupDiv";
import { CreateGroupButton } from "./components/CreateGroupButton";
import { JoinGroupButton } from "./components/JoinGroupButton";
import { SubjectDiv } from "./components/SubjectDiv";
import { SubjectBox } from "./components/SubjectBox";
import { MathSubjectImg, EngSubjectImg } from "./components/SubjectImg";
import { SubjectTitle } from "./components/SubjectTitle";

// Helper

const Homepage = () => {
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
