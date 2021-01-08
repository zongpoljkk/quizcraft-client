import React from "react";
import styled from "styled-components";

import { Subheader } from "../../../components/Typography";
import { Dropdown } from "../../../components/Dropdown";

export const DropdownWithLabel = ({
  label,
  value,
  set_value,
  options,
  direction = "column",
  marginBottom
}) => {

  return (
    <Container
      flexDirection={direction}
      marginBottom={marginBottom}
    >
      <div style={direction === "column" ? { marginBottom: 8 } : { marginTop: 4, marginRight: 24 }}>
        <Subheader>{label}</Subheader>
      </div>
      <Dropdown
        options={options}
        value={value}
        set_value={set_value}
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