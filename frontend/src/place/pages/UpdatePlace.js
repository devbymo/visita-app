import React, { useCallback, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../../shared/components/Input/Input';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import Button from '../../shared/components/Button/Button';
import Modal from '../../shared/components/UI/Modal';
import LoaderSpinner from '../../shared/components/LoaderSpinner/LoaderSpinner';
import ReactStars from 'react-rating-stars-component';
import PlaceNotFound from '../components/PlaceNotFound';

const DUMMY_PLACES = [
  {
    id: 1,
    imageURL:
      'https://media.istockphoto.com/photos/paris-aerial-panorama-with-river-seine-and-eiffel-tower-france-picture-id1336449613?b=1&k=20&m=1336449613&s=170667a&w=0&h=atFJsGNEMuHaPll6bRwOkZl8Q0Iz83EcUUi0SvhAeM8=',
    placeName: 'Paris',
    description:
      'Paris is one of the most beautiful cities in the world. It is known worldwide for the Louvre Museum.',
    address: {
      country: 'France',
      city: 'Paris',
    },
    location: {
      lat: 48.8566,
      lng: 2.3522,
    },
    rating: 4.5,
    creator: 'user1',
  },
  {
    id: 2,
    imageURL:
      'https://media.istockphoto.com/photos/shore-of-alexandria-egypt-picture-id157316325?b=1&k=20&m=157316325&s=170667a&w=0&h=qIojlEvA4WbM-LTXhInTzN-kEKGqb7S1uWmqtLC2wwY=',
    placeName: 'Alexandria',
    description:
      'One of Egypts largest cities, Alexandria is also its principal seaport and a major industrial centre.',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    location: {
      lat: 31.2001,
      lng: 29.9187,
    },
    rating: 0,
    creator: 'user1',
  },
  {
    id: 3,
    imageURL:
      'https://media.istockphoto.com/photos/nyhavn-copenhagen-denmark-picture-id901375804?b=1&k=20&m=901375804&s=170667a&w=0&h=SjhoV9MfiKSfJ4JVT7y62sfjlpq-OUqfjEhJwMlZQTY=',
    placeName: 'Copenhagen',
    description:
      'Copenhagen is a unique city, characterized by its canals, cycling culture, strong economy, and happy locals.',
    address: {
      country: 'Denmark',
      city: 'Copenhagen',
    },
    location: {
      lat: 55.6761,
      lng: 12.5683,
    },
    rating: 1.5,
    creator: 'user2',
  },
];

const StyledUpdatePlace = styled.div`
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
    width: 35vw;
    background-color: #ebebeb;
    padding: 3rem 5rem;
    border-radius: 1rem;
    margin-top: 3rem;
  }
`;

const NewPlace = () => {
  // Get the placeId from the url.
  const { placeId, creatorId } = useParams();

  // Get the place.
  const place = DUMMY_PLACES.find((place) => place.id === +placeId);

  // Managing the overall (form) state.
  let initialState = {};

  if (place) {
    initialState = {
      title: {
        value: place.placeName,
        isValid: true,
      },
      description: {
        value: place.description,
        isValid: true,
      },
      rating: place.rating,
      isLoading: false,
      isFormSubmitted: false,
    };
  }

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        return {
          ...state,
          [action.input]: {
            ...state[action.input],
            value: action.value,
            isValid: action.isValid,
          },
        };
      case 'LOADING':
        return {
          ...state,
          isLoading: action.isLoading,
        };
      case 'FORM_SUBMITTED':
        return {
          ...state,
          isFormSubmitted: action.isFormSubmitted,
        };
      case 'RESET_FORM':
        return initialState;
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  // Updated every time the input changes - live connection.
  // useCallback is used to prevent the function from re-rendering every time the input changes.
  const inputChangedHandler = useCallback(
    (id, value, isValid) => {
      // console.log(`${id} - ${value} - ${isValid}`);
      dispatch({
        type: 'INPUT_CHANGE',
        value,
        isValid,
        input: id,
      });
    },
    [dispatch]
  );

  // Recive ratingValue from Rating component.
  const ratingChangedHandler = (value) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
    });
  };

  const closeModalHandler = () => {
    // By resetting the form we can close the modal.
    dispatch({
      type: 'RESET_FORM',
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

  // Check if the place is exist or not.
  if (!place) {
    return (
      <PlaceNotFound
        errorMessage="There is no place to update!"
        buttonText="ADD NEW PLACE"
        to="/places/new"
      />
    );
  }

  return (
    <StyledUpdatePlace>
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
          buttonText="Back"
          buttonBackgroundColor="#00b894"
          buttonBackgroundColorHover="#00a88e"
          buttonTextColor="#fff"
          buttonTextColorHover="#fff"
          buttonTo={`/${creatorId}/places`}
        >
          The place updated sussessfully.
        </Modal>
      ) : null}
      <h1>Update Place</h1>
      <form className="form-container">
        <Input
          id="title"
          element="input"
          type="text"
          lable="Title *"
          errorText="Please enter a valid name"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MAXLENGTH(30),
            VALIDATOR_MINLENGTH(2),
          ]}
          onInput={inputChangedHandler}
          value={formState.title.value}
          valid={formState.title.isValid}
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
          value={formState.description.value}
          valid={formState.description.isValid}
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
          value={formState.rating}
        />
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
        {!formState.isLoading && (
          <Button
            onClick={onFormSubmitHandler}
            disabled={
              !formState.title.isValid || !formState.description.isValid
            }
          >
            UPDATE PLACE
          </Button>
        )}
      </form>
    </StyledUpdatePlace>
  );
};

export default NewPlace;
