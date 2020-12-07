import styled from "styled-components";

// Utils
import { convertHexToRGBA } from "../../../global/utils";
import { getSubjects } from "../HomepageHelper";

// Media
import math_logo from "../../../assets/math_logo.png";
import eng_logo from "../../../assets/english_logo.png";

// Global
import { COLOR } from "../../../global/const";
import { Header } from "../../../components/Typography";

const subject_box_shadow = convertHexToRGBA(`${COLOR.BLACK}`, 25);

const SubjectCard = () => {
  return (
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
  );
};

const SubjectDiv = styled.div`
  margin-top: 32px;
  display: block;
  justify-content: center;
  text-align: center;
`;

const SubjectBox = styled.div`
  background-color: ${COLOR.ISLAND_SPICE};
  width: 350px;
  height: 108px;
  border-radius: 10px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: left;
  align-items: center;
  box-shadow: 0px 1px 3px ${subject_box_shadow};
`;

const MathSubjectImg = styled.img`
  alt: "Math Subject Image";
  width: 60px;
  height: 60px;
  margin: 24px 32px 24px 32px;
`;

const EngSubjectImg = styled.img`
  alt: "English Subject Image";
  width: 60px;
  height: 60px;
  margin: 24px 32px 24px 32px;
`;

const SubjectTitle = styled(Header)`
  line-height: 1.2em;
  /* margin: 35px 95px 40px 0px; */
`;

export default SubjectCard;
