import React, { useRef } from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import ModeBox from "./ModeBox";

import { COLOR, MODE } from "../../../global/const";
import { useDetectOutsideClick } from "../../../global/utils";

import click from "../../../assets/sounds/click.mp3";

const SubtopicBox = ({
  id,
  title,
  available_difficulty,
  subject,
  topic
}) => {
  const ref = useRef(null);
  const [opened, set_opened] = useDetectOutsideClick(ref, false);
  const [play] = useSound(click, { volume: 0.25 });

  const handle_toggle = () => {
    if (opened) {
      set_opened(false);
    } else {
      set_opened(true);
    }
  };

  return (
    <Container ref={ref}>
      <Accordion onClick={() => {
        handle_toggle();
        play();
      }}
      >
        {title}
      </Accordion>
      {opened === true
        ? Object.entries(MODE).map((item, index) => (
            <ModeBox 
              key={index} 
              icon={item[1].icon} 
              type={item[1].type}
              title={title}
              available_difficulty={available_difficulty}
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
