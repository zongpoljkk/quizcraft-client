import styled from "styled-components";
import { COLOR, SIZE } from "../global/const";

export const ItemBox = ({ children, size = SIZE.LARGE, color = COLOR.WHITE }) => {
  const ItemBox = styled.div`
    width: ${size};
    height: ${size};
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
