const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const Transfer = require('../models/transfers.model');

exports.AllTransfers = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const transfers = await Transfer.findAll({
    where: {
      senderUserId: id,
    },
    /* include: [
      {
        model: User,
        as: 'senderUserId',
      },
      {
        model: User,
        as: 'receiverUserId',
      },
    ], */
  });
  res.status(200).json({
    status: 'success',
    transfers,
  });
});
