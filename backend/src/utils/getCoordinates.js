const axios = require('axios');
require('dotenv').config();

const getCoordinates = async (address) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.GEOCODING_API_KEYS}&limit=1`;

  const res = await axios.get(geocodeUrl);
  const data = res.data;

  const coordinates = {
    lat: data.features[0].geometry.coordinates[1],
    lng: data.features[0].geometry.coordinates[0],
  };

  return coordinates;
};

module.exports = getCoordinates;
