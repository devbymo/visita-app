const { Router } = require('express');

const {
  getAllPlaces,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  validateCreatePlaceInputs,
  updatePlace,
  validateUpdatePlaceInputs,
  deletePlace,
} = require('../controllers/places-controllers');
const ImageUpload = require('../middlewares/image-upload');

// Init places routes.
const router = Router();

// =================
// For Testing purposes.
// =================
// Get all places.
// router.get('/', getAllPlaces);

// Get place by id.
router.get('/:placeId', getPlaceById);

// Get places by userId.
router.get('/user/:userId', getPlacesByUserId);

// Create place.
router.post(
  '/create',
  ImageUpload.single('image'),
  validateCreatePlaceInputs,
  createPlace
);

// Update place.
router.patch('/:placeId', validateUpdatePlaceInputs, updatePlace);

// Delete place.
router.delete('/:placeId', deletePlace);

// Export places routes.
module.exports = router;
