import react from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

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
`;

const Overlay = (props) => {
  const content = (
    <StyledOverlay show={props.show} onClick={props.closeMenu}></StyledOverlay>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('overlay-hook')
  );
};

export default Overlay;
