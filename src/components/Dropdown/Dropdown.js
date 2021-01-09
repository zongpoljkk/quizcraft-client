import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Subheader, Body } from "../Typography";

import chevron from "../../assets/icon/chevron_mandarin.png";

import { useDetectOutsideClick } from "./DropdownHelper";

import { COLOR } from "../../global/const";

export const Dropdown = ({
  placeholder = "-- เลือก --",
  options,
  value,
  set_value,
  onSelect = () => {}
}) => {
  const dropdown_ref = useRef(null);
  const [is_active, set_is_active] = useDetectOutsideClick(dropdown_ref, false);
  const [hover, set_hover] = useState();

  const onClick = () => {
    set_is_active(!is_active);
  };

  const onSelectOption = () => {
    if (is_active) {
      set_is_active(!is_active);
    };
    onSelect();
  };

  return (
    <Container>
      <DropdownContainer borderRadius={is_active ? "10px 10px 0px 0px" : "10px"} onClick={onClick}>
        <Body color={value ? COLOR.CHARCOAL : COLOR.SILVER}>
          {value ? value : placeholder}
        </Body>
        <Collaps src={chevron} width={16} rotate={is_active ? null : 180}/>
      </DropdownContainer>
      {is_active &&
        <OptionsContainer>
          {options ? 
            options.map((option, i) => (
              <Option
                key={i}
                backgroundColor={hover === i ? COLOR.ISLAND_SPICE : null}
                onMouseEnter={() => set_hover(i)}
                onMouseLeave={() => set_hover(null)}
                value={option}
                onClick={(e) => {
                  set_value(e.target.innerText);
                  onSelectOption();
                }}
              >
                <Body>{option}</Body>
              </Option>
            ))
            : <Option>
                <Body color={COLOR.SILVER}>{placeholder}</Body>
              </Option>
          }

        </OptionsContainer>
      }
    </Container>
  );
};

export const DropdownWithLabel = ({
  label,
  options,
  value,
  set_value,
  direction = "column",
  marginBottom
}) => {

  return (
    <DropdownWithLabelContainer
      flexDirection={direction}
      marginBottom={marginBottom}
    >
      <div style={direction === "column" ? { marginBottom: 8 } : { marginTop: 6, marginRight: 24 }}>
        <Subheader>{label}</Subheader>
      </div>
      <Dropdown
        options={options}
        value={value}
        set_value={set_value}
      />
    </DropdownWithLabelContainer>
  );
};

const DropdownWithLabelContainer = styled.div.attrs(props => ({
  flexDirection: props.flexDirection,
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  margin-bottom: ${props => props.marginBottom}px;
`;

const Container = styled.div`
  flex: 1;
  position: relative;
`;

const DropdownContainer = styled.div.attrs(props => ({
  height: props.height || 40,
  borderRadius: props.borderRadius
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${COLOR.SILVER};
  border-radius: ${props => props.borderRadius};
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

const OptionsContainer = styled.div`
  border: 1px solid ${COLOR.SILVER};
  border-radius: 0px 0px 10px 10px;
  outline: none;
  margin-top: -1px;
  color: ${COLOR.MANDARIN};
  max-height: 98px;
  overflow: scroll;
  &:focus {
    border-color: ${COLOR.MANDARIN};
  }
`;

const Option = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  background-color: ${props => props.backgroundColor};
  padding: 4px 16px 4px 16px;
`;
