const express = require('express');

const {
  getUsers,
  signup,
  login,
  logout,
} = require('../controllers/users-controllers');
const auth = require('../middlewares/auth');
const imageUpload = require('../middlewares/image-upload');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', imageUpload.single('image'), signup);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router;
