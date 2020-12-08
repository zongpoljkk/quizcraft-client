import { useEffect, useState } from "react";
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
import { useHistory, useLocation } from "react-router-dom";

const subject_box_shadow = convertHexToRGBA(`${COLOR.BLACK}`, 25);

const SubjectCard = () => {
  let history = useHistory();

  const [subjects, setSubjects] = useState([]);

  const returnImg = (subject) => {
    switch (subject) {
      case "คณิตศาสตร์":
        return math_logo;
      case "อังกฤษ":
        return eng_logo;
      default:
        return math_logo;
    }
  };

  const handleOnSubjectClick = (subject_name) => {
    history.push(`${subject_name}`)
  };

  useEffect(() => {
    getSubjects().then((subjects) => {
      setSubjects(subjects.data);
      console.log(subjects.data);
    });
  }, []);
  return (
    <SubjectDiv>
      {subjects.map((subject) => {
        return (
          <SubjectBox
            key={subject._id}
            onClick={() => {
              handleOnSubjectClick(subject._id);
            }}
          >
            <SubjectImg src={subject.subjectImg} />
            <Header>{subject._id}</Header>
          </SubjectBox>
        );
      })}
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
  align-items: center;
  box-shadow: 0px 1px 3px ${subject_box_shadow};
`;

const SubjectImg = styled.img`
  alt: "Subject Image";
  width: 60px;
  height: 60px;
  padding-left: 32px;
  padding-right: 32px;
`;

export default SubjectCard;
