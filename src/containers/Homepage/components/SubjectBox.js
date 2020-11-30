import styled from "styled-components";

// Utils
import { convertHexToRGBA } from "../../../global/utils";

// Colors
import { COLOR } from "../../../global/const";

const subject_box_shadow = convertHexToRGBA(`${COLOR.BLACK}`, 25);

export const SubjectBox = styled.div`
  background-color: ${COLOR.ISLAND_SPICE};
  width: 350px;
  height: 108px;
  border-radius: 10px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: left;
  box-shadow: 0px 1px 3px ${subject_box_shadow};
`;