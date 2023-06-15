const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('accountNumber')
    .notEmpty()
    .withMessage('Accouunt number cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characteres long'),
  body('amount').notEmpty().withMessage('Description cannot be empty'),
  validFields,
];

exports.loginUserValidation = [
  body('accountNumber').notEmpty().withMessage('Email cannot be empty'),
  body('password').notEmpty().withMessage('password cannot be empty'),
  validFields,

  (exports.validateAmmount = []),
];
