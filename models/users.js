const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: Date,
  text: String,
  title: String,
  user: {
    firstName: String,
    id: Number,
    image: String,
    middleName: String,
    surName: String,
    username: String
  }
});

const Users = mongoose.model('Users', schema);

module.exports = Users;
