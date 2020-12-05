import React from "react";
import styled from "styled-components";

import close_icon from "../assets/icon/close.png";
import close_gloden_tainoi_icon from "../assets/icon/close_gloden_tainoi.png";
import skip_icon from "../assets/icon/skip.png";

import { COLOR } from "../global/const";

export const CloseIcon = ({
  color = COLOR.SILVER
}) => {

  const CloseIcon = styled.img`
    height: 16px;
    width: 16px;
  `;

  return (
    <div>
      { color === COLOR.SILVER &&
        <CloseIcon src={close_icon}/>
      }
      { color === COLOR.GOLDEN_TAINOI &&
        <CloseIcon src={close_gloden_tainoi_icon}/>
      }
    </div>
  );
};

export const SkipIcon = () => {

  const SkipIcon = styled.img`
    height: 20px;
  `;

  return ( 
    <SkipIcon src={skip_icon}/>
  );
};