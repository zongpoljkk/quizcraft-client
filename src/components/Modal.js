import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";

import { useWindowDimensions } from "../global/util"
import { COLOR } from "../global/const"

export const Modal = ({ 
  isShowing,
  hide,
  children
}) => {

  const ModalContainer = styled.div`
    background-color: ${COLOR.WHITE};
    border-radius: 10px;
    width: 247px;
    padding: 32px;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 1060;
    transform: translate(-50%, -50%)
  `;

  return(
    isShowing ? ReactDOM.createPortal(
      <React.Fragment>
        <Overlay onClick={hide}/>
        <ModalContainer>
          {children}
        </ModalContainer>
      </React.Fragment>, document.body
    ) : null
  );
};

export const FooterModal = ({ 
  isShowing,
  hide,
  backgroundColor = COLOR.WHITE,
  children
}) => {

  const { height, width } = useWindowDimensions();

  const FooterModalContainer = styled.div`
    background-color: ${COLOR.WHITE};
    border-radius: 10px 10px 0px 0px;
    width: ${width-32}px;
    padding: 16px;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    position: fixed;
    top: 100%;
    left: 0;
    z-index: 1100;
    transform: translate(0%, -100%);
  `;

  const ContainerBackground = styled.div`
    background-color: ${backgroundColor};
    opacity:0.2;
    width: ${width}px;
    height: 100%;
    position: fixed;
    top: 100%;
    left: 0;
    transform: translate(0%, -100%);
  `;

  return(
    isShowing ? ReactDOM.createPortal(
      <React.Fragment>
        <Overlay onClick={hide}/>
        <FooterModalContainer>
          <ContainerBackground />
          <div style={{ position: "relative" }}>
            {children}
          </div>
        </FooterModalContainer>
      </React.Fragment>, document.body
    ) : null
  );
};

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.CHARCOAL};
  opacity: 0.6;
`;
