import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import useSound from 'use-sound';

import { Subheader, Overline } from "../../../components/Typography";
import useModal from "../../../components/useModal";
import { AlertModal } from "../../../components/AlertModal";

import chevron from "../../../assets/icon/chevron_charcoal.png";
import click from "../../../assets/sounds/click.mp3";

import { COLOR, DIFFICULTY, GAME_MODE } from "../../../global/const";

const LAST_PATH = {
  ALL_CHALLENGES: "ALL_CHALLENGES",
  SUBTOPIC: "SUBTOPIC"
};

const ModeBox = ({ 
  icon, 
  type, 
  id,
  title,
  available_difficulty,
  subject,
  topic,
  history,
  style
}) => {
  const ref = useRef(null);
  const [box_width, set_box_width] = useState();
  const [isShowing, toggle] = useModal();

  const [play] = useSound(click, { volume: 0.25 });

  const handleClick = (
    selected_subject,
    selected_subtopic_id,
    selected_subtopic_name, 
    selected_topic_name,
    selected_mode, 
    selected_difficulty 
  ) => {
    history.push({
      pathname: selected_topic_name+"/"+selected_subtopic_name+"/"+selected_difficulty+
        (selected_mode === GAME_MODE.PRACTICE.type_th ? "/practice-game" 
        : selected_mode === GAME_MODE.QUIZ.type_th ? "/quiz-game" : "/all-challenges"), 
      state: {
        subject_name: selected_subject,
        topic_name: selected_topic_name,
        subtopic_id: selected_subtopic_id,
        subtopic_name: selected_subtopic_name,
        mode: selected_mode,
        difficulty: selected_difficulty,
        last_path: LAST_PATH.SUBTOPIC
      },
    });
  };

  useEffect(() => {
    set_box_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  return (
    <Background style={style}>
      <motion.div
        style={{ display: "flex", flex: 1, cursor: "pointer" }}
        whileTap={{ x: -(box_width + 16), right: 0, transition: {duration: 0.5} }}
        drag="x"
        dragConstraints={{ left: -(box_width + 16), right: 0 }}
        dragMomentum={true}
        size="100%"
        background={COLOR.MANDARIN}
      >
        <Container>
          <Box style={style}>
            <Icon src={icon} size={44} marginRight={16} />
            <Subheader props color={COLOR.WHITE}>
              {type}
            </Subheader>
            <div style={{ marginLeft: "auto" }}>
              <ChevronIcon src={chevron} /> 
              <ChevronIcon src={chevron} /> 
              <ChevronIcon src={chevron} /> 
            </div>
          </Box>
        </Container>
      </motion.div>
      <DifficultyBox ref={ref}>
        {available_difficulty.map((item, index) => (
          <DifficultyIcon>
            <Icon
              key={index}
              style={{ cursor: "pointer" }}
              size={36}
              onClick={() => {
                if(item.isAvailable) {
                  handleClick(subject, id, title, topic, type, item.difficulty);
                } else { 
                  toggle();
                };
                play();
              }}
              src={item.isAvailable ? DIFFICULTY[item.difficulty].icon : DIFFICULTY[item.difficulty].disable_icon}
            />
            <div style={{ marginTop: 1 }}/>
            <Overline
              color={item.isAvailable ? COLOR.WHITE : COLOR.CHARCOAL}
              opacity={item.isAvailable ? null : 0.6}
            >
              {item.difficulty}
            </Overline>
          </DifficultyIcon>
        ))}
      </DifficultyBox>
      <AlertModal
        isShowing={isShowing} 
        toggle={toggle} 
        text="ระดับความยากนี้ยังไม่เปิดใช้งาน"
      />
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

const DifficultyIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-right: 16px;
`;

const Icon = styled.img`
  alt: "Mode icon";
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin-right: ${props => props.marginRight}px;
`;

const ChevronIcon = styled.img`
  alt: "swipe icon";
  width: 16px;
  height: 10px;
  transform: rotate(270deg);
  margin-right: -8px;
  opacity: 0.4;
`;

export default withRouter(ModeBox);
