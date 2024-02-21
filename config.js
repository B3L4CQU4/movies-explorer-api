const urlPattern = /^(https?:\/\/)?(www\.)?([\w-]+(\.[\w-]+)+\/?)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
const OK_CODE = 200;
const CREATED_CODE = 201;
const INVALID_DATA_CODE = 400;
const SALT_ROUNDS = 10;
const DEV_SECRET = 'dev-secret';
const DEV_DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb';

const CRASH_ERROR = 'Сервер сейчас упадёт';
const NOT_FOUND = 'Not Found';
const USER_NOT_FOUND = 'User not found';
const MOVIE_NOT_FOUND = 'Movie not found';
const NOT_MOVIE_OWNER = 'Permission denied: You cannot delete this movie';
const AUTH_ERROR = 'Invalid email or password';
const TOKEN_MISSING = 'Unauthorized: Token missing or incorrectly formatted';
const INVALID_TOKEN = 'Unauthorized: Invalid Token';

module.exports = {
  urlPattern,
  OK_CODE,
  CREATED_CODE,
  INVALID_DATA_CODE,
  SALT_ROUNDS,
  DEV_DB_ADDRESS,
  CRASH_ERROR,
  NOT_FOUND,
  MOVIE_NOT_FOUND,
  NOT_MOVIE_OWNER,
  USER_NOT_FOUND,
  DEV_SECRET,
  AUTH_ERROR,
  TOKEN_MISSING,
  INVALID_TOKEN,
};
