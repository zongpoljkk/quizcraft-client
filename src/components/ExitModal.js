import React from "react";
import styled from "styled-components";

import { Header } from "./Typography";
import { Button } from "./Button";
import { Modal } from "./Modal";
import useModal from "./useModal";

import close_icon from "../assets/icon/close.png";

export const ExitModal = ({
  onExit = () => {},
}) => {

  const {isShowing, toggle} = useModal();

  return (
    <div>
      <IconContainer onClick={toggle}>
        <img src={close_icon} height={16} width={16}/>
      </IconContainer>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      >
        <HeaderContainer>
          <Header>คุณยืนยันที่จะออกจากเกมใช่หรือไม่ ?</Header>
        </HeaderContainer>
        <ButtonContainer>
          <Button 
            type="outline"
            size="small"
            onClick={toggle}
          >
            ยกเลิก
          </Button>
          <Button
            size="small"
            onClick={() => {
              toggle();
              onExit();
            }}
          >
            ยืนยัน
          </Button>
        </ButtonContainer>
      </Modal>
    </div>
  );
};

const IconContainer = styled.div`
  display: flex;
  height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;