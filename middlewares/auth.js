const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const jwtCheck = (req, res, next) => {
  const a = req.headers;
  if (!a.authorization) {
    throw new UnauthorizedError('Ошибка аутентификации');
  }

  const token = a.authorization.replace();
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Ошибка аутентификации');
  }
  req.user = payload;
  return next();
};

module.exports = { jwtCheck };
