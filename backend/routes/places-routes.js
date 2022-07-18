const express = require('express');

const getPlaceById = require('../controller/places-controllers/getPlaceById.js');

const getPlaceByUserId = require('../controller/places-controllers/getPlaceByUserId.js');

// Init places routes.
const router = express.Router();

// Get place by userId.
router.get('/user/:userId', getPlaceByUserId);

// Get place by id.
router.get('/:placeId', getPlaceById);

// Export places routes.
module.exports = router;
