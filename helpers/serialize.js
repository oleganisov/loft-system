const serializeUser = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    middleName: user.middleName,
    surName: user.surName,
    username: user.username,
    image: user.image,
    permission: user.permission
  };
};
const serializeNews = (news) => {
  return {
    id: news._id,
    title: news.title,
    text: news.text,
    created_at: news.created_at,
    user: news.user
  };
};

module.exports = { serializeUser, serializeNews };
