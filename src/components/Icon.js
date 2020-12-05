import React from "react";
import styled from "styled-components";

import close_icon from "../assets/icon/close.png";
import hint_icon from "../assets/icon/hint.png";
import skip_icon from "../assets/icon/skip.png";

export const CloseIcon = () => {

  const CloseIcon = styled.img`
    height: 16px;
    width: 16px;
  `;

  return ( 
    <CloseIcon src={close_icon}/>
  );
};

export const HintIcon = () => {

  const HintIcon = styled.img`
    height: 22px;
  `;

  return ( 
    <HintIcon src={hint_icon}/>
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