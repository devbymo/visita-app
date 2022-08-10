const errorHandler = (error, req, res, next) => {
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
};

module.exports = {
  errorHandler,
};
