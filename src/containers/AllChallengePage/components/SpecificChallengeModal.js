import React from "react";
import styled from "styled-components";

import { Header, Subheader, Body } from "../../../components/Typography";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { Modal } from "../../../components/Modal";

import { COLOR } from "../../../global/const";

export const SpecificChallengeModal = ({
  username,
  set_username,
  onClick,
  isShowing,
  toggle,
  not_exist,
}) => {
  return (
    <Modal isShowing={isShowing} hide={toggle}>
      <Container>
        <Header>ท้าทายแบบเจาะจง</Header>
        <ChallengeField>
          <Subheader>ชื่อคู่แข่ง</Subheader>
          <div style={{ marginBottom: 8 }} />
          <TextField
            value={username}
            onChange={(e) => set_username(e.target.value)}
            placeholder="ชื่อผู้ใช้"
          />
          {not_exist && (
            <div style={{ marginTop: "4px" }}>
              <Body props color={COLOR.MANDARIN}>
                ไม่มีชื่อผู้ใช้นี้อยู่ในระบบ!
              </Body>
            </div>
          )}
        </ChallengeField>

        <Button
          onClick={
            username
              ? () => {
                  onClick();
                  set_username("");
                }
              : () => {}
          }
          type={username ? "default" : "disabled"}
        >
          ยืนยัน
        </Button>
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
