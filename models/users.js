const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  created_at: Date,
  firstName: String,
  middleName: String,
  surName: String,
  username: String,
  password: String,
  image: String
});

const Users = mongoose.model('Users', schema);

module.exports = Users;
