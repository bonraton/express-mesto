const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs');

const jwtCheck = (req, res, next) => {
  const a = req.headers;
  if (!a.authorization) {
    res.status(401).send(a.authorization);
  }

  const token = a.authorization.replace();
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send(err);
  }
  req.user = payload;
  next();
};

module.exports = { jwtCheck };
