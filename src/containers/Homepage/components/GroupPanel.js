import styled from "styled-components";

// Components
import { Button } from "../../../components/Button/Button";

// Global
import { COLOR } from "../../../global/const";

const GroupDiv = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 350px;
`;

const GroupPanel = () => {
  return (
    <GroupDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "350px",
        }}
      >
        <Button type="outline">สร้างกลุ่ม</Button>
        <Button >
          เข้าร่วมกลุ่ม
        </Button>
      </div>
    </GroupDiv>
  );
};

export default GroupPanel;