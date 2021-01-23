import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";

import { useWindowDimensions } from "../global/utils";
import { COLOR } from "../global/const";

export const Modal = ({ 
  isShowing,
  hide,
  overlay_clickable = true,
  children
}) => {

  return(
    isShowing ? ReactDOM.createPortal(
      <React.Fragment>
        <Overlay onClick={overlay_clickable ? hide : null}/>
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
  overlay_clickable = true,
  children
}) => {

  const { height, width } = useWindowDimensions();

  return(
    isShowing ? ReactDOM.createPortal(
      <React.Fragment>
        <Overlay onClick={overlay_clickable ? hide : null}/>
        <FooterModalContainer width={width}>
          <ContainerBackground width={width} backgroundColor={backgroundColor}/>
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

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  min-width: 247px;
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

const FooterModalContainer = styled.div.attrs(props => ({
  width: props.width
}))`
  background-color: ${COLOR.WHITE};
  border-radius: 10px 10px 0px 0px;
  width: ${props => props.width-32}px;
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

const ContainerBackground = styled.div.attrs(props => ({
  width: props.width,
  backgroundColor: props.backgroundColor
}))`
  background-color: ${props => props.backgroundColor};
  opacity:0.2;
  width: ${props => props.width}px;
  height: 100%;
  position: fixed;
  top: 100%;
  left: 0;
  transform: translate(0%, -100%);
`;