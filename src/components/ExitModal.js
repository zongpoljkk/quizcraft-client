import React from "react";
import styled from "styled-components";

import { CloseIcon } from "./Icon";
import { Header } from "./Typography";
import { Modal } from "./Modal";
import useModal from "./useModal";

export const ExitModal = () => {

  const {isShowing, toggle} = useModal();

  const HeaderContainer = styled.div`
    display: flex;
    text-align: center;
    margin-bottom: 24px;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  return (
    <div>
      <div onClick={toggle}>
        <CloseIcon />
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