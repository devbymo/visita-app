import React, { useCallback, useReducer, useContext } from 'react';

import styled from 'styled-components';
import Button from '../../shared/components/Button/Button';
import Input from '../../shared/components/Input/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import LoaderSpinner from '../../shared/components/LoaderSpinner/LoaderSpinner';
import { AuthContext } from '../../shared/context/auth-context';

const StyledAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 100vw;
  height: 100vh;
  font-size: 2rem;
  padding-top: 7rem;

  h1 {
    font-size: 4rem;
    font-weight: 500;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 4rem;
    color: #000;
    font-size: 2rem;
    width: 30vw;
    background-color: #ebebeb;
    padding: 3rem 5rem;
    border-radius: 1rem;
    margin-top: 3rem;
  }
`;

const Auth = () => {
  // Managing overall state of the form.
  const initialState = {
    name: {
      value: '',
      isValid: false,
    },
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
    address: {
      value: '',
      isValid: false,
    },
    isFormSubmitted: false,
    isLoading: false,
    isLoginMode: true,
    isFormValid: false,
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let isFormValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            isFormValid = isFormValid && action.isValid;
          } else {
            isFormValid = isFormValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
          isFormValid: isFormValid,
        };
      case 'SET_FORM_SUBMITTED':
        return {
          ...state,
          isFormSubmitted: action.isFormSubmitted,
        };
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.isLoading,
        };
      case 'SET_LOGIN_MODE':
        return {
          ...state,
          isLoginMode: action.isLoginMode,
        };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  // Authantication context.
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const inputChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        inputId: id,
        value: value,
        isValid: isValid,
      });
    },
    [dispatch]
  );

  const authModeHandler = (e) => {
    // Toggle between login and signup mode.
    e.preventDefault();
    dispatch({ type: 'SET_LOGIN_MODE', isLoginMode: !formState.isLoginMode });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    /////////////////////////////
    // Data is valid and can be sent to the server.
    /////////////////////////////

    // Start Loading.
    dispatch({ type: 'SET_LOADING', isLoading: true });

    // set timeout to simulate server response.
    setTimeout(() => {
      if (formState.isLoginMode) {
        // Login.
        console.log('Login');
        console.log(`Email: ${formState.email.value}`);
        console.log(`Password: ${formState.password.value}`);
      } else {
        // Signup.
        console.log('Signup');
        console.log(`Name: ${formState.name.value}`);
        console.log(`Email: ${formState.email.value}`);
        console.log(`Password: ${formState.password.value}`);
        console.log(`Address: ${formState.address.value}`);
      }

      // Update context.
      login();

      // Update the form submmited state.
      dispatch({ type: 'SET_FORM_SUBMITTED', isFormSubmitted: true });

      // Stop Loading.
      dispatch({ type: 'SET_LOADING', isLoading: false });

      // Reset the form.
      // dispatch({ type: 'RESET' });
    }, 700);
  };

  const loginValidityHandler = () => {
    if (formState.email.isValid) {
      if (formState.password.isValid) {
        return false;
      }
    }

    return true;
  };

  const signupValidityHandler = () => {
    if (formState.name.isValid) {
      if (formState.email.isValid) {
        if (formState.password.isValid) {
          if (formState.address.isValid) {
            return false;
          }
        }
      }
    }

    return true;
  };

  return (
    <StyledAuth>
      {isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <>
          <h1>{formState.isLoginMode ? 'Login' : 'Signup'}</h1>
          <form className="form-container">
            {!formState.isLoginMode && (
              <Input
                id="name"
                element="input"
                type="text"
                placeholder="Ex. Mohamed Yasser"
                lable="Name *"
                errorText="Please enter a valid name"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                onInput={inputChangeHandler}
              />
            )}
            {!formState.isLoginMode && (
              <Input
                id="address"
                element="input"
                type="text"
                placeholder="Ex. Egypt - Alexandria"
                lable="Adress *"
                errorText="Please enter a valid address"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                onInput={inputChangeHandler}
              />
            )}
            <Input
              id="email"
              element="input"
              type="email"
              placeholder="Ex. name@gmail.com"
              lable="E-mail *"
              errorText="Please enter a valid email"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              onInput={inputChangeHandler}
            />
            <Input
              id="password"
              element="input"
              type="password"
              placeholder="**********"
              lable="Password *"
              errorText="Please enter a password of at least 5 characters"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              onInput={inputChangeHandler}
            />
            {formState.isLoading ? (
              <LoaderSpinner
                isVisable={true}
                color="#3498db"
                backgroundColor="#f3f3f3"
                size=".5"
                widthAndHeight="4"
                speedInSecond=".6"
              />
            ) : (
              <Button
                onClick={formSubmitHandler}
                disabled={
                  formState.isLoginMode
                    ? loginValidityHandler()
                    : signupValidityHandler()
                }
              >
                {formState.isLoginMode ? 'LOGIN' : 'SIGNUP'}
              </Button>
            )}
            <Button danger onClick={authModeHandler}>
              SWITCH TO {formState.isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
          </form>
        </>
      )}
    </StyledAuth>
  );
};

export default Auth;
