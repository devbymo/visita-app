const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(bodyParser.json());
// OR
// app.use(express.json())

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/v1/places', placesRoutes);
app.use('/api/v1/users', usersRoutes);

// Route not found.
app.use((req, res, next) => {
  next(new HttpError('Route not found!', 404));
});

// Genaric error handler middleware.
// All errors is catched here.
app.use((error, req, res, next) => {
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
