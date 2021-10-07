const User = require('../models/user');
const { validationErrorHandler, defaultErrorHandler, badRequestErrorHandler } = require('../errorHandlers');

const options = {
  runValidators: true,
  new: true,
};

const getUsers = (req, res) => User.find({})
  .then((user) => res.send({ data: user }))
  .catch(() => defaultErrorHandler(req, res));

const getUser = (req, res) => User.findById(req.params.id)
  .then((user) => {
    if (user) {
      res.status(200).send(user);
    }
    badRequestErrorHandler(req, res);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      validationErrorHandler(req, res);
    }
    defaultErrorHandler(req, res);
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        validationErrorHandler(req, res);
      }
      defaultErrorHandler(req, res);
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      }
      badRequestErrorHandler(req, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        validationErrorHandler(req, res);
      }
      defaultErrorHandler(req, res);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      }
      badRequestErrorHandler(req, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        validationErrorHandler(req, res);
      }
      defaultErrorHandler(req, res);
    });
};

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};
