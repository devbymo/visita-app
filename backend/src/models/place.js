const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      trim: true,
      minLength: [3, 'Title must be at least 3 characters long!'],
      maxLength: [50, 'Title must be less than 50 characters long!'],
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      trim: true,
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
      trim: true,
      minLength: [5, 'Address must be at least 5 characters long!'],
      maxLength: [50, 'Address must be less than 50 characters long!'],
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
    rating: {
      type: Number,
      min: [1, 'Rating can not be less than 1!'],
      max: [5, 'Rating can not be more than 5!'],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required!'],
    },
  },
  {
    timestamps: true,
  }
);

// =====================
// MODEL METHODS
// =====================

// =====================
// INSTANCES METHODS
// =====================

// =====================
// MODEL MIDDLEWARES
// =====================

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
