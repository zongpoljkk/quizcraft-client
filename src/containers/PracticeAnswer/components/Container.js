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
  background-color: ${(props) =>
    props.answer ? correct_background_color : incorrect_background_color};

  min-height: 100vh;
  width: 100%;
  top: 64px;
  left: 0px;

  /* Center and scale the image nicely */
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
