import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared/components/Button/Button';
import MapView from '../../shared/components/Map/MapView';
import Modal from '../../shared/components/UI/Modal';
import Overlay from '../../shared/components/UI/Overlay';
import Map from '../../shared/components/Map/Map';
import img from './../../Images/fakeMapView.png';

const StyledPlaceItem = styled.li`
  width: 40vw;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  text-align: center;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 5rem;
  }

  .place-item__image {
    flex: 1;
    height: 30rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .place-item__info {
    padding: 4rem 0 3rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 0.2rem solid salmon;

    .place-item__name {
      font-style: italic;
      font-weight: 600;
      font-size: 3rem;
    }

    .place-item__address {
      font-size: 1.9rem;
      font-weight: 500;
    }

    .place-item__description {
      font-size: 1.6rem;
      padding: 0 2rem;
    }

    .place-item__rating {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }

  .place-item__actions {
    padding: 3rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
`;
const PlaceItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModelHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  // Create stars rating from 0 to 5
  const createStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push('⭐');
    }

    if (stars.length === 0) return 'No rating yet';

    return stars;
  };

  return (
    <StyledPlaceItem className="place-item">
      {/* Modal */}
      {showModal && (
        <Modal closeModal={closeModalHandler} show={showModal}>
          <Map location={props.location} />
          {/* <MapView /> */}
          {/* <img src={img} alt="Place" /> */}
        </Modal>
      )}
      {/* Image */}
      <div className="place-item__image">
        <img src={props.imageURL} alt={props.placeName} />
      </div>
      {/* Info */}
      <div className="place-item__info">
        <h2 className="place-item__name">{props.placeName} &#127919;</h2>
        <p className="place-item__address">
          {props.address.country}/{props.address.city} &#127962;
        </p>
        <p className="place-item__description">{props.description} &#127915;</p>
        <p className="place-item__rating">{createStars(props.rating)}</p>
      </div>
      {/* Actions */}
      <div className="place-item__actions">
        <Button inverse onClick={openModelHandler}>
          VIEW ON MAP
        </Button>
        <Button to={`/places/${props.id}`}>EDIT</Button>
        <Button danger>REMOVE</Button>
      </div>
    </StyledPlaceItem>
  );
};

export default PlaceItem;
