import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import classes from './UserItem.module.css';

const Wrapper = styled.div`
  margin: 0 auto;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  a {
    text-decoration: none;
    color: #000;
  }

  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

const StyledUserItem = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40vw;
  height: 22rem;
  background-color: #fff;
  cursor: pointer;

  /* a {
    text-decoration: none;
  } */

  &:hover {
    filter: brightness(120%);
  }

  .image-container {
    flex: 2;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .user__image {
      height: 100%;
      width: 100%;
      display: block;
    }
  }

  .user__info {
    flex: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;

    .user__name {
      font-style: italic;
      font-weight: 500;
      font-size: 3rem;
    }

    .user__address {
      margin: 1.5rem 0;
      font-size: 1.8rem;
      font-weight: 100;
    }

    .user__places {
      font-size: 1.8rem;
      font-weight: 100;
    }
  }

  // 1200px or smaller
  @media only screen and (max-width: 1200px) {
    width: 70vw;
  }

  // 1200px or smaller
  @media only screen and (max-width: 900px) {
    width: 90vw;
  }

  // 1200px or smaller
  @media only screen and (max-width: 500px) {
    width: 92vw;
    height: 15vh;
    margin: 0 2rem;
  }
`;

const UserItem = (props) => {
  return (
    <Wrapper>
      <Link to={`/${props.id}/places`}>
        <StyledUserItem>
          <div className="image-container">
            <img src={props.image} alt="User" className="user__image" />
          </div>
          <div className="user__info">
            <h2 className="user__name">{props.name} &#11088;</h2>
            <p className="user__address">
              {props.country}/{props.city} &#127962;
            </p>
            <p className="user__places">
              {props.placeNums} {props.placeNums > 1 ? 'Places' : 'Place'}{' '}
              &#128204;
            </p>
          </div>
        </StyledUserItem>
      </Link>
    </Wrapper>
  );
};

export default UserItem;
