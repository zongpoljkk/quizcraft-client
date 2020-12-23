import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { Subheader } from "../../components/Typography";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";

import { COLOR } from "../../global/const"

const EditUsernamePage = () => {

  const location = useLocation();
  const [new_username, set_new_username] = useState('');

  const handleClick = () => {
    // TODO: connect API edit username
    console.log({new_username});
  };

  return (
    <Container>
      <TextfieldContainer marginBottom={24}>
        <Subheader>ชื่อผู้ใช้เดิม</Subheader>
        <div style={{ marginBottom: 8 }}/>
        <UsernameContainer>
          <Subheader>{location.state.username}</Subheader>
        </UsernameContainer>
      </TextfieldContainer>
      <TextfieldContainer marginBottom={36}>
        <Subheader>ชื่อผู้ใช้ใหม่</Subheader>
        <div style={{ marginBottom: 8 }}/>
        <TextField
          value={new_username}
          onChange={e => set_new_username(e.target.value)}
        />
      </TextfieldContainer>
      <Button
        type={new_username ? "default" : "disabled"}
        onClick={handleClick}
      >ยืนยัน</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
  
const TextfieldContainer = styled.div.attrs(props => ({
  marginBottom: props.marginBottom
}))`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  margin-bottom: ${props => props.marginBottom}px;
`;

const UsernameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 100%;
  background-color: ${COLOR.ISLAND_SPICE};
  border-radius: 10px;
`;

export default EditUsernamePage;
