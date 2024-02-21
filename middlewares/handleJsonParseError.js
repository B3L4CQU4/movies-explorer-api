const { INVALID_DATA_CODE } = require('../config');

const handleJsonParseError = (error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    res.status(INVALID_DATA_CODE).json({ message: 'Invalid JSON' });
  } else {
    next();
  }
};

module.exports = handleJsonParseError;
