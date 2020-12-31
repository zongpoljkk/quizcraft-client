import React from "react";
import styled from "styled-components";

import { Header } from "./Typography";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const ConfirmModal = ({
  isShowing,
  toggle,
  content,
  onSubmit = () => {},
}) => {

  return (
    <div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      >
        <HeaderContainer>
          <Header>{content}</Header>
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
              onSubmit();
            }}
          >
            ยืนยัน
          </Button>
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