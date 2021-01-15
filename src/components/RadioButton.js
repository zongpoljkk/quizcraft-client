import React from "react";
import styled from "styled-components";

import { COLOR } from "../global/const";

export const RadioButton = ({
  value='',
  selected_value = () => {},
  choices = {},
  direction
}) => {

  return ( 
    <Container direction={direction}>
      {choices?.map((option, i) => (
        <div 
          key={i} 
          style={{ 
            marginBottom: direction === "column" ? (i !== choices.length-1 ? 8 : 0) : 0
          }}
        >
          <Label
            selected={value === option}
          >
            <Input 
              name="answer"
              type="radio"
              value={option}
              checked={value === option}
              onChange={e => selected_value(e.target.value)}
            />
            <Mark selected={value === option}/>
            {option}
          </Label>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div.attrs(props => ({
  direction: props.direction || "column"
}))`
  display: flex;
  flex: 1;
  flex-direction: ${props => props.direction};
  justify-content: space-between;
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
  weigth: props.selected ? 500 : 400
}))`
  position: relative;
  font-family: Prompt, sans-serif;
  font-weight: ${props => props.weigth};
  font-size: 16px;
  color: ${COLOR.CHARCOAL};
`;
