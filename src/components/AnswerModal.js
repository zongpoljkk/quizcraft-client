import React from "react";
import styled from "styled-components";

import { Header, Body } from "./Typography";
import { FooterModal } from "./Modal";
import { Button } from "./Button"
import { Report } from "./Report"

import correct_icon from "../assets/icon/correct.png";
import incorrect_icon from "../assets/icon/incorrect.png";

import { COLOR } from "../global/const";

export const AnswerModal = ({
  toggle,
  isShowing,
  buttonTitle,
  onButtonClick,
  correct,
  answer,
  overlay_clickable
}) => {

  return (
    <FooterModal
      isShowing={isShowing}
      hide={toggle}
      backgroundColor={correct ? COLOR.CELERY : COLOR.TRINIDAD}
      overlay_clickable={overlay_clickable}
    >
      <Container>
        <ContentContainer>
          <Container>
            <IconContainer>
              <img src={correct ? correct_icon : incorrect_icon} height={48}/>
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
          <Report correct={correct}/>
        </ContentContainer>
        {buttonTitle &&
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
        }
      </Container>
    </FooterModal>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

const IconContainer = styled.div`
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
