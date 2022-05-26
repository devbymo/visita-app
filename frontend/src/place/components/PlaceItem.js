import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared/components/Button/Button';
import MapView from '../../shared/components/Map/MapView';
import Modal from '../../shared/components/UI/Modal';
import Overlay from '../../shared/components/UI/Overlay';
import Map from '../../shared/components/Map/Map';
import img from './../../Images/fakeMapView.png';
import ReactStars from 'react-rating-stars-component';

const StyledPlaceItem = styled.li`
  width: 40vw;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  text-align: center;
  overflow: hidden;
  background-color: #fff;

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
    border-bottom: 0.1rem solid #000;

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
      font-size: 3rem;
    }

    .place-item__rating--error {
      font-size: 2.3rem;
      font-weight: 500;
    }
  }

  .place-item__actions {
    padding: 3rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ebebeb;
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
    if (rating <= 0)
      return <span className="place-item__rating--error">No Rating!</span>;

    return (
      <ReactStars count={rating} value={rating} edit={false} isHalf={true} />
    );
  };

  return (
    <StyledPlaceItem className="place-item">
      {/* Modal */}
      {showModal && (
        <Modal
          closeModal={closeModalHandler}
          show={showModal}
          buttonText="Close"
          width="45vw"
          height="50vh"
          button={true}
          buttonBackgroundColor="#fff"
          buttonBackgroundColorHover="#000"
          buttonTextColor="#000"
          buttonTextColorHover="#fff"
          buttonFontSize="1.5rem"
        >
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
        <Button onClick={openModelHandler}>VIEW ON MAP</Button>
        <Button to={`/places/${props.id}`}>EDIT</Button>
        <Button danger>REMOVE</Button>
      </div>
    </StyledPlaceItem>
  );
};

export default PlaceItem;
