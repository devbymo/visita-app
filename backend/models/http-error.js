class HttpError extends Error {
  constructor(message, statusCode) {
    super(message); // Add the message to the base class.
    this.statusCode = statusCode; // Add the status code to the base class.
  }
}

module.exports = HttpError;
