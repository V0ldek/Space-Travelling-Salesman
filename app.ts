const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const start = require('./routes/start');
const users = require('./routes/users');

const startRouter = new start();
const usersRouter = new users();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'wwwroot')));

app.use('/', startRouter.getRouter());
app.use('/users', usersRouter.getRouter());

module.exports = app;
