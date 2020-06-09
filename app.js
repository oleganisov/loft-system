const express = require('express');
const createError = require('http-errors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require(path.join(__dirname, 'api')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message, error: err });
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
