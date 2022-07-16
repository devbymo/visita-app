const express = require('express');

// Init places routes.
const placesRoutes = express.Router();

// Get all places.
placesRoutes.get('/v1/api/places', async (req, res) => {
  console.log(req.path);
  res.status(200).json('Get all places');
});

// Export places routes.
module.exports = placesRoutes;
