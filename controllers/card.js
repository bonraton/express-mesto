const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => {
      if (res.status(400).send) {
        res.send({ message: 'Переданы некорректные данные в метод создания карточки' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      }
      res.status(404).send({ message: 'Карточка с указанным Id не найдена' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((like) => {
    if (like) {
      res.status(200).send({ data: like });
    }
    res.status(404).send({ message: 'Карточка с указанным Id не найдена' });
  })
    .catch(() => {
      if (res.status(400)) {
        res.send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
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
      res.status(404).send({ message: 'Карточка с указанным Id не найдена' });
    })
    .catch(() => {
      if (res.status(400)) {
        res.send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
