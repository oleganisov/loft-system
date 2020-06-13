const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const schema = new Schema({
  created_at: Date,
  firstName: String,
  middleName: String,
  surName: String,
  username: {
    type: String,
    unique: true,
    required: [true, 'username required']
  },
  hash: {
    type: String,
    required: [true, 'Password required']
  },
  // password: String,
  image: String
});

schema.methods.setPassword = function (password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

schema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.hash);
};

const Users = mongoose.model('Users', schema);

module.exports = Users;
