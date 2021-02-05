import React from "react";
import styled from "styled-components";

import { Subheader } from "./Typography";

import chevron from "../assets/icon/chevron_mandarin.png";

import { useWindowDimensions } from "../global/utils";
import { COLOR } from "../global/const";

const PADDING = 64+32+24;
const COLLAPS_WIDTH = 16;
const CHARACTER_WIDTH = 11;

export const NumberInputSpinner = ({
  value = 0,
  set_value,
  label_width
}) => {
  const { height, width: screen_width } = useWindowDimensions();

  return (
    <Container>
      <NumberInputSpinnerContainer>
        <NumberInput
          value={value}
          onChange={e => set_value(e.target.value)}
          color={value === 0 ? COLOR.SILVER : COLOR.CHARCOAL}
          width={screen_width-label_width-PADDING-COLLAPS_WIDTH}
        />
        <CollapsContainer>
          <CollapsContainer onClick={() => set_value(value+1)}>
            <Collaps src={chevron} width={16}/>
          </CollapsContainer>
          <div style={{ marginBottom: 6 }}/>
          <CollapsContainer onClick={() => set_value(value-1)}>
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
  marginBottom
}) => {

  return (
    <NumberInputSpinnerWithLabelContainer
      flexDirection={direction}
      justifyContent={direction === "row" ? "space-between" : null}
      marginBottom={marginBottom}
    >
      <div style={direction === "column" ? { marginBottom: 8 } : { marginTop: 6, marginRight: 24 }}>
        <Subheader>{label}</Subheader>
      </div>
      <NumberInputSpinner
        value={value}
        set_value={set_value}
        label_width={label.length*CHARACTER_WIDTH}
      />
      {unit_label &&
        <div style={{ marginTop: 6 }}>
          <Subheader>{unit_label}</Subheader>
        </div>
      }
    </NumberInputSpinnerWithLabelContainer>
  );
};

const NumberInputSpinnerWithLabelContainer = styled.div.attrs(props => ({
  flexDirection: props.flexDirection,
  justifyContent: props.justifyContent,
  marginBottom: props.marginBottom
}))`
  display: flex;
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