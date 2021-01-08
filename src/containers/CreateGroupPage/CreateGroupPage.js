import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Header, Subheader } from "../../components/Typography";
import { Button } from "../../components/Button";

import { DropdownWithLabel } from "./components/DropdownWithLabel";

import { LARGE_DEVICE_SIZE } from "../../global/const";
import { useWindowDimensions } from "../../global/utils";

const CreateGroupPage = ({ history }) => {
  const [subject, set_subject] = useState();
  const [topic, set_topic] = useState();
  const [subtopic, set_subtopic] = useState();
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <Container>
      <Header>สร้างกลุ่ม</Header>
      <ContentContainer>
        <DropdownWithLabel
          label="วิชา"
          value={subject}
          set_value={set_subject}
          marginBottom={16}
        />
        <DropdownWithLabel
          label="หัวข้อ"
          value={topic}
          set_value={set_topic}
          marginBottom={16}
        />
        <DropdownWithLabel
          label="หัวข้อย่อย"
          value={subtopic}
          set_value={set_subtopic}
          marginBottom={24}
        />
        <DropdownWithLabel
          label="ระดับความยาก"
          value={subtopic}
          set_value={set_subtopic}
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
