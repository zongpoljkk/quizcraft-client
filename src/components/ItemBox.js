import styled from "styled-components";

import { COLOR } from "../global/const";

const ITEM_BOX_SIZE = {
  LARGE: "160px",
  SMALL: "97px",
};

export const ItemBox = ({ 
  children, 
  size = "large", 
  color = COLOR.WHITE 
}) => {
  const ItemBox = styled.div`
    width: ${size === "large" ? ITEM_BOX_SIZE.LARGE : ITEM_BOX_SIZE.SMALL};
    height: ${size === "large" ? ITEM_BOX_SIZE.LARGE : ITEM_BOX_SIZE.SMALL};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 2px 5px #d9d9d9;
    background: ${color};
    }
  `;
  return <ItemBox>{children}</ItemBox>;
};