const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

// Parse all incoming request to json.
app.use(bodyParser.json());

// Places routes.
app.use('/api/v1/places', placesRoutes);

// Users routes.
app.use('/api/v1/users', usersRoutes);

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
