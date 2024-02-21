const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/users');

const NotFound = require('../errors/notFound');
const AuthError = require('../errors/authError');

const OK_CODE = 200;
const CREATED_CODE = 201;

const { JWT_SECRET } = process.env;

const getUserInfo = async (req, res, next) => {
  try {
    // Извлекаем _id из декодированного токена
    const userId = req.user._id;

    const user = await User.findById(userId);

    res.status(OK_CODE).json(user.toObject());
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    newUser.password = undefined;
    res.status(CREATED_CODE).json(newUser);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFound('User not found');
    } else {
      res.status(OK_CODE).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select({ password: true });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res.status(OK_CODE).send({ token });
    } else {
      throw new AuthError('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getUserInfo,
  createUser,
  updateProfile,
};
