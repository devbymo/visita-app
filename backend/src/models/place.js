const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    minLength: [3, 'Title must be at least 3 characters long!'],
    maxLength: [30, 'Title must be less than 30 characters long!'],
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    maxLength: [500, 'Description can not be more than 500 characters!'],
    minLength: [10, 'Description can not be less than 10 characters!'],
  },
  image: {
    type: String,
    required: [true, 'Image is required!'],
  },
  address: {
    type: String,
    required: [true, 'Address is required!'],
  },
  coordinates: {
    lat: {
      type: String,
      required: [true, 'Latitude is required!'],
    },
    lng: {
      type: String,
      required: [true, 'Longitude is required!'],
    },
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required!'],
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
