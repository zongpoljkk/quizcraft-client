import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { DisplayText } from "./HandleText";

import { COLOR } from "../global/const";

import radio_button_select from "../assets/sounds/radio_button_select.mp3";

export const RadioButton = ({
  value='',
  subject='',
  selected_value = () => {},
  choices = {},
  direction,
  justifyContent,
  marginRight,
  text,
}) => {

  const [play] = useSound(radio_button_select, { volume: 0.2 });

  return (
    <Container direction={direction} justifyContent={justifyContent}>
      {choices?.map((option, i) => (
        <div
          key={i}
          style={{
            marginBottom:
              direction === "column" ? (i !== choices.length - 1 ? 8 : 0) : 0,
            marginRight: marginRight,
          }}
          onClick={play}
        >
          <Label text={text} selected={value === option}>
            <Input
              name="answer"
              type="radio"
              value={option}
              checked={value === option}
              onChange={(e) => selected_value(e.target.value)}
            />
            <Mark selected={value === option} />
            {subject === "คณิตศาสตร์" ? (
              <DisplayText content={option} />
            ) : (
              option
            )}
          </Label>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div.attrs(props => ({
  direction: props.direction || "column",
  justifyContent: props.justifyContent || "space-between",
}))`
  display: flex;
  flex: 1;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justifyContent};
  align-items: flex-start;
`;

const Mark = styled.span`
  display: inline-block;
  position: relative;
  border: 1px solid ${COLOR.CHARCOAL};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: ${COLOR.MANDARIN};
    opacity: 0;
    left: 50%;
    top: 50%;
    position: absolute;
    transition: all 220ms;
  }
`;

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
  &:checked + ${Mark} {
    &::after {
      width: 12px;
      height: 12px;
      opacity: 1;
      left: 12%;
      top: 12%;
    }
  }
`;

const Label = styled.label.attrs(props => ({
  text: props.text,
  selected: props.selected,
  fontWeight: props.fontWeight
}))`
  display: flex;
  align-items: center;
  position: relative;
  font-family: Prompt, sans-serif;
  font-weight: ${(props) => {
    switch (props.text) {
      case "custom":
        return props.selected ? `${props.fontWeight}`+100 : `${props.fontWeight}`;
      case "subheader":
        return props.selected ? 600 : 500;
      default:
        return props.selected ? 500 : 400;
    }
  }};
  font-size: ${(props) => {
    switch (props.text) {
      case "custom":
        return `${props.fontSize}`;
      case "subheader":
        return "20px";
      default:
        return "16px";
    }
  }};
  color: ${COLOR.CHARCOAL};
`;
