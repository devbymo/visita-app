import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleButton = styled.div`
  .button {
    font-size: ${(props) => props.fontSize || '1.8rem'};
    font-weight: 500;
    padding: 1.2rem 2.5rem;
    /* border: 1px solid rgba(0, 0, 0, 0.7); */
    border: none;
    border-radius: 0.6rem;
    background-color: ${(props) => props.buttonBackgroundColor || '#2185d0'};
    color: ${(props) => props.buttonTextColor || '#fff'};
    cursor: pointer;
    margin-right: 1rem;
    text-decoration: none;
    display: inline-block;
  }

  .button:focus {
    outline: none;
  }

  .button:hover,
  .button:active {
    background-color: ${(props) =>
      props.buttonBackgroundColorHover || '#1e73be'};
    color: ${(props) => props.buttonTextColorHover || '#fff'};
    /* background: #409ee6; */
  }

  .button--inverse {
    background: transparent;
    color: #000;
  }

  .button--inverse:hover,
  .button--inverse:active {
    color: white;
    background: salmon;
  }

  .button--danger {
    background: #830000;
    border-color: #830000;
  }

  .button--danger:hover,
  .button--danger:active {
    background: #f34343;
    border-color: #f34343;
  }

  .button:disabled,
  .button:hover:disabled,
  .button:active:disabled {
    background: #ccc;
    color: #979797;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = (props) => {
  if (props.href) {
    return (
      <StyleButton
        buttonBackgroundColor={props.buttonBackgroundColor}
        buttonBackgroundColorHover={props.buttonBackgroundColorHover}
        buttonTextColor={props.buttonTextColor}
        buttonTextColorHover={props.buttonTextColorHover}
        buttonFontSize={props.buttonFontSize}
      >
        <a
          className={`button button--${props.size || 'default'} ${
            props.inverse && 'button--inverse'
          } ${props.danger && 'button--danger'}`}
          href={props.href}
        >
          {props.children}
        </a>
      </StyleButton>
    );
  }
  if (props.to) {
    return (
      <StyleButton
        buttonBackgroundColor={props.buttonBackgroundColor}
        buttonBackgroundColorHover={props.buttonBackgroundColorHover}
        buttonTextColor={props.buttonTextColor}
        buttonTextColorHover={props.buttonTextColorHover}
        buttonFontSize={props.buttonFontSize}
      >
        <Link
          to={props.to}
          exact={props.exact}
          className={`button button--${props.size || 'default'} ${
            props.inverse && 'button--inverse'
          } ${props.danger && 'button--danger'}`}
        >
          {props.children}
        </Link>
      </StyleButton>
    );
  }
  return (
    <StyleButton
      buttonBackgroundColor={props.buttonBackgroundColor}
      buttonBackgroundColorHover={props.buttonBackgroundColorHover}
      buttonTextColor={props.buttonTextColor}
      buttonTextColorHover={props.buttonTextColorHover}
      buttonFontSize={props.buttonFontSize}
    >
      <button
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </StyleButton>
  );
};

export default Button;
