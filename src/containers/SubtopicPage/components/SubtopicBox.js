import React, { useState } from "react";
import styled from "styled-components";

import ModeBox from "./ModeBox";

import { COLOR, MODE } from "../../../global/const";

const SubtopicBox = ({
  id,
  title,
  subject,
  topic
}) => {
  const [opened, set_opened] = useState(false);

  const handle_toggle = () => {
    if (opened) {
      set_opened(false);
    } else {
      set_opened(true);
    }
  };

  return (
    <Container>
      <Accordion onClick={handle_toggle}>{title}</Accordion>
      {opened === true
        ? Object.entries(MODE).map((item, index) => (
            <ModeBox 
              key={index} 
              icon={item[1].icon} 
              type={item[1].type}
              title={title}
              id={id}
              subject={subject}
              topic={topic}
              style={{
                borderRadius: index === Object.entries(MODE).length-1 ? "0px 0px 10px 10px" : null
              }}
            />
          ))
        : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 2px 5px ${COLOR.SHADOW};
  margin-bottom: 16px;
  border-radius: 10px;
`;

const Accordion = styled.button`
  display: flex;
  width: 100%;
  cursor: pointer;
  padding: 12px 16px 12px 16px;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.CHARCOAL};
  align-items: center;
  justify-content: flex-start;
  font-family: Prompt;
  font-size: 20px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  outline: none;
`;

export default SubtopicBox;
