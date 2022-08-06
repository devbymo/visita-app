const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// Use body parser to parse the body of the requests.
app.use(bodyParser.json());

// Places routes.
app.use('/api/v1/places', placesRoutes);

// Users routes.
app.use('/api/v1/users', usersRoutes);

// Route not found.
app.use((req, res, next) => {
  next(new HttpError('Route not found!', 404));
});

// Genaric error handler middleware.
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

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
