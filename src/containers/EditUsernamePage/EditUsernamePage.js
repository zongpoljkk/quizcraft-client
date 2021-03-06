import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Subheader, Body } from "../../components/Typography";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";

import { COLOR } from "../../global/const";

import { useEditUsername, engToThai } from "./EditUsernameHelper";

const EditUsernamePage = ({ history }) => {
  const location = useLocation();
  const [new_username, set_new_username] = useState('');
  const { editUsername, edited_username, error_message } = useEditUsername(location.state.user_id, new_username);

  const handleClick = () => {
    editUsername(location.state.user_id, new_username);
    set_new_username("");
  };

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
          <Subheader>{location.state.username}</Subheader>
        </UsernameContainer>
      </TextfieldContainer>
      <TextfieldContainer marginBottom={36}>
        <Subheader>ชื่อผู้ใช้ใหม่</Subheader>
        <div style={{ marginBottom: 8 }}/>
        <TextField
          value={new_username}
          onChange={e => set_new_username(e.target.value)}
          placeholder="ชื่อผู้ใช้ใหม่"
        />
        {error_message &&
          <div style={{marginTop: "8px"}}>
            <Body props color = {COLOR.MANDARIN}> {engToThai(error_message)} </Body>
          </div>
        }
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
