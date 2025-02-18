const errorHandler = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || 'Internal Server Error';

  // Handle Mongoose duplicate key error
  if (error.name === 'MongoServerError' && error.code === 11000) {
    status = 409;
    message = 'Username already exists';
  }

  res.status(status).json({
    data: null, // Ensuring 'data' is always null
    status,
    error: message,
  });
};

module.exports = errorHandler;
