const express = require('express');
const path = require('path');
require('dotenv').config();
const { ErrorHandler, handleError } = require('./helpers/error');

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const chat = require('./chat');

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
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', require(path.join(__dirname, 'api')));

app.use('*', (req, res) => {
  const file = path.resolve(__dirname, 'build', 'index.html');
  res.sendFile(file);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw new ErrorHandler(404, 'Page not found');
});
// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

chat(io);

module.exports = { app, server };
