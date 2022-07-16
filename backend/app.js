const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express();

// Parse all incoming request to json.
app.use(bodyParser.json());

// Places routes.
// app.use('/v1/api/places', placesRoutes);
app.use(placesRoutes);

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
