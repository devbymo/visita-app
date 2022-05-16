import React from 'react';
import Button from '../../shared/components/Button/Button';

const GetUserLocation = (props) => {
  // Get user location.
  const pickCurrentLocationHandler = async (e) => {
    e.preventDefault();
    let userLocation = { latitude: '', longitude: '', address: '' };
    let errorText = undefined;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation = {
            latitude,
            longitude,
          };

          // Get address from latitude and longitude.
          getAddressFromLatLng(latitude, longitude, errorText);
        },
        (error) => {
          console.log(error.message);
          errorText = error.message;
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      errorText = 'Geolocation is not supported by this browser.';
    }

    return {
      userLocation,
      errorText,
    };
  };

  // Create a function to convert lat, lng to address.
  const getAddressFromLatLng = async (latitude, longitude, errorText) => {
    let address = '';
    const APIKeys = 'fbadb263b1fcf914a168438770e966ab';
    const url = `http://api.weatherstack.com/current?access_key=${APIKeys}&query=${latitude},${longitude}`;

    try {
      const response = await fetch(url);
      if (response.status !== 200 || response.ok !== true) {
        console.log('Error: ' + response.status);
        errorText = 'Something went wrong';
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
        console.log(errorText);
      }
    } catch (error) {
      console.log(error);
      errorText = error.message;
    }

    props.onPickLocation(latitude, longitude, address);
  };

  return (
    <div>
      <Button onClick={pickCurrentLocationHandler}>
        PICK MY CURRENT LOCATION
      </Button>
    </div>
  );
};

export default GetUserLocation;
