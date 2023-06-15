require('dotenv').config();
const { db } = require('./database/config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { AppError } = require('./utils/appError');
const usersRouter = require('./routes/users.routes');
const transfersRouter = require('./routes/transfers.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

// Database authentication and synchronization code...

// Middleware and route setup...
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transfersRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

module.exports = app;
