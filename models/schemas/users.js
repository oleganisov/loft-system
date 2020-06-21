const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ErrorHandler } = require('../../helpers/error');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

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
  password: {
    type: String,
    required: [true, 'Password required']
  },
  image: String,
  permission: {
    chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
  }
});

schema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(new ErrorHandler(500, err.message));

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = async function (candidatePassword) {
  console.log(candidatePassword, this);
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (e) {
    return new ErrorHandler(500, e.message);
  }
};

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

const Users = mongoose.model('Users', schema);

module.exports = Users;
