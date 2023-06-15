const express = require('express');

const authController = require('./../controllers/auth.controller');

const validationMiddleware = require('../middlewares/validations.middlewares');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  authController.login
);

module.exports = router;
