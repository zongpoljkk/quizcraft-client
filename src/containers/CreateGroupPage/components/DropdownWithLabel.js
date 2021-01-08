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
      alignItems={direction === "column" ? null : "center"}
      marginBottom={marginBottom}
    >
        <Subheader>{label}</Subheader>
      <div style={direction === "column" ? { marginBottom: 8 } : { marginRight: 24 }}/>
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
  alignItems: props.alignItems,
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  align-items: ${props => props.alignItems};
  margin-bottom: ${props => props.marginBottom}px;
`;