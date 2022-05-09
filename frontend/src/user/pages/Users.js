import React from 'react';
import UserList from '../components/UserList';
import styled from 'styled-components';

const DUMMY_USERS = [
  {
    id: 'user1',
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
    id: 'user2',
    name: 'Ibrahim Ali',
    image:
      'https://images.unsplash.com/photo-1548189797-82c6a7cb85d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    address: {
      country: 'France',
      city: 'Paris',
    },
    placeNums: 12,
  },
  {
    id: 'user3',
    name: 'Khaled Mohamed',
    image:
      'https://images.unsplash.com/photo-1651493280013-b1f88c720be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    address: {
      country: 'USA',
      city: 'New York',
    },
    placeNums: 3,
  },
  {
    id: 'user4',
    name: 'Jonas Michael',
    image:
      'https://images.unsplash.com/photo-1651453172903-d7163a508479?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    address: {
      country: 'Italy',
      city: 'Milan',
    },
    placeNums: 2,
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
      <UserList users={DUMMY_USERS} />
    </StyledUsers>
  );
};

export default Users;
