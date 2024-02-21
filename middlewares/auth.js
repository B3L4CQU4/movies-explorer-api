const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const InvalidToken = require('../errors/invalidToken');
const {
  TOKEN_MISSING,
  DEV_SECRET,
  INVALID_TOKEN,
} = require('../config');

const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(TOKEN_MISSING);
  }
  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
  } catch (error) {
    throw new InvalidToken(INVALID_TOKEN);
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
