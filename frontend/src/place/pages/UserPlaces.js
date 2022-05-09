import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PlaceList from '../components/PlaceList';

const StyledPlaces = styled.div`
  padding: 10rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DUMMY_PLACES = [
  {
    id: 1,
    imageURL:
      'https://media.istockphoto.com/photos/view-of-alexandria-harbor-egypt-picture-id643472332?b=1&k=20&m=643472332&s=170667a&w=0&h=FQMmVA8nHgrbKygU1qOQaLCmFD-mvt5EOyNyZwdh4TM=',
    placeName: 'Place Name 1',
    description: 'This is place 1',
    address: {
      country: 'Egypt',
      city: 'Cairo',
    },
    location: {
      lat: 30.05,
      lng: 31.05,
    },
    rating: 5,
    creator: 'user1',
  },
  {
    id: 2,
    imageURL:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    placeName: 'Place Name 2',
    description: 'This is place 2',
    address: {
      country: 'Egypt',
      city: 'Cairo',
    },
    location: {
      lat: 30.05,
      lng: 31.05,
    },
    rating: 2.5,
    creator: 'user1',
  },
  {
    id: 3,
    imageURL:
      'https://media.istockphoto.com/photos/colosseum-in-rome-with-morning-sun-picture-id1290101405?b=1&k=20&m=1290101405&s=170667a&w=0&h=FPmmTNGnOLsw_KvNXHdKpRdao_IHn592U7bEL-Gl69A=',
    placeName: 'Place Name 3',
    description: 'This is place 3',
    address: {
      country: 'Egypt',
      city: 'Cairo',
    },
    location: {
      lat: 30.05,
      lng: 31.05,
    },
    rating: 4.5,
    creator: 'user2',
  },
];

const UserPlaces = () => {
  const { userId } = useParams();
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  return (
    <StyledPlaces>
      <PlaceList places={places} />
    </StyledPlaces>
  );
};

export default UserPlaces;
