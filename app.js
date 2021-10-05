const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewurlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '615b73967915565358d8d231',
  };

  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
});
