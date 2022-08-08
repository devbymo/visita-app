const axios = require('axios');

const getCoordinates = async (address) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW80NzUiLCJhIjoiY2t1dTg5d2ZmMHJkdjJ1bzBqdWhieDlvNCJ9.D-wYkp6JNYKNnNPGCocu7A&limit=1`;

  const res = await axios.get(geocodeUrl);
  const data = res.data;

  const coordinates = {
    lat: data.features[0].geometry.coordinates[1] || 0,
    lng: data.features[0].geometry.coordinates[0] || 0,
  };
  return coordinates;
};

module.exports = getCoordinates;
