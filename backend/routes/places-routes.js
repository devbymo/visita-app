const express = require('express');

const {
  getPlaceById,
  getPlaceByUserId,
} = require('../controllers/places-controllers');

// Init places routes.
const router = express.Router();

// Get place by userId.
router.get('/user/:userId', getPlaceByUserId);

// Get place by id.
router.get('/:placeId', getPlaceById);

// Export places routes.
module.exports = router;
