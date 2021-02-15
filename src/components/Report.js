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
  onClick = () => {},
}) => {

  return (
    <Container onClick={onClick}>
      <img src={correct ? correct_flag_icon : group_observer ? answer_flag_icon : incorrect_flag_icon} height={24}/>
      <div style={{ marginRight: 8 }}/>
      <Body color={correct ? COLOR.CELERY : group_observer ? COLOR.GOLDEN_TAINOI : COLOR.TRINIDAD} textDecoration="underline">รายงาน</Body>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;