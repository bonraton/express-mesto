const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((user) => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));

const getUser = (req, res) => User.findById(req.params.id)
  .then((user) => {
    if (user) {
      res.status(200).send(user);
      return;
    }
    res.status(404).send({ message: 'пользователь не найден' });
  })
  .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => {
      if (res.status(400).send) {
        res.send({ message: 'Переданы некорректные данные в метод создания пользователя' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      }
      res.status(404).send({ message: 'Пользователь с указанным Id не найден' });
    })
    .catch(() => {
      if (res.status(400)) {
        res.send({ message: 'Переданы некорректные данные при обновлении пользователя' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      }
      res.status(404).send({ message: 'Пользователь с указанным Id не найден' });
    })
    .catch(() => {
      if (res.status(400)) {
        res.send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};
