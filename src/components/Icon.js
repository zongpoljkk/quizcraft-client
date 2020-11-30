import React from "react";
import styled from "styled-components";

import close_icon from "../assets/icon/close.png";

export const CloseIcon = () => {

  const CloseIcon = styled.img`
    height: 16px;
    width: 16px;
  `;

  return ( 
    <CloseIcon src={close_icon}/>
  );
};