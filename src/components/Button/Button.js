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
  background-color: ${(props) => {
    switch (props.type) {
      case "normal":
        return `${COLOR.MANDARIN}`;
      case "outline":
        return `${COLOR.WHITE}`;
      case "disabled":
        return `${COLOR.SHADOW}`;
      default:
        return `${props.backgroundColor}`;
    }
  }};
  text-align: ${(props) => props.textAlign || "center"};
  font-family: Prompt, sans-serif;
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  color: ${(props) => {
     switch (props.type) {
      case "normal":
        return `${COLOR.WHITE}`;
      case "outline":
        return `${COLOR.MANDARIN}`;
      case "disabled":
        return `${COLOR.WHITE}`;
      default:
        return `${props.color}`;
    }
  }};
  border: ${(props) => {
     switch (props.type) {
      case "normal":
        return `1px solid ${COLOR.WHITE}`;
      case "outline":
        return `1px solid ${COLOR.MANDARIN}`;
      case "disabled":
        return `1px solid ${COLOR.SHADOW}`;
      default:
        return `${props.border}`;
    }
  }};
  border-radius: ${(props) => props.borderRadius || "10px"};

  &:hover {
    transform: scale(1.1);
  }
`;

export const LINE_HEIGHT = "1.2em";
export const BUTTON_RADIUS = "10px";
