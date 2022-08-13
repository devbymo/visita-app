const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// Use body parser to parse the body of the requests.
app.use(bodyParser.json());
// OR
// app.use(express.json())

// Set-up routes.
app.use('/api/v1/places', placesRoutes);
app.use('/api/v1/users', usersRoutes);

// Route not found.
// If the URL does not match any previous route.
app.use((req, res, next) => {
  next(new HttpError('Route not found!', 404));
});

// Genaric error handler middleware.
// All errors is catched here.
app.use((error, req, res, next) => {
  console.log('Error handler middleware..');
  if (res.headersSent) {
    return next(error);
  }

  const { statusCode, message } = error;

  res.status(statusCode || 500);
  res.json({
    error: {
      message: message || 'Something went wrong!',
    },
  });
});

module.exports = { app };
