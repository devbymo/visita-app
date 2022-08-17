import React, { useContext } from 'react';
import PlaceItem from './PlaceItem';

import styled from 'styled-components';
import Button from '../../shared/components/Button/Button';
import PlaceNotFound from './PlaceNotFound';
import { AuthContext } from '../../shared/context/auth-context';

const StyledPlaceList = styled.div`
  list-style-type: none;
`;

const PlaceList = (props) => {
  // const { userId: authanticatedUserId } = useContext(AuthContext);

  // console.log(`userId: ${props.userId}`);
  // console.log(`authanticatedId: ${authanticatedUserId}`);

  // if (props.places.length === 0 && props.userId === authanticatedUserId) {
  //   return (
  //     <PlaceNotFound
  //       errorMessage="There is no places to show!"
  //       buttonText="ADD NEW PLACE"
  //       to="/places/new"
  //     />
  //   );
  // }

  return (
    <StyledPlaceList>
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          imageURL={place.image}
          placeName={place.title}
          description={place.description}
          address={place.address}
          coordinates={place.coordinates}
          creatorId={place.creator}
          rating={place.rating}
          location={place.location}
        />
      ))}
    </StyledPlaceList>
  );
};

export default PlaceList;
