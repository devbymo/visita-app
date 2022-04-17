import React from 'react';
import UserItem from './UserItem';
import styled from 'styled-components';

// import classes from './UsersList.module.css';

const StyledUsers = styled.ul`
  padding: 15rem 0 10rem;
  list-style-type: none;
`;

const UsersList = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="users-container">
        <h2>There is no users to display!!</h2>
      </div>
    );
  }
  return (
    <StyledUsers>
      {props.users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          country={user.address.country}
          city={user.address.city}
          placeNums={user.placeNums}
        />
      ))}
    </StyledUsers>
  );
};

export default UsersList;
