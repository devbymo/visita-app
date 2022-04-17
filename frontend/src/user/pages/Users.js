import React from 'react';
import UsersList from '../components/UsersList';
import styled from 'styled-components';

const DUMMY_USERS = [
  {
    id: 'user_1',
    name: 'Mohamed Yasser',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    placeNums: 10,
  },
  {
    id: 'user_1',
    name: 'Mohamed Yasser',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    placeNums: 10,
  },
  {
    id: 'user_1',
    name: 'Mohamed Yasser',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    placeNums: 10,
  },
  {
    id: 'user_1',
    name: 'Mohamed Yasser',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    placeNums: 10,
  },
  {
    id: 'user_1',
    name: 'Mohamed Yasser',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    placeNums: 10,
  },
  {
    id: 'user_1',
    name: 'Mohamed Yasser',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    placeNums: 10,
  },
  {
    id: 'user_1',
    name: 'Mohamed Yasser',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    placeNums: 10,
  },
];

const StyledUsers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Users = () => {
  return (
    <StyledUsers>
      <UsersList users={DUMMY_USERS} />
    </StyledUsers>
  );
};

export default Users;
