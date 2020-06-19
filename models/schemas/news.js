const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  text: String,
  created_at: {
    type: Date,
    default: Date.now,
    get: (createdAt) => {
      return createdAt.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  user: { type: Schema.Types.ObjectId, ref: 'Users' }
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

const News = mongoose.model('News', schema);

module.exports = News;
