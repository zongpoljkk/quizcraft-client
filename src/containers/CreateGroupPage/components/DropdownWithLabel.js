import React from "react";
import styled from "styled-components";

import { Subheader } from "../../../components/Typography";
import { TextField } from "../../../components/TextField";

export const DropdownWithLabel = ({
  label,
  value,
  set_value,
  direction = "column",
  marginBottom
}) => {

  return (
    <Container flexDirection={direction} marginBottom={marginBottom}>
      <div style={{ display: "flex", flex: 1 }}>
        <Subheader>{label}</Subheader>
      </div>
      <div style={{ marginBottom: 8 }}/>
      <TextField
        value={value}
        onChange={e => set_value(e.target.value)}
        placeholder="รหัสผ่าน"
      />
    </Container>
  );
};

const Container = styled.div.attrs(props => ({
  flexDirection: props.flexDirection,
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  margin-bottom: ${props => props.marginBottom}px;
`;