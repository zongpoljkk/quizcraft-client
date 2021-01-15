import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Header, Subheader } from "../../components/Typography";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";

const JoinGroupPage = ({ history }) => {
  const [pin, set_pin] = useState();

  return (
    <Container>
      <Header>เข้าร่วมกลุ่ม</Header>
      <ContentContainer>
        <Subheader>รหัสเข้าร่วมกลุ่ม</Subheader>
        <div style={{ marginBottom: 8 }}/>
        <TextField
          value={pin}
          onChange={e => set_pin(e.target.value)}
          placeholder="รหัสผ่าน"
        />
      </ContentContainer>
      <Button onClick={() => { history.push("waiting-room"); }}>
        ยืนยัน
      </Button>
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
