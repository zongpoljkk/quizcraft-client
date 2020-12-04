import React from "react";
import styled from "styled-components";

import { CloseIcon } from "./Icon";
import { Header } from "./Typography";
import { Modal } from "./Modal";
import useModal from "./useModal";

export const ExitModal = () => {

  const {isShowing, toggle} = useModal();

  const HeaderCpntainer = styled.div`
    display: flex;
    text-align: center;
    margin-bottom: 24px;
  `;

  const ButtonCpntainer = styled.div`
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
        <HeaderCpntainer>
          <Header>คุณยืนยันที่จะออกจากเกมใช่หรือไม่ ?</Header>
        </HeaderCpntainer>
        <ButtonCpntainer>
          <div>button</div>
          <div>button</div>
        </ButtonCpntainer>
      </Modal>
    </div>
  );
};