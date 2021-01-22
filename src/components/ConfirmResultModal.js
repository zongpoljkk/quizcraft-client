import React from "react";
import styled from "styled-components";

import { Header, Subheader, Body } from "./Typography";
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
  pin,
  onSubmit = () => {},
}) => {

  return (
    <Modal
      isShowing={isShowing}
      hide={toggle}
      overlay_clickable={false}
    >
      <Container>
        <Icon src={success ? success_icon : fail_icon}/>
        <Header>{success ? "สำเร็จ" : "ล้มเหลว"}</Header>
        <DescriptionContainer marginBottom={ pin ? 8 : 16 }>
          <Body color={COLOR.SILVER}>{success ? success_description : fail_description}</Body>
        </DescriptionContainer>
        {(pin && success) && (
          <PinContaniner>
            <Subheader>PIN: {pin}</Subheader>
          </PinContaniner>
        )}
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

const DescriptionContainer = styled.div.attrs(props => ({
  marginBottom: props.marginBottom
}))`
  text-align: center;
  margin-top: 4px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const PinContaniner = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 0px 12px 0px;
  margin-bottom: 16px;
  background: ${COLOR.ISLAND_SPICE};
  border-radius: 10px;
  justify-content: center;
`;