import React, { useState } from 'react';
import Button from '../../shared/components/Button/Button';
import LoadingSpinner from '../../shared/components/LoaderSpiner/LoaderSpiner';
import styled from 'styled-components';

const StyledUserLocation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: flex-start; */
  justify-content: center;
  margin-top: 1rem;

  p {
    margin-top: 1rem;
    font-size: 1.7rem;
    font-weight: 400;
  }

  .error-text {
    color: red;
  }

  .success-text {
    color: green;
  }
`;

const GetUserLocation = (props) => {
  // State Mangement.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get lat, lng from user.
  const pickCurrentLocationHandler = async (e) => {
    e.preventDefault();
    // Start loading.
    setIsLoading(true);

    let errorText = undefined;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Get address from latitude and longitude.
          getAddressFromLatLng(latitude, longitude, errorText);
        },
        (error) => {
          setIsLoading(false);
          errorText = error.message;
          setError(errorText);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      errorText = 'Geolocation is not supported by this browser.';
      setIsLoading(false);
      setError(errorText);
    }

    return null;
  };

  // Convert latitude and longitude to address.
  const getAddressFromLatLng = async (latitude, longitude, errorText) => {
    let address = '';
    const APIKeys = 'fbadb263b1fcf914a168438770e966ab';
    const url = `http://api.weatherstack.com/current?access_key=${APIKeys}&query=${latitude},${longitude}`;

    try {
      const response = await fetch(url);
      if (response.status !== 200 || response.ok !== true) {
        errorText = 'Something went wrong';
        setIsLoading(false);
        setError(errorText);
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      if (data.location) {
        address = {
          shortName: data.location.region,
          longName: data.location.name,
          country: data.location.country,
        };
      } else {
        errorText = 'Something went wrong';
        setIsLoading(false);
        setError(errorText);
      }
    } catch (error) {
      errorText = error.message;
      setIsLoading(false);
      setError(errorText);
    }

    setIsLoading(false);
    setSuccess(true);
    props.onPickLocation(latitude, longitude, address);
    return null;
  };

  return (
    <StyledUserLocation>
      {!isLoading && !success && (
        <Button onClick={pickCurrentLocationHandler}>
          PICK MY CURRENT LOCATION
        </Button>
      )}
      {isLoading && <LoadingSpinner />}
      {error && !success && <p className="error-text">{error}!</p>}
      {success && (
        <p className="success-text">Your address has been captured</p>
      )}
    </StyledUserLocation>
  );
};

export default GetUserLocation;
