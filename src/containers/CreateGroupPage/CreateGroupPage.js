import React, { useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Header, Subheader } from "../../components/Typography";
import { Button } from "../../components/Button";
import { DropdownWithLabel } from "../../components/Dropdown/Dropdown";
import { NumberInputSpinnerWithLabel } from "../../components/NumberInputSpinner";

import { LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

// MOCK DATA
const options = [
  'one', 'two', 'three', 'four', 'five', 'six'
];

const CreateGroupPage = ({ history }) => {
  const dropdown_ref = useRef(null);
  const [subject, set_subject] = useState();
  const [topic, set_topic] = useState();
  const [subtopic, set_subtopic] = useState();
  const [difficulty, set_difficulty] = useState();
  const [number_of_problems, set_number_of_problems] = useState();
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <Container>
      <Header>สร้างกลุ่ม</Header>
      <ContentContainer>
        <DropdownWithLabel
          dropdown_ref={dropdown_ref}
          label="วิชา"
          value={subject}
          set_value={set_subject}
          options={options}
          marginBottom={16}
        />
        <DropdownWithLabel
          dropdown_ref={dropdown_ref}
          label="หัวข้อ"
          value={topic}
          set_value={set_topic}
          marginBottom={16}
        />
        <DropdownWithLabel
          dropdown_ref={dropdown_ref}
          label="หัวข้อย่อย"
          value={subtopic}
          set_value={set_subtopic}
          marginBottom={24}
        />
        <DropdownWithLabel
          dropdown_ref={dropdown_ref}
          label="ระดับความยาก"
          value={difficulty}
          set_value={set_difficulty}
          direction="row"
          marginBottom={24}
        />
        <NumberInputSpinnerWithLabel
          label="จำนวนคำถามทั้งหมด"
          value={number_of_problems}
          set_value={set_number_of_problems}
          direction="row"
        />
      </ContentContainer>
      <ButtonContainer justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
        <Button type="outline">
          ยกเลิก
        </Button>
        <Button onClick={() => { history.push("waiting-room"); }}>
          สร้าง
        </Button>
      </ButtonContainer>
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

export default withRouter(CreateGroupPage);
