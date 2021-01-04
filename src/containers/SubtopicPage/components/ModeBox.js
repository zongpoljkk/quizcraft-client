import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Subheader } from "../../../components/Typography";
import { COLOR, DIFFICULTY, MODE } from "../../../global/const";
import chevron from "../../../assets/icon/chevron.png";

const ModeBox = ({ 
  icon, 
  type, 
  id,
  title,
  subject,
  topic,
  history,
  style
}) => {
  const ref = useRef(null);
  const [box_width, set_box_width] = useState();

  const handleClick = (
    selected_subject, 
    selected_subtopic_id,
    selected_subtopic_name, 
    selected_topic_name,
    selected_mode, 
    selected_difficulty 
  ) => {
    history.push({
      pathname: selected_topic_name+"/"+selected_subtopic_name+"/"+selected_difficulty.toLowerCase()+
        (selected_mode === MODE.PRACTICE.type ? "/practice-game" 
        : selected_mode === MODE.QUIZ.type ? "/quiz-game" : "/all-challenges"), 
      state: {
        subject_name: selected_subject,
        topic_name: selected_topic_name,
        subtopic_id: selected_subtopic_id,
        subtopic_name: selected_subtopic_name,
        mode: selected_mode,
        difficulty: selected_difficulty
      }
    });
  };

  useEffect(() => {
    set_box_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  return (
    <Background style={style}>
      <motion.div
        style={{ display: "flex", flex: 1 }}
        drag="x"
        dragConstraints={{ left: -(box_width+16), right: 0 }}
        dragMomentum={true}
        size="100%"
        background={COLOR.MANDARIN}
      >
        <Container>
          <Box style={style}>
            <Icon src={icon} />
            <Subheader props color={COLOR.WHITE}>
              {type}
            </Subheader>
              <ChevronIcon src={chevron} /> 
          </Box>
        </Container>
      </motion.div>
      <DifficultyBox ref={ref}>
        {Object.entries(DIFFICULTY).map((item, index) => (
          <Icon
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClick(subject, id, title, topic, type, item[1].type)
            }}
            src={item[1].icon}
          />
        ))}
      </DifficultyBox>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${COLOR.GOLDEN_TAINOI};
  z-index: 3;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  z-index: 2;
`;

const Box = styled.div`
  display: flex;
  position: relative;
  padding: 12px 24px 12px 24px;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  background: ${COLOR.MANDARIN};
`;

const DifficultyBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: -1;
`;

const Icon = styled.img`
  alt: "Mode icon";
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const ChevronIcon = styled.img`
  alt: "swipe icon";
  width: 16px;
  height: 16px;
  margin-left: auto;
  opacity: 0.3;
`;

export default withRouter(ModeBox);
