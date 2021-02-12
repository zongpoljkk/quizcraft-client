import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { Subheader, Body } from "./Typography";

import chevron from "../assets/icon/chevron_mandarin.png";
import select from "../assets/sounds/select.mp3";

import { useDetectOutsideClick } from "../global/utils";

import { COLOR } from "../global/const";

export const Dropdown = ({
  placeholder = "-- เลือก --",
  options,
  value,
  set_value,
  onSelect = () => {}
}) => {
  const dropdown_ref = useRef(null);
  const ref = useRef(null);
  const [is_active, set_is_active] = useDetectOutsideClick(dropdown_ref, false);
  const [hover, set_hover] = useState();
  const [last_options, set_last_options] = useState(options);
  const [container_width, set_container_width] = useState();
  const [play] = useSound(select, { volume: 0.25 });

  const onClick = () => {
    set_is_active(!is_active);
  };

  const onSelectOption = () => {
    if (is_active) {
      set_is_active(!is_active);
    };
    onSelect();
  };

  useEffect(() => {
    if(last_options){
      if(options[0] !== last_options[0]){
        set_value('');
      };
    };
    set_last_options(options);
  }, [options]);

  useEffect(() => {
    set_container_width(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  return (
    <Container ref={dropdown_ref}>
      <DropdownContainer
        ref={ref}
        borderRadius={is_active ? "10px 10px 0px 0px" : "10px"}
        onClick={() => {
          onClick();
          play();
        }}
      >
        <Body color={value ? COLOR.CHARCOAL : COLOR.SILVER}>
          {value ? value : placeholder}
        </Body>
        <Collaps src={chevron} width={16} rotate={is_active ? null : 180}/>
      </DropdownContainer>
      {is_active &&
        <OptionsContainer width={container_width-2}>
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
                  play();
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
  dropdown_ref,
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
        dropdown_ref={dropdown_ref}
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
  flex: 1;
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

const OptionsContainer = styled.div.attrs(props => ({
  width: props.width
}))`
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.SILVER};
  border-radius: 0px 0px 10px 10px;
  outline: none;
  margin-top: -1px;
  color: ${COLOR.MANDARIN};
  width: ${props => props.width}px;
  max-height: 98px;
  overflow: scroll;
  position: absolute;
  z-index: 100;
`;

const Option = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  background-color: ${props => props.backgroundColor};
  padding: 4px 16px 4px 16px;
`;
