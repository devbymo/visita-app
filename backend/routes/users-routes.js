const express = require('express');

const router = express.Router();

router.get('/all', async (req, res) => {
  console.log(req.path);
  console.log('Users');
  res.status(200).json('Get all users');
});

module.exports = router;
