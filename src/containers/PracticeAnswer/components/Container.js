import styled from "styled-components";

// Utils
import {convertHexToRGBA} from "../../../global/utils";

// Global
import {CELERY, TRINIDAD} from "../../../global/const";

 export const correct_background_color = convertHexToRGBA(`${CELERY}`, 20);
 export const incorrect_background_color = convertHexToRGBA(`${TRINIDAD}`, 20);

 export const Container = styled.div`
   background-color: ${(props) =>
     props.answer ? correct_background_color : incorrect_background_color};
   height: 100%;
 `;
