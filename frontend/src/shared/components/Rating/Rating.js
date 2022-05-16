import ReactStars from 'react-rating-stars-component';
import React from 'react';

const Rating = (props) => {
  // Forward the [ratingValue] to the parent component.
  const ratingChangedHandler = (ratingValue) => {
    props.onRating(ratingValue);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChangedHandler}
      size={35}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
      value={props.ratingValue}
    />
  );
};

export default Rating;
