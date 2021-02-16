import React from "react";
import styled from "styled-components";
import useSound from 'use-sound';

import { DisplayText } from "./HandleText";

import { COLOR, CONTAINER_PADDING } from "../global/const";
import { useWindowDimensions, convertHexToRGBA } from "../global/utils";

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
  disabled_select
}) => {

  const [play] = useSound(radio_button_select, { volume: 0.2 });
  const { height: screen_height, width: screen_width } = useWindowDimensions();

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
          onClick={() => disabled_select ? null : play()}
        >
          <Label text={text} selected={value === option}>
            <Input
              name="answer"
              type="radio"
              value={option}
              checked={value === option}
              onChange={(e) => {
                if(!disabled_select) {
                  selected_value(e.target.value);
                };
              }}
            />
            <Mark selected={value === option} />
            {subject === "คณิตศาสตร์" ? (
              <MathChoice
                width = {screen_width - CONTAINER_PADDING - 42}
                onClick={(e) => {
                  if(!disabled_select) {
                    selected_value(option);
                  };
                }}
              >
                <DisplayText content={option} />
              </MathChoice>
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

const MathChoice = styled.label.attrs(props => ({
  width: props.width
}))`
  max-width: ${props => props.width}px;
  overflow-x: scroll;
  overflow-y: hidden;
  outline: none;
  margin-bottom: 2px;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${convertHexToRGBA(COLOR.CHARCOAL, 40)};
  }
`;