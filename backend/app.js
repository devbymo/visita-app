const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const errorHandler = require('./controllers/error-controllers');

const app = express();

// Use body parser to parse the body of the requests.
app.use(bodyParser.json());

// Places routes.
app.use('/api/v1/places', placesRoutes);

// Users routes.
app.use('/api/v1/users', usersRoutes);

// Route not found.
// If the URL does not match any previous route.
app.use((req, res, next) => {
  next(new HttpError('Route not found!', 404));
});

// Genaric error handler middleware.
// All errors is catched here.
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
