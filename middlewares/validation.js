const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const urlValidator = (value) => {
  const result = validator.isUrl(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const joyStringRequired = Joi.string().required();

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: joyStringRequired.min(2).max(30),
    link: joyStringRequired.custom(urlValidator),
  }),
});

const deleteCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().hex().length(24).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: joyStringRequired.email(),
    password: joyStringRequired,
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    name: joyStringRequired.min(2).max(30),
    about: joyStringRequired.min(2).max(30),
    avatar: joyStringRequired.custom(urlValidator),
    email: joyStringRequired.email(),
    password: joyStringRequired,
  }),
});

module.exports = {
  createCardValidator, deleteCardValidator, loginValidation, registerValidation,
};
