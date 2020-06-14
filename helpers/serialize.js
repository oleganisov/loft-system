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

module.exports = { serializeUser };
