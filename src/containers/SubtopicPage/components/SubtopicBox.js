import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../../global/const";
import ModeBox from "./ModeBox";
const SubtopicBox = (props) => {
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
    <Accordion onClick={handle_toggle}> {props.title} </Accordion>
    <div>
      {opened === true && (
          <ModeBox />
      )}
    </div>
  </Container>
);
};



const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 2px 5px #d9d9d9;
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
