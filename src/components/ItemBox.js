import styled from "styled-components";
import useSound from 'use-sound';

import { COLOR } from "../global/const";

import click from "../assets/sounds/click.mp3";

export const ItemBox = ({ 
  children, 
  color = COLOR.WHITE,
  type = "large",
  shadow = "box", 
  maxWidth,
  width,
  height,
  cursor
}) => {

  const [play] = useSound(click, { volume: 0.25 });

  return (
    <Box 
      type={type}
      color={color}
      shadow={shadow}
      maxWidth={maxWidth}
      width={width}
      height={height}
      onClick={play}
      cursor={cursor}
    >
      {children}
    </Box>
  );
};

const Box = styled.div.attrs(props => ({
  color: props.color,
  type: props.type,
  shadow: props.shadow,
  width: props.width || null,
  cursor: props.cursor
}))`
  padding: ${(props) => {
    switch (props.type) {
      case "frame":
        return `24px 16px 24px 16px`;
      case "large":
        return `22px 17px 22px 17px`;
      case "small":
        return `8px 5px 8px 5px`;
      default:
        return `none`;
    }
  }};
  box-shadow: ${(props) => {
    switch (props.shadow) {
      case "frame":
        return `0px 0px 4px ${COLOR.SHADOW}`;
      case "box":
        return `1px 2px 4px ${COLOR.SHADOW}`;
      default:
        return `none`;
    }
  }};
  border-radius: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.color};
  max-width: ${props => props.maxWidth}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: ${props => props.cursor};
  top: 0px;
  &:hover {
    position: ${props => props.type === "frame" ? "static" : "relative"};
    top: ${props => props.type === "frame" ? 0 : -10}px;
  }
`;