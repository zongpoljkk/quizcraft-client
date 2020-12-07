import styled from "styled-components";

// Utils
import { convertHexToRGBA } from "../../../global/utils";

// Global
import { COLOR } from "../../../global/const";

export const correct_background_color = convertHexToRGBA(`${COLOR.CELERY}`, 20);
export const incorrect_background_color = convertHexToRGBA(
  `${COLOR.TRINIDAD}`,
  20
);

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
