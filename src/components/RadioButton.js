import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Body } from "./Typography";

import { COLOR } from "../global/const"

export const RadioButton = ({
  value='',
  selected_value = () => {},
  choices = {},
  direction = "column"
}) => {

  const { register, watch } = useForm();

  const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: ${direction};
    justify-content: space-between;
    align-items: flex-start;
  `;

  const Radio = styled.input.attrs(props => ({
    type: "radio"
  }))`
    height: 16px;
    width: 16px;
    margin-right: 8px;
    &::before {
      background: ${COLOR.MANDARIN};
    }
  `;

  return ( 
    <Container>
      {choices?.map((option, i) => (
        <div key={i} style={{ marginBottom: i !== choices.length-1 ? 8 : 0 }}>
          <Body>
            <Radio 
              name="answer"
              value={option}
              ref={register}
              checked={value === option}
              onChange={e => selected_value(e.target.value)}
            />
            {option}
          </Body>
        </div>
      ))}
    </Container>
  );
};
