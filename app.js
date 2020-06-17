const express = require('express');
const path = require('path');
const { ErrorHandler, handleError } = require('./helpers/error');

const app = express();
require('./models/db');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});
require('./auth/config-passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require(path.join(__dirname, 'api')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw new ErrorHandler(404, 'Page not found');
});
// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
