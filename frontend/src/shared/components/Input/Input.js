import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { validate } from '../../util/validators';

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 0.4rem;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  /* padding: 0 2rem; */

  label {
    font-size: 3rem;
    font-weight: 500;
    align-self: flex-start;
  }

  input {
    width: 100%;
    height: 2rem;
    border-radius: 0.5rem;
    padding: 3rem 1.5rem;
    font-size: 2rem;
    border: 2px solid
      ${(props) => (!props.isValid && props.isTouched ? '#ff0000' : '#fff')};
  }

  input:focus {
    outline: none;
    border-color: #2185d0;
  }

  textarea {
    min-width: 100%;
    height: 20rem;
    border: 2px solid #fff;
    border-radius: 0.5rem;
    padding: 2rem 1.5rem;
    font-size: 2rem;
    resize: none;
    align-self: flex-start;
    border-color: ${(props) =>
      !props.isValid && props.isTouched ? '#ff0000' : '#fff'};
  }

  textarea:focus {
    outline: none;
    border-color: #2185d0;
  }

  .error-text {
    color: #ff0000;
    font-size: 1.7rem;
    align-self: flex-start;
  }
`;

// useReducer properties:
// 1. reducer: function that takes [state] and [action] as arguments and returns [new state]
// 2. initialState: initial state of the reducer
// 3. children: function that takes state and dispatch as arguments and returns JSX
// 4. initializer: function that takes state and action as arguments and returns new state

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return {
        ...state,
        value: action.value,
        isValid: true,
      };
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // State management with useReducer.
  const initialState = {
    value: '',
    isValid: false,
    isTouched: false,
  };
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const defaultRowsValue = 10;

  // Input change handler.
  const onInputChangeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: props.validators,
    });
  };

  // Input touch handler.
  const onInputTouchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  // Forwards the input state values to the parent component.
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  // Element to display.
  const element =
    props.element === 'textarea' ? (
      <textarea
        id={props.id}
        rows={props.rows || defaultRowsValue}
        onChange={onInputChangeHandler}
        onBlur={onInputTouchHandler}
        value={props.value}
      />
    ) : (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onInputChangeHandler}
        onBlur={onInputTouchHandler}
        value={props.value}
      />
    );

  return (
    <StyledInput isValid={inputState.isValid} isTouched={inputState.isTouched}>
      <label htmlFor={props.id}>{props.lable}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="error-text">{props.errorText}</p>
      )}
    </StyledInput>
  );
};

export default Input;
