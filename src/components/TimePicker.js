import React from "react";
import styled from "styled-components";

import { Subheader } from "./Typography";

import { useWindowDimensions } from "../global/utils";
import { COLOR, LARGE_DEVICE_SIZE } from "../global/const";

export const TimePicker = ({
  hour = false,
  value,
  set_value = () => {}
}) => {

  return (
    <TimePickerContainer width={value ? ( hour ? 108 : 82) : 64}>
      <TimePickerComponent
        min="00:00" max="23:59"
        step={hour ? "2" : "60"}
        value={value}
        onChange={e => set_value(e.target.value)}
        color={value ? COLOR.CHARCOAL : COLOR.SILVER }
      />
    </TimePickerContainer>
  );
};

export const TimePickerWithLabel = ({
  label,
  value,
  set_value,
  direction = "column",
  marginBottom
}) => {
  const { height, width: screen_width } = useWindowDimensions();

  return (
    <TimePickerWithLabelContainer
      flexDirection={direction}
      justifyContent={direction === "row" ? ( screen_width >= LARGE_DEVICE_SIZE ? null : "space-between" ) : null}
      marginBottom={marginBottom}
    >
      <div style={direction === "column" ? { marginBottom: 8 } : { marginTop: 6, marginRight: 24 }}>
        <Subheader>{label}</Subheader>
      </div>
      <TimePicker
        value={value}
        set_value={set_value}
      />
    </TimePickerWithLabelContainer>
  );
};

const TimePickerWithLabelContainer = styled.div.attrs(props => ({
  flexDirection: props.flexDirection,
  justifyContent: props.justifyContent,
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  margin-bottom: ${props => props.marginBottom}px;
`;

const TimePickerContainer = styled.div.attrs(props => ({
  width: props.width,
  height: props.height || 40
}))`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${COLOR.SILVER};
  border-radius: 10px;
  outline: none;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  padding: 0px 16px 0px 16px;
  color: ${COLOR.MANDARIN};
  &:focus {
    border-color: ${COLOR.MANDARIN};
  }
`;

const TimePickerComponent = styled.input.attrs(props => ({
  type: "time",
  color: props.color,
}))`
  display: flex;
  flex: 1;
  font-family: Prompt, sans-serif;
  font-weight: 400;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: ${COLOR.WHITE};
  color: ${props => props.color};
  & .without_ampm::-webkit-datetime-edit-ampm-field {
    display: none;
  }
`;
