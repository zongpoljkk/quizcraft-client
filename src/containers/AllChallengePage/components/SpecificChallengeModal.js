import React from "react";
import styled from "styled-components";

import { Header, Subheader } from "../../../components/Typography";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { Modal } from "../../../components/Modal";

export const SpecificChallengeModal = ({
  username,
  set_username,
  onClick,
  isShowing,
  toggle
}) => {

  return (
    <Modal
      isShowing={isShowing}
      hide={toggle}
    >
      <Container>
        <Header>ท้าทายแบบเจาะจง</Header>
        <ChallengeField>
          <Subheader>ชื่อคู่แข่ง</Subheader>
          <div style={{ marginBottom: 8 }}/>
          <TextField
            value={username}
            onChange={e => set_username(e.target.value)}
            placeholder="ชื่อผู้ใช้"
          />
        </ChallengeField>
        <Button onClick={onClick}>ยืนยัน</Button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChallengeField = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 24px;
`;