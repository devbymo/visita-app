import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  border: ${({ border }) => (border ? `${border}px` : '5px')} solid #f3f3f3;
  border-radius: 50%;
  border-top: ${({ border }) => (border ? `${border}px` : '5px')} solid #3498db;
  width: ${({ size }) => (size ? `${size}rem` : '4rem')};
  height: ${({ size }) => (size ? `${size}rem` : '4rem')};
  -webkit-animation: spin ${({ speed }) => (speed ? `${speed}s` : '0.7s')}
    linear infinite; /* Safari */
  animation: spin ${({ speed }) => (speed ? `${speed}s` : '0.7s')} linear
    infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoaderSpiner = (props) => {
  return (
    <StyledSpinner
      border={props.border}
      size={props.size}
      speed={props.spped}
    />
  );
};

export default LoaderSpiner;
