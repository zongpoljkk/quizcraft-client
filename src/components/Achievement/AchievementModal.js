import styled from "styled-components";

import { Modal } from "../Modal";
import useModal from "../useModal";

import { Header } from "../Typography";
import { Button } from "../Button";

const AchievementModal = ({
  isShowing,
  toggle,
  content,
  onSubmit = () => {},
}) => {
  return (
    <div>
      <Modal isShowing={isShowing} hide={toggle}>
        <HeaderContainer>
          <Header>{content}</Header>
        </HeaderContainer>
        <ButtonContainer>
          <Button type="outline" size="small" onClick={toggle}>
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

export default AchievementModal;
