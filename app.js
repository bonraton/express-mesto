const express = require('express');
const mongoose = require('mongoose');
const { badRequestErrorHandler } = require('./errorHandlers');
const { login, createUser } = require('./controllers/user');
const { jwtCheck } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewurlParser: true,
});

app.use('/users', jwtCheck, require('./routes/user'));
app.use('/cards', jwtCheck, require('./routes/cards'));

app.post('/login', login);
app.post('/signup', createUser);

app.use('*', (req, res) => {
  badRequestErrorHandler(req, res);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
});
