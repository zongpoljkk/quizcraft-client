import React from "react";
import Timer from "react-compound-timer";
import styled from "styled-components";

import { Body } from "./Typography";

import { COLOR } from "../global/const"

export const TimeCounting = () => {

  const TimeContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 68px;
  `;

  return ( 
    <TimeContainer>
      <Body color={COLOR.MANDARIN}>
        <Timer
          formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
          lastUnit="h"
        >
          <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
        </Timer>
      </Body>
    </TimeContainer>
  );
};
