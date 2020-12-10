import React from "react";
import styled from "styled-components";

import { Header, Body } from "./Typography";
import { FooterModal } from "./Modal";
import { Button } from "./Button"
import { Report } from "./Report"

import { COLOR } from "../global/const";

export const AnswerModal = ({
  toggle,
  isShowing,
  buttonTitle,
  onButtonClick,
  correct,
  answer,
}) => {

  return (
    <FooterModal
      isShowing={isShowing}
      hide={toggle}
      backgroundColor={correct ? COLOR.CELERY : COLOR.TRINIDAD}
    >
      <Container>
        <ContentContainer>
          <Container>
            <IconContainer>
              {/* correct / incorrect icon */}
            </IconContainer>
            <AnswerContainer>
              {correct
                ? (
                  <Header color={COLOR.CELERY}>ถูกต้อง</Header>
                )
                : (
                  <div>
                    <Header color={COLOR.TRINIDAD}>คำตอบที่ถูกต้อง:</Header>
                    <div style={{ marginBottom: 8 }}/>
                    {answer?.split('\n').map((item, key) => {
                      return (
                        <Body key={key} color={COLOR.TRINIDAD}>{item}</Body>
                      );
                    })}
                  </div>
                )
              }
            </AnswerContainer>
          </Container>
          <div style={{ marginBottom: 8 }}/>
          <Report color={correct ? COLOR.CELERY : COLOR.TRINIDAD}/>
        </ContentContainer>
        <Button 
          onClick={() => {
            onButtonClick();
            toggle();
          }}
          type="custom"
          size="small"
          backgroundColor={correct ? COLOR.CELERY : COLOR.TRINIDAD}
          border="none"
          color={COLOR.WHITE}
          style={{ alignSelf: "center" }}
        >
          {buttonTitle}
        </Button>
      </Container>
    </FooterModal>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

const IconContainer = styled.div`
  background: ${COLOR.WHITE};
  height: 48px; 
  width: 48px;
  border-radius: 50%;
  margin-right: 24px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
