import React from "react";
import styled from "styled-components";

import { Body } from "./Typography";

import { COLOR } from "../global/const";

import correct_flag_icon from "../assets/icon/correct_flag.png";
import incorrect_flag_icon from "../assets/icon/incorrect_flag.png";
import answer_flag_icon from "../assets/icon/answer_flag.png";

export const Report = ({
  correct,
  group_observer,
  onReport = () => {},
}) => {

  return (
    <Container onClick={()=> onReport()}>
      <img src={group_observer ? answer_flag_icon : correct ? correct_flag_icon : incorrect_flag_icon} height={24}/>
      <div style={{ display: "flex", marginLeft: 8, alignSelf: "flex-end", lineHeight: "16px" }}>
        <Body color={group_observer ? COLOR.GOLDEN_TAINOI : correct ? COLOR.CELERY : COLOR.TRINIDAD} textDecoration="underline">รายงาน</Body>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;