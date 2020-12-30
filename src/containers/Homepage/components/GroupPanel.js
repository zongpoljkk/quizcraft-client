import styled from "styled-components";

// Components
import { Button } from "../../../components/Button";

import { LARGE_DEVICE_SIZE } from "../../../global/const"
import { useWindowDimensions } from "../../../global/utils"

const GroupPanel = () => {
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <GroupDiv justifyContent={screen_width >= LARGE_DEVICE_SIZE ? 'space-evenly' : 'space-between'}>
      <Button type="outline">สร้างกลุ่ม</Button>
      <Button>เข้าร่วมกลุ่ม</Button>
    </GroupDiv>
  );
};

const GroupDiv = styled.div.attrs(props => ({
  justifyContent: props.justifyContent
}))`
  display: flex;
  justify-content: ${props => props.justifyContent};
  flex: 1;
  width: 100%;
`;

export default GroupPanel;
