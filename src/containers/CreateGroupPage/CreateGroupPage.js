import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Header, Body } from "../../components/Typography";
import { Button } from "../../components/Button";
import { DropdownWithLabel } from "../../components/Dropdown/Dropdown";
import { NumberInputSpinnerWithLabel } from "../../components/NumberInputSpinner";
import { RadioButton } from "../../components/RadioButton";
import { TimePickerWithLabel } from "../../components/TimePicker";
import LoadingPage from "../LoadingPage/LoadingPage";

import { COLOR, LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

import {
  useGetAllSubjects,
  useGetAllTopicsBySubjectName,
  useGetAllSubtopicsByTopicName,
  useGetAvailableDifficultyBySubtopicName,
  useCreateGroup,
  translateError,
  timeConvertor
} from "./CreateGroupPageHelper";

const IS_PLAY_CHOICES = [
  "ผู้สังเกตการณ์",
  "ผู้เล่น"
];

const CreateGroupPage = ({ history }) => {
  const dropdown_ref = useRef(null);
  const [subject, set_subject] = useState('');
  const [topic, set_topic] = useState('');
  const [subtopic, set_subtopic] = useState('');
  const [difficulty, set_difficulty] = useState('');
  const [number_of_problems, set_number_of_problems] = useState(0);
  const [time_per_problem, set_time_per_problem] = useState('');
  const [is_play, set_is_play] = useState();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const user_id = localStorage.getItem("userId");

  const { getAllSubjects, subjects } = useGetAllSubjects();
  const { getAllTopicsBySubjectName, topics } = useGetAllTopicsBySubjectName();
  const { getAllSubtopicsByTopicName, subtopics } = useGetAllSubtopicsByTopicName();
  const { getAvailableDifficultyBySubtopicName, available_difficulty } = useGetAvailableDifficultyBySubtopicName();
  const {
    createGroup,
    loading,
    group_id,
    create_fail,
    success
  } = useCreateGroup();
  
  useEffect(() => {
    getAllSubjects();
    getAllTopicsBySubjectName(subject);
    getAllSubtopicsByTopicName(topic);
    if(subtopic) {
      getAvailableDifficultyBySubtopicName(subtopic);
    };
    if(!subtopic) {
      set_difficulty();
    };
  }, [subject, topic, subtopic]);

  useEffect(() => {
    if(success) {
      history.push({
        pathname: "waiting-room", 
        state: {
          group_id: group_id
        }
      });
    };
  }, [success]);

  return (
    <Container>
      <Header>สร้างกลุ่ม</Header>
      {loading
        ? <LoadingPage />
        : (
          <React.Fragment>
            <ContentContainer>
              <DropdownWithLabel
                dropdown_ref={dropdown_ref}
                label="วิชา"
                value={subject}
                set_value={set_subject}
                options={subjects}
                marginBottom={16}
              />
              <DropdownWithLabel
                dropdown_ref={dropdown_ref}
                label="หัวข้อ"
                value={topic}
                set_value={set_topic}
                options={topics}
                marginBottom={16}
              />
              <DropdownWithLabel
                dropdown_ref={dropdown_ref}
                label="หัวข้อย่อย"
                value={subtopic}
                set_value={set_subtopic}
                options={subtopics}
                marginBottom={24}
              />
              <DropdownWithLabel
                dropdown_ref={dropdown_ref}
                label="ระดับความยาก"
                value={difficulty}
                set_value={set_difficulty}
                options={available_difficulty}
                direction="row"
                marginBottom={24}
              />
              <NumberInputSpinnerWithLabel
                label="จำนวนคำถามทั้งหมด"
                value={number_of_problems}
                set_value={set_number_of_problems}
                direction="row"
                marginBottom={24}
              />
              <TimePickerWithLabel
                label="ระยะเวลาที่ใช้ในแต่ละข้อ"
                value={time_per_problem}
                set_value={set_time_per_problem}
                direction="row"
                marginBottom={24}
              />
              <RadioButton 
                value={is_play} 
                selected_value={set_is_play}  
                choices={IS_PLAY_CHOICES}
                direction="row"
                justifyContent="flex-start"
                marginRight={24}
                text="subheader"
              />
            </ContentContainer>
            {create_fail &&
              <ErrorContainer>
                <Body color={COLOR.MANDARIN}>{translateError(create_fail)}</Body>
              </ErrorContainer>
            }
            <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
              <Button
                type="outline"
                onClick={() => { history.push("homepage"); }}
              >
                ยกเลิก
              </Button>
              <Button
                type={(subject && topic && subtopic && difficulty && number_of_problems && time_per_problem && is_play) ? "default" : "disabled"}
                onClick={() => {
                  if(subject && topic && subtopic && difficulty && number_of_problems && time_per_problem && is_play) {
                    createGroup(
                      user_id,
                      subject,
                      topic,
                      subtopic,
                      difficulty.toUpperCase(),
                      number_of_problems,
                      timeConvertor(time_per_problem),
                      is_play === "ผู้เล่น" ? true : false
                    );
                  };
                }}
              >
                สร้าง
              </Button>
            </ButtonContainer>
          </React.Fragment>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 36px;
`;

const ButtonContainer = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  justify-content: ${props => props.justifyContent};
  width: 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  align-self: flex-start;
  margin-bottom: 8px;
`;

export default withRouter(CreateGroupPage);
