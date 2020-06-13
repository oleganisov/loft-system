const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  created_at: { type: Date, default: Date.now },
  text: String,
  title: String,
  user: {
    id: String,
    firstName: String,
    image: String,
    middleName: String,
    surName: String,
    username: String
  }
});

const News = mongoose.model('News', schema);

module.exports = News;
