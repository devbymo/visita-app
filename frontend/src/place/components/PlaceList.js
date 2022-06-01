import React from 'react';
import PlaceItem from './PlaceItem';

import styled from 'styled-components';
import Button from '../../shared/components/Button/Button';
import PlaceNotFound from './PlaceNotFound';

const StyledPlaceList = styled.div`
  list-style-type: none;
`;

const PlaceList = (props) => {
  if (props.places.length === 0) {
    return (
      <PlaceNotFound
        errorMessage="There is no places to show!"
        buttonText="ADD NEW PLACE"
        to="/places/new"
      />
    );
  }

  return (
    <StyledPlaceList>
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          imageURL={place.imageURL}
          placeName={place.placeName}
          description={place.description}
          address={place.address}
          coordinates={place.location}
          creatorId={place.creator}
          rating={place.rating}
          location={place.location}
        />
      ))}
    </StyledPlaceList>
  );
};

export default PlaceList;
