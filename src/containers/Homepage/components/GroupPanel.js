import styled from "styled-components";

// Components
import { Button } from "../../../components/Button/Button";

// Global
import { COLOR } from "../../../global/const";

const GroupDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 350px;
`;

const GroupPanel = () => {
  return (
    <GroupDiv>
      <Button type="outline">สร้างกลุ่ม</Button>
      <Button>เข้าร่วมกลุ่ม</Button>
    </GroupDiv>
  );
};

export default GroupPanel;
