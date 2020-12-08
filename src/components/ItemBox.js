import styled from "styled-components";

import { COLOR } from "../global/const";

export const ItemBox = ({ 
  children, 
  color = COLOR.WHITE,
  type = "large" 
}) => {

  return <Box type={type} color={color} >{children}</Box>;
};

const Box = styled.div.attrs(props => ({
  color: props.color,
  type: props.type,
}))`
  padding: ${(props) => {
    switch (props.type) {
      case "large":
        return `22px 17px 22px 17px`;
      case "small":
        return `8px 5px 8px 5px`;
      default:
        return `none`;
    }
  }};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px 5px ${COLOR.SHADOW};
  background: ${props => props.color};
  top: 0px;

  &:hover {
    position: relative;
    top: -10px;
  }
`;