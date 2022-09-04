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
const auth = require('../middlewares/auth');

// Init places routes.
const router = Router();

// =================
// For Testing purposes.
// =================
// Get all places.
// router.get('/', getAllPlaces);

// Get place by id.
router.get('/:placeId', auth, getPlaceById);

// Get places by userId.
router.get('/user/:userId', getPlacesByUserId);

// Create place.
router.post(
  '/create',
  auth,
  ImageUpload.single('image'),
  validateCreatePlaceInputs,
  createPlace
);

// Update place.
router.patch('/:placeId', auth, validateUpdatePlaceInputs, updatePlace);

// Delete place.
router.delete('/:placeId', auth, deletePlace);

// Export places routes.
module.exports = router;
