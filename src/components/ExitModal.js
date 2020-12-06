import React from "react";
import styled from "styled-components";

import { Header } from "./Typography";
import { Modal } from "./Modal";
import useModal from "./useModal";

import close_icon from "../assets/icon/close.png";

export const ExitModal = () => {

  const {isShowing, toggle} = useModal();

  return (
    <div>
      <div onClick={toggle}>
        <img src={close_icon} height={16} width={16}/>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      >
        <HeaderContainer>
          <Header>คุณยืนยันที่จะออกจากเกมใช่หรือไม่ ?</Header>
        </HeaderContainer>
        <ButtonContainer>
          <div>button</div>
          <div>button</div>
        </ButtonContainer>
      </Modal>
    </div>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;