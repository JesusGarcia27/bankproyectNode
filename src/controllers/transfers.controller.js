const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const Transfer = require('../models/transfers.model');
const AppError = require('./../utils/appError');

exports.transfer = catchAsync(async (req, res, next) => {
  const { amount, receiverUserId } = req.body;
  const senderUserId = req.user.accountNumber;

  const sender = await User.findOne({
    where: {
      accountNumber: senderUserId,
      status: 'active',
    },
  });
  if (!sender) {
    return next(new AppError('Sender account not found', 404));
  }

  if (sender.amount < amount) {
    return next(new AppError('Insufficient balance', 400));
  }

  const recipient = await User.findOne({
    where: {
      accountNumber: receiverUserId,
      status: 'active',
    },
  });
  if (!recipient) {
    return next(new AppError('Recipient account not found', 404));
  }

  sender.amount -= amount;
  recipient.amount += amount;
  await sender.save();
  await recipient.save();

  const transfer = await Transfer.create({
    amount,
    senderUserId: sender.id,
    receiverUserId: recipient.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'Successful transfer',
    transfer,
  });
});
