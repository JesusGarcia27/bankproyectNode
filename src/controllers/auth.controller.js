const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const generateAccountNumber = require('../utils/generateAccount');

exports.signup = catchAsync(async (req, res) => {
  const { name, password, amount = 1000 } = req.body;

  const accountNumber = generateAccountNumber();

  const user = await User.create({
    name,
    accountNumber,
    password,
    amount,
  });

  res.status(200).json({
    status: 'success ❇️',
    message: 'The user has been created 🆗',
    user,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid account or password ✖️',
    });
  }

  res.status(200).json({
    status: 'success ❇️',
    message: 'Login successful 👌',
    user,
  });
});
