const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

const { validateUpdateProfile } = require('../validation/validation');

// Роуты для пользователей
router.get('/users/me', userController.getUserInfo);
router.patch('/users/me', validateUpdateProfile, userController.updateProfile);

module.exports = router;
