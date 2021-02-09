import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { Subheader } from "./Typography";

import chevron from "../assets/icon/chevron_mandarin.png";
import select from "../assets/sounds/select.mp3";

import { useWindowDimensions } from "../global/utils";
import { COLOR, DEVICE_SIZE } from "../global/const";

const PADDING = 64+32+24;
const COLLAPS_WIDTH = 16;
const CHARACTER_WIDTH = 11;

export const NumberInputSpinner = ({
  value = 0,
  set_value,
  label_width
}) => {
  const { height, width: screen_width } = useWindowDimensions();
  const [play] = useSound(select, { volume: 0.25 });

  return (
    <Container style={screen_width >= DEVICE_SIZE.XS ? {width: "100%"} : null}>
      <NumberInputSpinnerContainer>
        <NumberInput
          value={value}
          onChange={e => set_value(e.target.value)}
          color={value === 0 ? COLOR.SILVER : COLOR.CHARCOAL}
          width={screen_width-label_width-PADDING-COLLAPS_WIDTH}
          onClick={play}
          style={screen_width === DEVICE_SIZE.XS ? { minWidth: "60%" } : { width: "60%" }}
        />
        <CollapsContainer>
          <CollapsContainer
            onClick={() => {
              set_value(value+1);
              play();
            }}
          >
            <Collaps src={chevron} width={16}/>
          </CollapsContainer>
          <div style={{ marginBottom: 6 }}/>
          <CollapsContainer
            onClick={() => {
              set_value(value-1);
              play();
            }}
          >
            <Collaps src={chevron} width={16} rotate={180}/>
          </CollapsContainer>
        </CollapsContainer>
      </NumberInputSpinnerContainer>
    </Container>
  );
};

export const NumberInputSpinnerWithLabel = ({
  label,
  value,
  set_value,
  unit_label,
  direction = "column",
  marginBottom,
  label_marginRight = 24
}) => {

  return (
    <NumberInputSpinnerWithLabelContainer
      flexDirection={direction}
      justifyContent={direction === "row" ? "space-between" : null}
      marginBottom={marginBottom}
    >
      <div style={direction === "column" ? { marginBottom: 8 } : { marginTop: 6, marginRight: label_marginRight }}>
        <Subheader>{label}</Subheader>
      </div>
      <NumberInputSpinnerWithLabelContainer
        flexDirection="row"
      >
        <NumberInputSpinner
          value={value}
          set_value={set_value}
          label_width={label.length*CHARACTER_WIDTH}
        />
        {unit_label &&
          <div style={{ marginTop: 6, marginLeft: 8 }}>
            <Subheader>{unit_label}</Subheader>
          </div>
        }
      </NumberInputSpinnerWithLabelContainer>
    </NumberInputSpinnerWithLabelContainer>
  );
};

const NumberInputSpinnerWithLabelContainer = styled.div.attrs(props => ({
  flexDirection: props.flexDirection,
  justifyContent: props.justifyContent,
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex: 1;
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  margin-bottom: ${props => props.marginBottom}px;
`;

const Container = styled.div`
  position: relative;
`;

const NumberInputSpinnerContainer = styled.div.attrs(props => ({
  height: props.height || 40
}))`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${COLOR.SILVER};
  border-radius: 10px;
  outline: none;
  height: ${props => props.height}px;
  padding: 0px 16px 0px 16px;
  color: ${COLOR.MANDARIN};
  &:focus {
    border-color: ${COLOR.MANDARIN};
  }
`;

const Collaps = styled.img.attrs(props => ({
  rotate: props.rotate
}))`
  transform: rotate(${props => props.rotate}deg);
`;

const CollapsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberInput = styled.input.attrs(props => ({
  type: "number",
  color: props.color,
  width: props.width
}))`
  border: none;
  outline: none;
  font-family: Prompt, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.color};
  width: ${props => props.width}px;
`;