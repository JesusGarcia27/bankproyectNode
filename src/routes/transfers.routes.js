const express = require('express');

const transfersController = require('../controllers/transfers.controller');

const transfersMiddleware = require('../middlewares/users.middlewares');

const router = express.Router();

router.post(
  '/:id',
  transfersMiddleware.validUser,
  transfersController.transfer
);

module.exports = router;
