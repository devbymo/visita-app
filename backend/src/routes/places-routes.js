const { Router } = require('express');

const {
  getPlaceById,
  validateGetPlaceByIdInputs,
  getPlacesByUserId,
  validateGetPlacebyUserIdInputs,
  createPlace,
  validateCreatePlaceInputs,
  updatePlace,
  validateUpdatePlaceInputs,
  deletePlace,
  validateDeletePlaceInputs,
} = require('../controllers/places-controllers');

// Init places routes.
const router = Router();

// Get place by id.
router.get('/:placeId', validateGetPlaceByIdInputs, getPlaceById);

// Get places by userId.
router.get('/user/:userId', validateGetPlacebyUserIdInputs, getPlacesByUserId);

// Create place.
router.post('/create', validateCreatePlaceInputs, createPlace);

// Update place.
router.patch('/:placeId', validateUpdatePlaceInputs, updatePlace);

// Delete place.
router.delete('/:placeId', validateDeletePlaceInputs, deletePlace);

// Export places routes.
module.exports = router;
