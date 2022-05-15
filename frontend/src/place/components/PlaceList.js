import React from 'react';
import PlaceItem from './PlaceItem';

import styled from 'styled-components';

const StyledPlaceList = styled.div`
  list-style-type: none;
`;

const StyledNoPlacesFounded = styled.div`
  height: 70vh;
  font-size: 4rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceList = (props) => {
  if (props.places.length === 0) {
    return <StyledNoPlacesFounded>No places founded! 🤷‍♂️</StyledNoPlacesFounded>;
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
