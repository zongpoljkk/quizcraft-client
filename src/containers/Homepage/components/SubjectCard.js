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
  margin-top: 32px;
  display: block;
  justify-content: center;
  text-align: center;
`;

const SubjectBox = styled.div.attrs((props) => ({
  type: props.type,
}))`
  background-color: ${COLOR.ISLAND_SPICE};
  width: 350px;
  height: 108px;
  border-radius: 10px;
  margin-top: ${(props) => (props.type === "top" ? "0px" : "16px")};
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 3px ${subject_box_shadow};
  /* padding: 32px 24px 32px 24px; */
`;

const SubjectImg = styled.img`
  alt: "Subject Image";
  width: 60px;
  height: 60px;
  padding-right: 32px;
  padding-left: 32px;
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
