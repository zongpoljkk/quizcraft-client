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
import { useHistory, useLocation, withRouter } from "react-router-dom";

const subject_box_shadow = convertHexToRGBA(`${COLOR.BLACK}`, 25);

const SubjectCard = ({ history }) => {
  // let history = useHistory();
  let location = useLocation();

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
    history.push({
      pathname: "/" + subject_name,
      state: {
        subject_name: subject_name,
      },
    });
    // location.pushState()
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

export default withRouter(SubjectCard);
