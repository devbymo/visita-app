const express = require('express');

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
} = require('../controllers/places-controllers');

// Init places routes.
const router = express.Router();

// Get places by userId.
router.get('/user/:userId', getPlacesByUserId);

// Get place by id.
router.get('/:placeId', getPlaceById);

// Create place.
router.post('/create', createPlace);

// Export places routes.
module.exports = router;
