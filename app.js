const express = require('express');
const path = require('path');
require('dotenv').config();
const { ErrorHandler, handleError } = require('./helpers/error');

const app = express();
require('./models/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require(path.join(__dirname, 'api')));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
require('./auth/config-passport');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw new ErrorHandler(404, 'Page not found');
});
// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
