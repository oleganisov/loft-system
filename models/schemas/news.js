const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  text: String,
  created_at: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'Users' }
});

const News = mongoose.model('News', schema);

module.exports = News;
