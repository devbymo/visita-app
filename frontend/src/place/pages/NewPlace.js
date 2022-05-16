import React, { useCallback, useReducer } from 'react';
import styled from 'styled-components';
import Input from '../../shared/components/Input/Input';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import Button from '../../shared/components/Button/Button';
import GetUserLocation from '../components/GetUserLocation';
import Rating from '../../shared/components/Rating/Rating';

const StyledNewPlace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 100vw;
  height: 100vh;
  font-size: 2rem;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
    color: #000;
    font-size: 2rem;
    width: 40vw;
    background-color: #ebebeb;
    padding: 3rem 5rem;
    border-radius: 1rem;
    margin-top: 7rem;
  }
`;

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let isFormValid = true;
      for (const inputId in state.requiredInputs) {
        if (inputId === action.inputId) {
          // if the input id is the same as the one we are updating.
          // Merge it with other inputs validation vlaues.
          isFormValid = isFormValid && action.isValid;
        } else {
          // if the input id is not the same as the one we are updating.
          // Continue validate the other inputs values.
          isFormValid = isFormValid && state.requiredInputs[inputId].isValid;
        }
      }
      return {
        ...state,
        requiredInputs: {
          ...state.requiredInputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isFormValid: isFormValid,
      };
    case 'PICK_LOCATION':
      return {
        ...state,
        optionalInputs: {
          ...state.optionalInputs,
          location: {
            lat: action.lat,
            lng: action.lng,
            shortName: action.shortName,
            longName: action.longName,
            country: action.country,
          },
        },
      };
    case 'RATING_CHANGE':
      return {
        ...state,
        optionalInputs: {
          ...state.optionalInputs,
          rating: action.rating,
        },
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  // Managing the overall (form) state.
  const initialState = {
    requiredInputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    optionalInputs: {
      rating: 0,
      location: {
        lat: 0,
        lng: 0,
        shortName: '',
        longName: '',
        country: '',
      },
    },
    isFormValid: false,
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  // But we might face a problem if any state of this component is changed it will re-render the whole component.
  // and this function will re-created again and again.
  // which might create an infinate loop because this function is a dependency in the Input component.
  // for avoiding re-creating this function if NewPlace component is re-rendered again we should use the callback hook.
  // Get the values of the input.

  // Updated every time the input changes - live connection.
  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  // Recive the location from the GetUserLocation component.
  const userLocationHandler = (lat, lng, address) => {
    console.log(`Lat: ${lat}`);
    console.log(`Lng: ${lng}`);
    console.log(`ShortName: ${address.shortName}`);
    console.log(`LongName: ${address.longName}`);
    console.log(`Country: ${address.country}`);

    dispatch({
      type: 'PICK_LOCATION',
      lat: lat,
      lng: lng,
      shortName: address.shortName,
      longName: address.longName,
      country: address.country,
    });
  };

  // Recive ratingValue from Rating component.
  const ratingHandler = (ratingValue) => {
    console.log(ratingValue);
    dispatch({
      type: 'RATING_CHANGE',
      ratingValue: ratingValue,
    });
  };

  // Reset the form.
  const resetFormHandler = () => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: '',
      isValid: false,
    });
    dispatch({
      type: 'INPUT_CHANGE',
      value: '',
      isValid: false,
    });
    dispatch({
      type: 'INPUT_CHANGE',
      value: '',
      isValid: false,
    });
    dispatch({
      type: 'PICK_LOCATION',
      lat: 0,
      lng: 0,
      shortName: '',
      longName: '',
      country: '',
    });
    dispatch({
      type: 'RATING_CHANGE',
      ratingValue: 0,
    });
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(`Required inputs: ${JSON.stringify(formState.requiredInputs)}`);
    console.log(`Optional inputs: ${JSON.stringify(formState.optionalInputs)}`);
    console.log(`Form is valid: ${formState.isFormValid}`);
    // Here our data is valid and we can send it to the server.

    // Reset the form.
    resetFormHandler();
  };

  return (
    <StyledNewPlace>
      <form>
        <Input
          id="title"
          element="input"
          type="text"
          placeholder="Ex. Mohamed Salah"
          lable="Title *"
          errorText="Please enter a valid name"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(30),
            VALIDATOR_MINLENGTH(2),
          ]}
          onInput={inputHandler}
          value={formState.requiredInputs.title.value}
        />
        <Input
          id="address"
          element="input"
          type="text"
          placeholder="Ex. Egypt/Alexandria"
          lable="Address *"
          errorText="Please enter a valid address"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(30),
            VALIDATOR_MINLENGTH(2),
          ]}
          onInput={inputHandler}
          value={formState.requiredInputs.address.value}
        />
        <GetUserLocation onPickLocation={userLocationHandler} />
        <Input
          id="description"
          element="textarea"
          rows="10"
          lable="Description *"
          errorText="Please enter a discription of at least 10 characters"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(5),
            VALIDATOR_MAXLENGTH(200),
          ]}
          onInput={inputHandler}
          value={formState.requiredInputs.description.value}
        />
        <Rating
          onRating={ratingHandler}
          ratingValue={formState.optionalInputs.rating}
        />
        <Button onClick={onFormSubmitHandler} disabled={!formState.isFormValid}>
          ADD PLACE
        </Button>
      </form>
    </StyledNewPlace>
  );
};

export default NewPlace;
