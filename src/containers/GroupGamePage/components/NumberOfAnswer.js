import React from "react";
import styled from "styled-components";

import { Header, Body } from "../../../components/Typography";
import { Button } from "../../../components/Button";

import { COLOR } from "../../../global/const";

export const NumberOfAnswer = ({
  number_of_answer,
  number_of_members,
  button_title,
  onNext = () => {}
}) => {

  return (
    <Container>
      <NumberContainer backgroundColor={COLOR.GOLDEN_TAINOI}>
        <Header color={COLOR.WHITE}>{number_of_answer}</Header>
        <div style={{ marginBottom: 2 }}>
          <Body color={COLOR.ISLAND_SPICE}> /{number_of_members}</Body>
        </div>
      </NumberContainer>
      <Button
        type="custom"
        size="small"
        border={`1px solid ${COLOR.GOLDEN_TAINOI}`}
        backgroundColor={COLOR.WHITE}
        color={COLOR.GOLDEN_TAINOI}
        onClick={onNext}
      >
        {button_title}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberContainer = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${props => props.backgroundColor};
  border-radius: 12px;
  padding: 0px 8px 0px 8px;
  margin-right: 24px;
`;