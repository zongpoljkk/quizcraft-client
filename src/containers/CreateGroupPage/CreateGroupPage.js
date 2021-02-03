import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Header, Subheader } from "../../components/Typography";
import { Button } from "../../components/Button";
import { DropdownWithLabel } from "../../components/Dropdown/Dropdown";
import { NumberInputSpinnerWithLabel } from "../../components/NumberInputSpinner";
import { RadioButton } from "../../components/RadioButton";
import { ConfirmResultModal } from "../../components/ConfirmResultModal";
import useModal from "../../components/useModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import { LARGE_DEVICE_SIZE } from "../../global/const";
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
  const [subject, set_subject] = useState('');
  const [topic, set_topic] = useState('');
  const [subtopic, set_subtopic] = useState('');
  const [selected_subtopic, set_selected_subtopic] = useState('');
  const [difficulty, set_difficulty] = useState('');
  const [number_of_problems, set_number_of_problems] = useState(0);
  const [time_per_problem, set_time_per_problem] = useState(0);
  const [is_play, set_is_play] = useState();
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const user_id = localStorage.getItem("userId");
  const [isShowing, toggle] = useModal();

  const { getAllSubjects, subjects } = useGetAllSubjects();
  const { getAllTopicsBySubjectName, topics } = useGetAllTopicsBySubjectName();
  const { getAllSubtopicsByTopicName, subtopics } = useGetAllSubtopicsByTopicName();
  const { getAvailableDifficultyBySubtopicName, available_difficulty } = useGetAvailableDifficultyBySubtopicName();
  const {
    createGroup,
    loading,
    group_id,
    pin,
    create_fail,
    success
  } = useCreateGroup();

  const onSuccess = () => {
    history.push({
      pathname: "waiting-room", 
      state: {
        group_id : group_id,
        pin: pin,
        subject_name : subject,
        topic_name : topic,
        subtopic_name : subtopic,
        difficulty : difficulty
      }
    });
  };
  
  useEffect(() => {
    getAllSubjects();
    getAllTopicsBySubjectName(subject);
    getAllSubtopicsByTopicName(topic);
    if(subtopic) {
      getAvailableDifficultyBySubtopicName(subtopic);
      set_selected_subtopic(subtopic);
    };
    if(!subtopic || selected_subtopic !== subtopic) {
      set_difficulty('');
      set_selected_subtopic(subtopic);
    };
  }, [subject, topic, subtopic]);

  return (
    <Container>
      <Header>สร้างกลุ่ม</Header>
      {loading && <LoadingPage overlay={true}/>}
      <ContentContainer>
        <DropdownWithLabel
          label="วิชา"
          value={subject}
          set_value={set_subject}
          options={subjects}
          marginBottom={16}
        />
        <DropdownWithLabel
          label="หัวข้อ"
          value={topic}
          set_value={set_topic}
          options={topics}
          marginBottom={16}
        />
        <DropdownWithLabel
          label="หัวข้อย่อย"
          value={subtopic}
          set_value={set_subtopic}
          options={subtopics}
          marginBottom={24}
        />
        <DropdownWithLabel
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
        <NumberInputSpinnerWithLabel
          label="เวลาที่ใช้ในแต่ละข้อ"
          value={time_per_problem}
          set_value={set_time_per_problem}
          unit_label="วินาที"
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
                time_per_problem,
                is_play === "ผู้เล่น" ? true : false,
                toggle
              );
            };
          }}
        >
          สร้าง
        </Button>
      </ButtonContainer>
      <ConfirmResultModal
        isShowing={isShowing}
        toggle={toggle}
        success={success}
        pin={pin}
        success_description="กลุ่มถูกสร้างสำเร็จ"
        fail_description={translateError(create_fail)}
        onSubmit={() => {
          if(success) {
            onSuccess();
          };
        }}
      />
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

const TimePickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const SecondLabel = styled.div`
  margin-top: 6px;
  margin-left: 8px;
`;

export default withRouter(CreateGroupPage);
