const { Router } = require('express');

const {
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

// Get place by id.
router.get('/:placeId', auth, getPlaceById);

// Update place.
router.patch('/:placeId', auth, validateUpdatePlaceInputs, updatePlace);

// Delete place.
router.delete('/:placeId', auth, deletePlace);

// Create place.
router.post(
  '/create',
  auth,
  ImageUpload.single('image'),
  validateCreatePlaceInputs,
  createPlace
);

// Get places by userId.
router.get('/user/:userId', getPlacesByUserId);

// Export places routes.
module.exports = router;
