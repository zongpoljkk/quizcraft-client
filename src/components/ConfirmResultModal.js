import React from "react";
import styled from "styled-components";

import { Header, Body } from "./Typography";
import { Button } from "./Button";
import { Modal } from "./Modal";

import success_icon from "../assets/icon/success.png";
import fail_icon from "../assets/icon/fail.png";
import { COLOR } from "../global/const";

export const ConfirmResultModal = ({
  isShowing,
  toggle,
  success,
  success_description,
  fail_description,
  onSubmit = () => {},
}) => {

  return (
    <Modal
      isShowing={isShowing}
      hide={toggle}
    >
      <Container>
        <Icon src={success ? success_icon : fail_icon}/>
        <Header>{success ? "สำเร็จ" : "ล้มเหลว"}</Header>
        <DescriptionContainer>
          <Body color={COLOR.SILVER}>{success ? success_description : fail_description}</Body>
        </DescriptionContainer>
        <Button
          onClick={() => {
            toggle();
            onSubmit();
          }}
        >
          ยืนยัน
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;

const DescriptionContainer = styled.div`
  text-align: center;
  margin-top: 4px;
  margin-bottom: 16px;
`;