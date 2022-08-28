const express = require('express');

const { getUsers, signup, login } = require('../controllers/users-controllers');
const imageUpload = require('../middlewares/image-upload');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', imageUpload.single('image'), signup);
router.post('/login', login);

module.exports = router;
