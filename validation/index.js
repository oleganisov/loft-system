const Joi = require('@hapi/joi');
const { ErrorHandler, handleError } = require('../helpers/error');

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(100),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join('; ');
    const validError = new ErrorHandler(400, message);
    return handleError(validError, res);
  }
  next();
};

module.exports = { validateUser };
