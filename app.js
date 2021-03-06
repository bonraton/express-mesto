// Кирилл, приношу глубочайшие извинения за столь невнимательные ошибки!
// Я как следуюет перепроверил весь функционал и искренне надеюсь, что сейчас
// все хорошо!
// Спасибо вам за терпение, потраченное время, и понимание!

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/user');
const { jwtCheck } = require('./middlewares/auth');
const { registerValidator, loginValidator } = require('./middlewares/validation');
const NotfoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewurlParser: true,
});

app.use('/users', jwtCheck, require('./routes/user'));
app.use('/cards', jwtCheck, require('./routes/cards'));

app.post('/signin', loginValidator, login);
app.post('/signup', registerValidator, createUser);

app.use('*', jwtCheck, () => {
  throw new NotfoundError('страница не найдена');
});

app.use(errors(), (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
});
