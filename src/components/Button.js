import styled from "styled-components";

// Global
import { COLOR } from "../global/const";

export const Button = styled.button.attrs((props) => ({
  type: props.type,
  size: props.size,
  backgroundColor: props.backgroundColor,
  border: props.border,
  color: props.color
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
        return `${COLOR.SILVER}`;
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
        return `none`;
      default:
        return `none`;
    }
  }};
  border-radius: 10px;
  outline: none;
  &:hover {
    transform: ${(props) => props.type === "disabled" ? null : "scale(1.1)"};
  }
`;