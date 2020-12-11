import styled from "styled-components";

import { COLOR } from "../global/const";

const ITEM_BOX_SIZE = {
  LARGE: "160px",
  SMALL: "97px",
};

export const ProgressBar = ({ 
  children, 
  size = "large", 
  color = COLOR.WHITE 
}) => {

  return <Box size={size} color={color}>{children}</Box>;
};

const Box = styled.div.attrs(props => ({
  size: props.size === "large" ? ITEM_BOX_SIZE.LARGE : ITEM_BOX_SIZE.SMALL,
  color: props.color
}))`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px 5px ${COLOR.SHADOW};
  background: ${props => props.color};
  }
`;