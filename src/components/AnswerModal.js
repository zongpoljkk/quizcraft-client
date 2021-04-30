import React from "react";
import styled from "styled-components";

import { Header, Body } from "./Typography";
import { FooterModal } from "./Modal";
import { Button } from "./Button";
import { Report } from "./Report";
import { DisplayText } from "./HandleText";

import correct_icon from "../assets/icon/correct.png";
import incorrect_icon from "../assets/icon/incorrect.png";
import answer_icon from "../assets/icon/answer.png";

import { COLOR } from "../global/const";
import { useWindowDimensions } from "../global/utils";

export const AnswerModal = ({
  toggle,
  isShowing,
  buttonTitle,
  onButtonClick,
  onReportClick,
  subject,
  correct,
  group_observer,
  answer,
  overlay_clickable,
  onClose = true,
  show_answer = false,
}) => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <FooterModal
      isShowing={isShowing}
      hide={toggle}
      backgroundColor={group_observer ? COLOR.GOLDEN_TAINOI : correct ? COLOR.CELERY : COLOR.TRINIDAD}
      overlay_clickable={overlay_clickable}
    >
      <Container>
        <ContentContainer>
          <Container>
            <IconContainer>
              <img src={group_observer ? answer_icon : correct ? correct_icon : incorrect_icon} height={48} />
            </IconContainer>
            <AnswerContainer>
              {correct && !show_answer ? (
                <Header color={COLOR.CELERY}>ถูกต้อง</Header>
              ) : (
                <div>
                  {group_observer ?
                    <Header color={COLOR.GOLDEN_TAINOI}>คำตอบ:</Header>
                  :
                    <Header color={correct ? COLOR.CELERY : COLOR.TRINIDAD}>คำตอบที่ถูกต้อง:</Header>
                  }
                  <div style={{ marginBottom: 8 }} />
                  {answer?.split("\n").map((item, key) => {
                    return (
                      <Body key={key} color={group_observer ? COLOR.GOLDEN_TAINOI : correct ? COLOR.CELERY : COLOR.TRINIDAD}>
                        {subject === "คณิตศาสตร์" ? (
                          <div
                            style={{
                              width: screen_width - 228,
                              overflowX: "scroll",
                              overflowY: "hidden",
                            }}
                          >
                            <DisplayText 
                              content={item}
                              color={group_observer ? COLOR.GOLDEN_TAINOI : correct ? COLOR.CELERY : COLOR.TRINIDAD}
                            />
                          </div>
                        ) : (
                          item
                        )}
                      </Body>
                    );
                  })}
                </div>
              )}
            </AnswerContainer>
          </Container>
          <div style={{ marginBottom: 8 }} />
          <Report 
            correct={correct} 
            group_observer={group_observer} 
            onReport={() => onReportClick()}
          />
        </ContentContainer>
        {buttonTitle && (
          <Button
            onClick={() => {
              onButtonClick();
              if (onClose) {
                toggle();
              }
            }}
            type="custom"
            size="small"
            backgroundColor={correct ? COLOR.CELERY : group_observer ? COLOR.GOLDEN_TAINOI :  COLOR.TRINIDAD}
            border="none"
            color={COLOR.WHITE}
            style={{ alignSelf: "center" }}
          >
            {buttonTitle}
          </Button>
        )}
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
