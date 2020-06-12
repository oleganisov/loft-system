const Joi = require('@hapi/joi');
const { ErrorHandler } = require('./helpers/error');

const validUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(100),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join('; ');

    return new ErrorHandler(400, message);
  }
  next();
};

module.exports = { validUser };
