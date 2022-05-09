import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import styled from 'styled-components';

const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;

  background: rgba(49, 49, 49, 0.8);
`;

const Modal = (props) => {
  const content = (
    <>
      {props.showModal && (
        <StyledModal StyledModal>
          <div className="modal-content">Modal Content</div>
          <Button reverse onClick={props.toggleModal}>
            Close
          </Button>
        </StyledModal>
      )}
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
