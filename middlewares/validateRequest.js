const createError = require('http-errors');

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body); // validation is req requires schema
  if (error) {
    const errorMessage = error.details[0].message;
    console.log('debug5 validateRequest', errorMessage);
    return next(createError(400, errorMessage));
  }
  console.log('debug4 validateRequest');
  next();
};

module.exports = validateRequest;
