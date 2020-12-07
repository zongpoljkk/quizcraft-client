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
      case "small":
        return "100px";
      default:
        return "160px";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "small":
        return "36px";
      default:
        return "48px";
    }
  }};
  background-color: ${(props) => {
    switch (props.type) {
      case "custom":
        return `${props.backgroundColor}`;
      case "outline":
        return `${COLOR.WHITE}`;
      case "disabled":
        return `${COLOR.SHADOW}`;
      default:
        return `${COLOR.MANDARIN}`;
    }
  }};
  text-align: ${(props) => props.textAlign || "center"};
  font-family: Prompt, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => {
    switch (props.type) {
      case "custom":
        return `${props.color}`;
      case "outline":
        return `${COLOR.MANDARIN}`;
      case "disabled":
        return `${COLOR.WHITE}`;
      default:
        return `${COLOR.WHITE}`;
    }
  }};
  border: ${(props) => {
    switch (props.type) {
      case "custom":
        return `${props.border}`;
      case "outline":
        return `1px solid ${COLOR.MANDARIN}`;
      case "disabled":
        return `1px solid ${COLOR.SHADOW}`;
      default:
        return `none`;
    }
  }};
  border-radius: 10px;
  &:hover {
    transform: scale(1.1);
  }
`;
