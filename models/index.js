const Users = require('./schemas/users');
const News = require('./schemas/news');

const createUser = async (data) => {
  const { username, surName, firstName, middleName, password } = data;
  const newUser = new Users({
    username,
    surName,
    firstName,
    middleName,
    image:
      'https://icons-for-free.com/iconfiles/png/512/profile+user+icon-1320166082804563970.png',
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

const findUserById = async (userId) => {
  return Users.findById(userId);
};

const findNews = async () => {
  return await News.find({}, 'title text created_at user').populate({
    path: 'user',
    select: 'surName firstName middleName username image'
  });
};

const createNews = async ({ title, text, user }) => {
  return await News.create({ title, text, user });
};

const findNewsByIdAndUpdate = async ({ id, title, text }) => {
  return await News.findByIdAndUpdate(id, { $set: { title, text } });
};

const findNewsByIdAndDelete = async (id) => {
  return await News.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  findUserByName,
  findUserById,
  createNews,
  findNews,
  findNewsByIdAndUpdate,
  findNewsByIdAndDelete
};
