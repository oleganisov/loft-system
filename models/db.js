const mongoose = require('mongoose');
const uri = process.env.DB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open ${uri}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected app termination');
    process.exit(1);
  });
});
