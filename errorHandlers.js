const validationErrorHandler = (req, res) => {
  res.status(400).send({ message: 'Переданы некорректные данные' });
};

const defaultErrorHandler = (req, res) => {
  res.status(500).send({ message: 'На сервере произошла ошибка!' });
};

const badRequestErrorHandler = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый объект не найден!' });
};

module.exports = { validationErrorHandler, defaultErrorHandler, badRequestErrorHandler };
