const createError = require('http-errors');

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body); // validation is req requires schema
  if (error) {
    const errorMessage = error.details[0].message;
    return next(createError(400, errorMessage));
  }
  next();
};

module.exports = validateRequest;
