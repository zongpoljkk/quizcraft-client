import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";

import { COLOR } from "../global/const"

export const Modal = ({ 
  isShowing, 
  hide, 
  children 
}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <Overlay onClick={hide}/>
      <ModalContainer>
        {children}
      </ModalContainer>
  </React.Fragment>, document.body
) : null;

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
