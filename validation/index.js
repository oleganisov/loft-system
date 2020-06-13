const Joi = require('@hapi/joi');
const { ErrorHandler } = require('../helpers/error');

const validatelogin = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(100),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join('; ');

    return next(new ErrorHandler(400, message));
  }
  next();
};
const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(100),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    surName: Joi.string(),
    firstName: Joi.string(),
    middleName: Joi.string()
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join('; ');

    return next(new ErrorHandler(400, message));
  }
  next();
};

module.exports = { validatelogin, validateRegistration };
