const createError = require('http-errors');

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body); // validation is req requires schema
  if (error) {
    return next(createError(400, error.details[0].message));
  }
  next();
};

module.exports = validateRequest;
