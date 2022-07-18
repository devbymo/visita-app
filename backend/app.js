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

// Genaric error handler middleware.
app.use((error, req, res, next) => {
  console.log('Error handler middleware..');
  if (res.headersSent) {
    return next(error);
  }

  const { status, message } = error;

  res.status(status || 500);
  res.json({
    error: {
      message: message || 'Something went wrong!',
    },
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
