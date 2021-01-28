import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Body, Header, Subheader } from "../../components/Typography";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { ConfirmResultModal } from "../../components/ConfirmResultModal";
import useModal from "../../components/useModal";
import LoadingPage from "../LoadingPage/LoadingPage";

import { COLOR } from "../../global/const";

import { useJoinGroup } from "./JoinGroupPageHelper";

const JoinGroupPage = ({ history }) => {
  const [pin, set_pin] = useState('');
  const user_id = localStorage.getItem("userId");
  const [isShowing, toggle] = useModal();

  const {
    joinGroup,
    loading,
    group_id,
    join_fail
  } = useJoinGroup();

  const onSuccess = () => {
    history.push({
      pathname: "waiting-room", 
      state: {
        group_id: group_id
      }
    });
  };

  useEffect(() => {
    if(join_fail) {
      set_pin('');
    };
  }, [join_fail]);

  return (
    <Container>
      <Header>เข้าร่วมกลุ่ม</Header>
      {loading && <LoadingPage overlay={true}/>}
      <ContentContainer>
        <Subheader>รหัสเข้าร่วมกลุ่ม</Subheader>
        <div style={{ marginBottom: 8 }}/>
        <TextField
          value={pin}
          onChange={e => set_pin(e.target.value)}
          placeholder="รหัสผ่าน"
        />
        {join_fail &&
          <div style={{ marginTop: 4 }}>
            <Body color={COLOR.MANDARIN}>มีข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</Body>
          </div>
        }
      </ContentContainer>
      <Button
        type={pin ? "default" : "disabled"}
        onClick={() => {
          if(pin) {
            joinGroup(user_id, pin, toggle);
          };
        }}
      >
        ยืนยัน
      </Button>
      <ConfirmResultModal
        isShowing={isShowing}
        toggle={toggle}
        success={group_id}
        success_description="คุณเป็นสมาชิกของกลุ่มแล้ว ยินดีต้อนรับ :)"
        fail_description="มีข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
        onSubmit={() => {
          if(group_id) {
            onSuccess();
          };
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 36px;
`;

export default withRouter(JoinGroupPage);
