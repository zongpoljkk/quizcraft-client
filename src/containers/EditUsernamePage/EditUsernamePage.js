import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { Subheader, Body } from "../../components/Typography";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";

import { COLOR } from "../../global/const"

import { useEditUsername } from "./EditUsernameHelper";

// MOCK DATA
const USERNAME = "ชื่อผู้ใช้";
const USER_ID = "5fdf83e69de2582261da443e";

const EditUsernamePage = ({ history }) => {

  const [new_username, set_new_username] = useState('');
  const { editUsername, edited_username, error_message } = useEditUsername(USER_ID, new_username);

  const handleClick = () => {
    editUsername(USER_ID, new_username);
    set_new_username("");
  };

  const engToThai = (error_message) => {
    switch (error_message) {
      case "Username cannot be blank!":
        return "ชื่อผู้ใช้ไม่สามารถเว้นว่างได้"
      case "already have this username!":
        return "ชื่อผู้ใช้นี้มีคนใช้แล้ว"
      case "userId not match userId that decoded from token!":
        return "ไม่อนุญาตให้แก้ชื่อผู้ใช้ของบัญชีอื่น"
      default:
        return "ชื่อผู้ใช้มีรูปแบบไม่ถูกต้อง"
    }
  }

  useEffect(() => {
    if (edited_username) {
      history.push("/profile");
    }
  }, [edited_username]);

  return (
    <Container>
      <TextfieldContainer marginBottom={24}>
        <Subheader>ชื่อผู้ใช้เดิม</Subheader>
        <div style={{ marginBottom: 8 }}/>
        <UsernameContainer>
          <Subheader>{USERNAME}</Subheader>
        </UsernameContainer>
      </TextfieldContainer>
      <TextfieldContainer marginBottom={36}>
        <Subheader>ชื่อผู้ใช้ใหม่</Subheader>
        <div style={{ marginBottom: 8 }}/>
        <TextField
          value={new_username}
          onChange={e => set_new_username(e.target.value)}
        />
        {error_message ?
          <div style={{marginTop: "8px"}}>
            <Body props color = {COLOR.MANDARIN}> {engToThai(error_message)} </Body>
          </div>
      : null}
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

export default withRouter(EditUsernamePage);
