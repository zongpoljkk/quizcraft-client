import { React, useEffect, useState } from "react";
import styled from "styled-components";

// Utils
import { convertHexToRGBA } from "../../../global/utils";
import { useGetSubjects } from "../HomepageHelper";

// Components
import LoadingPage from "../../LoadingPage/LoadingPage";

// Global
import { COLOR } from "../../../global/const";
import { Header } from "../../../components/Typography";
import { withRouter } from "react-router-dom";

const subject_box_shadow = convertHexToRGBA(`${COLOR.BLACK}`, 25);

const SubjectCard = ({ history, subjects_data }) => {
  const [subjects, set_subjects] = useState([]);

  // const { getSubjects, subjects_loading, subjects } = useGetSubjects();

  const handleOnSubjectClick = (subject_name) => {
    history.push({
      pathname: "/" + subject_name,
      state: {
        subject_name: subject_name,
      },
    });
  };

  useEffect(() => {
    console.log(`useEffect: SubjectCard`);
    set_subjects(subjects_data);
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
