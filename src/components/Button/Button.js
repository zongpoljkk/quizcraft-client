import styled from "styled-components";

// Global
import { COLOR } from "../../global/const";

export const Button = styled.button.attrs((props) => ({
  // static props
  type: props.type || "default",
  // dynamic props
  size: props.size || "normal",
}))`
  width: ${(props) => {
    switch (props.size) {
      case "normal":
        return "160px";
      default:
        return "200px";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "normal":
        return "48px";
      default:
        return "200px";
    }
  }};
  background-color: ${(props) => props.backgroundColor || `${COLOR.WHITE}`};
  text-align: ${(props) => props.textAlign || "center"};
  font-family: Prompt, sans-serif;
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  color: ${(props) => props.textColor || `${COLOR.MANDARIN}`};
  border: ${(props) => props.border || `1px solid ${COLOR.MANDARIN}`};
  border-radius: ${(props) => props.borderRadius || "10px"};

  &:hover {
    transform: scale(1.1);
  }
`;

export const LINE_HEIGHT = "1.2em";
export const BUTTON_RADIUS = "10px";
