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
import Modal from '../../shared/components/UI/Modal';
import LoaderSpinner from '../../shared/components/LoaderSpinner/LoaderSpinner';
import ReactStars from 'react-rating-stars-component';

const StyledNewPlace = styled.div`
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
    gap: 2rem;
    color: #000;
    font-size: 2rem;
    width: 35vw;
    background-color: #ebebeb;
    padding: 3rem 5rem;
    border-radius: 1rem;
    margin-top: 3rem;
  }
`;

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
  isFormSubmitted: false,
  isLoading: false,
};

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
          rating: action.ratingValue,
        },
      };
    case 'RESET':
      return initialState;
    case 'FORM_SUBMITTED':
      return {
        ...state,
        isFormSubmitted: action.isFormSubmitted,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  // Managing the overall (form) state.
  const [formState, dispatch] = useReducer(formReducer, initialState);

  // But we might face a problem if any state of this component is changed it will re-render the whole component.
  // and this function will re-created again and again.
  // which might create an infinate loop because this function is a dependency in the Input component.
  // for avoiding re-creating this function if NewPlace component is re-rendered again we should use the callback hook.
  // Get the values of the input.

  // Updated every time the input changes - live connection.
  const inputChangedHandler = useCallback(
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
    // console.log(`Lat: ${lat}`);
    // console.log(`Lng: ${lng}`);
    // console.log(`ShortName: ${address.shortName}`);
    // console.log(`LongName: ${address.longName}`);
    // console.log(`Country: ${address.country}`);

    // Validate the location.
    if (
      lat &&
      lng &&
      address.shortName &&
      address.longName &&
      address.country
    ) {
      // Add the captured location.
      dispatch({
        type: 'PICK_LOCATION',
        lat: lat,
        lng: lng,
        shortName: address.shortName,
        longName: address.longName,
        country: address.country,
      });

      // Set [address] auto complete.
      dispatch({
        type: 'INPUT_CHANGE',
        value: `${address.country} - ${address.shortName}`,
        isValid: true,
        inputId: 'address',
      });

      // Set [title] auto complete.
      dispatch({
        type: 'INPUT_CHANGE',
        value: address.longName,
        isValid: true,
        inputId: 'title',
      });
    }
  };

  // Recive ratingValue from Rating component.
  const ratingChangedHandler = (value) => {
    dispatch({
      type: 'RATING_CHANGE',
      ratingValue: value,
    });
  };

  const closeModalHandler = () => {
    // By resetting the form we can close the modal.
    dispatch({
      type: 'RESET',
    });
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    // Start loading.
    dispatch({
      type: 'LOADING',
      isLoading: true,
    });

    // for Testing.
    setTimeout(() => {
      // Here our data is valid and we can send it to the server.
      console.log(formState);

      // Update form submmited state.
      dispatch({
        type: 'FORM_SUBMITTED',
        isFormSubmitted: true,
      });

      // Stop loading.
      dispatch({
        type: 'LOADING',
        isLoading: false,
      });
    }, 700);
  };

  // For testing only.
  if (formState.isFormSubmitted) {
    console.log(formState);
  }

  return (
    <StyledNewPlace>
      {formState.isFormSubmitted ? (
        <Modal
          show={formState.isFormSubmitted}
          closeModal={closeModalHandler}
          width="30vw"
          height="20vh"
          modalBackgroundColor="#fff"
          modalTextColor="#000"
          modalFontSize="2.2rem"
          modalBorderRadius="10px"
          modalBorder="1px solid #fff"
          modalPadding="0 0 3rem 0"
          overlayBackgroundColor="rgba(0,0,0,0.65)"
          button={true}
          buttonText="Ok"
          buttonBackgroundColor="#00b894"
          buttonBackgroundColorHover="#00a88e"
          buttonTextColor="#fff"
          buttonTextColorHover="#fff"
        >
          The new place added sussessfully.
        </Modal>
      ) : null}
      <h1>Add New Place</h1>
      <form className="form-container">
        <Input
          id="title"
          element="input"
          type="text"
          placeholder="Ex. Smouha"
          lable="Title *"
          errorText="Please enter a valid name"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(30),
            VALIDATOR_MINLENGTH(2),
          ]}
          onInput={inputChangedHandler}
          value={formState.requiredInputs.title.value}
          disabled
        />
        <Input
          id="address"
          element="input"
          type="text"
          placeholder="Ex. Egypt - Alexandria"
          lable="Address *"
          errorText="Please enter a valid address"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(30),
            VALIDATOR_MINLENGTH(2),
          ]}
          onInput={inputChangedHandler}
          value={formState.requiredInputs.address.value}
          disabled
        />
        <GetUserLocation
          onPickLocation={userLocationHandler}
          isFormSubmitted={formState.isFormSubmitted}
        />
        <Input
          id="description"
          element="textarea"
          rows="10"
          lable="Description *"
          errorText="Please enter a discription of at least 10 characters"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(5),
            VALIDATOR_MAXLENGTH(500),
          ]}
          onInput={inputChangedHandler}
          value={formState.requiredInputs.description.value}
        />
        <ReactStars
          count={5}
          onChange={ratingChangedHandler}
          size={35}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          value={formState.optionalInputs.rating}
        />
        {!formState.isLoading && (
          <Button
            onClick={onFormSubmitHandler}
            disabled={!formState.isFormValid}
          >
            ADD PLACE
          </Button>
        )}
        <div className="loading-container">
          {formState.isLoading && (
            <LoaderSpinner
              isVisable={true}
              color="#3498db"
              backgroundColor="#f3f3f3"
              size=".5"
              widthAndHeight="4"
              speedInSecond=".6"
            />
          )}
        </div>
      </form>
    </StyledNewPlace>
  );
};

export default NewPlace;
