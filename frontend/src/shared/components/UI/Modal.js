import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../Button/Button';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  height: 45vh;
  color: white;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  overflow: hidden;

  .Content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    color: white;
  }

  z-index: 1000;
`;

const StyledOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: ${(props) => (props.show ? 'block' : 'none')};

  background: rgba(49, 49, 49, 0.8);

  z-index: 999;
`;

const Overlay = (props) => {
  const content = (
    <StyledOverlay show={props.show} onClick={props.closeModal}>
      {props.children}
    </StyledOverlay>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('overlay-hook')
  );
};

const Modal = (props) => {
  const test = () => {
    console.log('test');
  };

  const content = (
    <>
      <Overlay show={props.show} closeModal={props.closeModal}></Overlay>
      <StyledModal>
        <div className="Content">{props.children}</div>
        <Button onClick={props.closeModal}>Close</Button>
      </StyledModal>
    </>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
