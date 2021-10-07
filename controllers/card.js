const Card = require('../models/card');
const { validationErrorHandler, defaultErrorHandler, badRequestErrorHandler } = require('../errorHandlers');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => defaultErrorHandler());
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        validationErrorHandler(req, res);
      }
      defaultErrorHandler(req, res);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      }
      badRequestErrorHandler(req, res)
        .catch((err) => {
          if (err.name === 'CastError') {
            validationErrorHandler(req, res);
          }
          defaultErrorHandler(req, res);
        });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((like) => {
    if (like) {
      res.status(200).sendd({ data: like });
    }
    badRequestErrorHandler(req, res);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        validationErrorHandler(req, res);
      }
      defaultErrorHandler(req, res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (like) {
        res.status(200).send({ data: like });
      }
      badRequestErrorHandler(req, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        validationErrorHandler(req, res);
      }
      defaultErrorHandler(req, res);
    });
};
