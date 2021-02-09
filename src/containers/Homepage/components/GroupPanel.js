import styled from "styled-components";

// Components
import { Button } from "../../../components/Button";

import { DEVICE_SIZE } from "../../../global/const"
import { useWindowDimensions } from "../../../global/utils"

const GroupPanel = ({
  onCreateGroupClick = () => {},
  onJoinGroupClick = () => {}
}) => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <GroupDiv justifyContent={screen_width >= DEVICE_SIZE.LARGE ? 'space-evenly' : 'space-between'}>
      <Button
        type="outline"
        onClick={onCreateGroupClick}
      >
        สร้างกลุ่ม
      </Button>
      <Button onClick={onJoinGroupClick}>เข้าร่วมกลุ่ม</Button>
    </GroupDiv>
  );
};

const GroupDiv = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  justify-content: ${props => props.justifyContent};
  width: 100%;
`;

export default GroupPanel;
