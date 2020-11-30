import React from "react";
import Timer from "react-compound-timer";

import { Body } from "./Typography";

import { COLOR } from "../global/const"

export const TimeCounting = () => {
  return ( 
    <Body color={COLOR.MANDARIN}>
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
      >
        <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
      </Timer>
    </Body>
  );
};
