const Users = require('./schemas/users');
const News = require('./schemas/news');

const createUser = async (data) => {
  const { username, surName, firstName, middleName, password } = data;
  const newUser = new Users({
    username,
    surName,
    firstName,
    middleName,
    image: '',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    }
  });
  newUser.setPassword(password);
  const user = await newUser.save();
  console.log('User created!', user);

  return user;
};
const findUserByName = async (username) => {
  return Users.findOne({ username });
};

module.exports = { createUser, findUserByName };
