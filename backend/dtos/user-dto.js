module.exports = function userDto(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
