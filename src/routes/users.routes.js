const express = require('express');

const userController = require('../controllers/users.controller');

const userMiddleware = require('../middlewares/users.middlewares');

const router = express.Router();

router.get(
  '/:id/history',
  userMiddleware.validUser,
  userController.AllTransfers
);

module.exports = router;
