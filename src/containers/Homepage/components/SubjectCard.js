import styled from "styled-components";

// Utils
import { convertHexToRGBA } from "../../../global/utils";

// Media
import math_logo from "../../../assets/math_logo.png";
import eng_logo from "../../../assets/english_logo.png";

// Global
import { COLOR } from "../../../global/const";
import { Header } from "../../../components/Typography";

const subject_box_shadow = convertHexToRGBA(`${COLOR.BLACK}`, 25);

const SubjectDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
  text-align: center;
`;

const SubjectBox = styled.div.attrs((props) => ({
  type: props.type,
}))`
  display: flex;
  align-items: center;
  background-color: ${COLOR.ISLAND_SPICE};
  border-radius: 10px;
  box-shadow: 0px 1px 3px ${subject_box_shadow};
  padding: 24px 32px 24px 32px;
  margin-bottom: 16px;
`;

const SubjectImg = styled.img`
  alt: "Subject Image";
  width: 60px;
  height: 60px;
  margin-right: 32px;
`;

const SubjectCard = () => {
  return (
    <SubjectDiv>
      <SubjectBox>
        <SubjectImg src={math_logo} />
        <Header>คณิตศาสตร์</Header>
      </SubjectBox>
      <SubjectBox>
        <SubjectImg src={eng_logo} />
        <Header>ภาษาอังกฤษ</Header>
      </SubjectBox>
    </SubjectDiv>
  );
};

export default SubjectCard;
