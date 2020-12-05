import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

import { Subheader } from "../../../components/Typography";
import { COLOR, DIFFICULTY } from "../../../global/const";

const ModeBox = ({ icon, type }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/topic");
  };

  return (
    <Background>
      <motion.div
        style={{ display: "flex", flex: 1 }}
        drag="x"
        dragConstraints={{ left: -168, right: 0 }}
        dragMomentum={true}
        size="100%"
        background={COLOR.MANDARIN}
      >
        <Container>
          <Box>
            <Icon src={icon} />
            <Subheader props color={COLOR.WHITE}>
              {type}
            </Subheader>
          </Box>
        </Container>
      </motion.div>
      <DifficultyBox>
        {Object.entries(DIFFICULTY).map((item, index) => (
          <Icon
            key={index}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
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
  margin-right: 12px;
`;

export default ModeBox;
